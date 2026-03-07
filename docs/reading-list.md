# リーディングリスト管理機能 実装方針

## 概要

Chrome の `chrome.readingList` API を利用して、ショートカットキーによるリーディングリストへの追加・TabSwitcher での検索・削除を実現する。

API リファレンス: https://developer.chrome.com/docs/extensions/reference/api/readingList

---

## 1. manifest.json の変更

### 1-1. `readingList` パーミッションの追加

```json
"permissions": [
  "tabs",
  "storage",
  "bookmarks",
  "scripting",
  "userScripts",
  "favicon",
  "activeTab",
  "readingList"
]
```

### 1-2. `addReadingList` コマンドの追加

既存の `commands` に追加する。

```json
"commands": {
  "backTab": {
    "description": "前に表示したタブを表示する"
  },
  "forwardTab": {
    "description": "前のタブを表示したやつを元のタブに戻す"
  },
  "addReadingList": {
    "description": "現在のページをリーディングリストに追加する"
  }
}
```

> ショートカットキーの割り当ては `chrome://extensions/shortcuts` から行う。

---

## 2. event.js — `addReadingList` コマンドの実装

`chrome.commands.onCommand` リスナー内の `commandFunc` に `addReadingList` を追加する。

```js
async addReadingList() {
  const currentTab = await tabUtil.getCurrent();
  if (!currentTab.url || !currentTab.title) return;

  // chrome:// や edge:// などの内部ページは追加不可
  if (!/^https?:\/\//.test(currentTab.url)) return;

  try {
    await chrome.readingList.addEntry({
      title: currentTab.title,
      url: currentTab.url,
      hasBeenRead: false,
    });
  } catch (e) {
    // 既に追加済みの場合など
    console.error('addReadingList error:', e.message);
  }
},
```

---

## 3. util.ts — `readingListUtil` の追加

`bookmarkUtil` / `tabUtil` と同じパターンで `readingListUtil` を新設する。

```ts
export const readingListUtil = {
  /** 全件取得（新しい順） */
  async getAll(): Promise<SwitcherItem[]> {
    const entries = await chrome.readingList.query({});

    // creationTime 降順（新しいものが上）
    entries.sort((a, b) => b.creationTime - a.creationTime);

    return entries.map((entry): SwitcherItem => ({
      id: entry.url,            // リーディングリストは URL がユニークキー
      title: entry.title,
      url: entry.url,
      favIconUrl: faviconURL(entry.url),
      type: 'readingList' as any,
      hasBeenRead: entry.hasBeenRead,
    }));
  },

  /** URL で削除 */
  remove(url: string) {
    return chrome.readingList.removeEntry({ url });
  },
};
```

### 3-1. `SwitcherItem` 型の拡張

```ts
export type SwitcherItem = {
  // ... 既存フィールド ...
  type?: 'bookmark' | 'folder' | 'readingList';
  hasBeenRead?: boolean;
};
```

---

## 4. TabSwitcher.svelte の変更

### 4-1. `<` プレフィックスでリーディングリスト検索

`getItems` 関数内に、先頭 `<` の分岐を追加する。  
既存の `>` (ブックマークレット) / 先頭スペース (ブックマーク) と同じパターン。

```ts
import { util, bookmarkUtil, tabUtil, readingListUtil } from '../script/util.js';

async function getItems(v: string): Promise<SwitcherItem[]> {
  var searchType = 'normal';
  var sItems: SwitcherItem[] = [];

  // リーディングリスト検索 <
  if (/^</.test(v)) {
    searchType = 'readingList';
    sItems = await readingListUtil.getAll();  // 既に新しい順
    v = v.slice(1);
  }
  // ブックマークレット検索 >
  else if (/^\>/.test(v)) {
    // ... 既存 ...
  }
  // ブックマーク検索 (先頭スペース)
  else if (/^\s/.test(v)) {
    // ... 既存 ...
  }
  else {
    // ... 既存 (タブ + ブックマーク) ...
  }

  // ... 以降の filter / sort ロジックはそのまま ...
}
```

### 4-2. `Ctrl+D` でリーディングリストから除外

既存の `Ctrl+D` はタブを閉じる処理だが、リーディングリスト表示中は **リーディングリストからの削除** に切り替える。

検索プレフィックスの状態を保持するために `searchType` を `$state` にする。

```ts
let searchType = $state<'normal' | 'bookmarklet' | 'bookmark' | 'readingList'>('normal');
```

`shortcut` 関数の `Ctrl+D` 分岐を変更:

```ts
d() {
  e.preventDefault();
  var tab = isHoverPriority ? lastHoveredItem : currentFocusTab;
  if (!tab) return;

  if (searchType === 'readingList') {
    // リーディングリストから削除
    if (isDeletedTab(tab)) return;
    deletedTabIDs.add(tab.id as number);  // UI 上の削除済み管理に URL ハッシュ等を利用
    readingListUtil.remove(tab.url);
  } else {
    closeTab(tab);
  }
},
```

> **注意**: `deletedTabIDs` は現在 `number` (タブID) のセットだが、リーディングリストの場合はタブIDが存在しない。URL をキーとした別のセット `deletedReadingListURLs` を用意するか、`deletedTabIDs` を汎用的な `SvelteSet<string | number>` に変更する。

#### 推奨: `deletedReadingListURLs` を追加する方式

```ts
const deletedReadingListURLs = new SvelteSet<string>();

function isDeletedItem(item: SwitcherItem | null): boolean {
  if (!item) return false;
  if (searchType === 'readingList') {
    return deletedReadingListURLs.has(item.url);
  }
  return typeof item.tab?.id === 'number' ? deletedTabIDs.has(item.tab.id) : false;
}
```

テンプレート側の `isDeletedTab(item)` 呼び出しを `isDeletedItem(item)` に置き換える。

---

## 5. 追加要件（第2フェーズ）

### 5-1. `Ctrl+X` で既読状態をトグル

`shortcut` 関数の `Ctrl+X` 分岐を追加する。

```ts
x() {
  e.preventDefault();
  if (searchType !== 'readingList') return;
  var tab = isHoverPriority ? lastHoveredItem : currentFocusTab;
  if (!tab) return;
  readingListUtil.toggleRead(tab.url, !tab.hasBeenRead).then(() => search());
},
```

`readingListUtil` に `toggleRead` を追加:

```ts
toggleRead(url: string, hasBeenRead: boolean) {
  return chrome.readingList.updateEntry({ url, hasBeenRead });
},
```

### 5-2. 既読アイテムを最大30件に制限

`readingListUtil.getAll()` 内で未読と既読を分けて取得し、既読は新しい順に最大30件に絞る。

```ts
async getAll(): Promise<SwitcherItem[]> {
  const entries = await chrome.readingList.query({});
  const unread = entries.filter(e => !e.hasBeenRead)
    .sort((a, b) => b.creationTime - a.creationTime);
  const read = entries.filter(e => e.hasBeenRead)
    .sort((a, b) => b.creationTime - a.creationTime)
    .slice(0, 30);
  return [...unread, ...read].map(...);
},
```

### 5-3. 既読アイテムを「既読」カテゴリで末尾に表示

`pushFunction` 内で `searchType === 'readingList' && item.hasBeenRead` のときドメイン名を強制的に `'既読'` にする。
`getAll` が未読→既読の順で返すため、「既読」ドメインは自然に末尾へ積まれる。

```ts
if (searchType === 'readingList' && item.hasBeenRead) {
  domainName = '既読';
}
```

### 5-4. チェックアイコンの表示

`Tab.svelte` に `hasBeenRead` / `isReadingList` プロパティを追加し、リーディングリスト表示時は右端にアイコンを表示する。

- 未読: 白抜き円アイコン
- 既読: 塗りつぶしチェックアイコン（lucide の check-circle に相当する inline SVG）

---

## 6. 変更対象ファイル一覧

| ファイル | 変更内容 |
|---|---|
| `manifest.json` | `readingList` パーミッション追加、`addReadingList` コマンド追加 |
| `event.js` | `addReadingList` コマンドハンドラ追加 |
| `src/lib/script/util.ts` | `readingListUtil` 追加（`getAll` / `remove` / `toggleRead`）、`SwitcherItem` 型に `readingList` / `hasBeenRead` 追加 |
| `src/lib/modules/TabSwitcher.svelte` | `<` プレフィックス分岐追加、`Ctrl+D` 削除、`Ctrl+X` 既読トグル、「既読」カテゴリ末尾グルーピング |
| `src/lib/items/Tab.svelte` | `hasBeenRead` / `isReadingList` プロパティ追加、チェックアイコン表示 |

---

## 6. 動作フロー

### リーディングリストに追加

```
ユーザーがショートカットキーを押す
  → chrome.commands.onCommand("addReadingList")
    → tabUtil.getCurrent() で現在のタブ情報取得
      → chrome.readingList.addEntry({ title, url, hasBeenRead: false })
```

### リーディングリストの検索

```
ユーザーが TabSwitcher の検索欄に `<` を入力
  → getItems("<...")
    → readingListUtil.getAll() で全件取得 (creationTime 降順)
      → filterItems() で `<` 以降のテキストで絞り込み
        → ドメインごとにグルーピングして表示
```

### リーディングリストから除外

```
TabSwitcher でリーディングリスト表示中に Ctrl+D を押す
  → searchType === 'readingList' を判定
    → readingListUtil.remove(item.url)
      → UI 上で削除済み表示 (opacity-50, pointer-none)
```
