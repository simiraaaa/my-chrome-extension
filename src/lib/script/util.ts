export type SwitcherItem = {
  id: string | number;
  __index?: number;
  searchText?: string;
  title: string;
  url: string;
  favIconUrl?: string;
  isBookmarklet?: boolean;
  isSearchText?: boolean;
  script?: string;
  path?: string;
  // parent?: SwitcherItem;
  type?: 'bookmark' | 'folder';
  children?: SwitcherItem[];
  bookmarkTreeNode?: chrome.bookmarks.BookmarkTreeNode;
  tab?: chrome.tabs.Tab;
};

export type TabHistory = {
  tabId: number;
};

export const util = {
  close() {
    // 処理を少し待ってから閉じる
    setTimeout(() => {
      close();
    }, 500);
  },
  reg: {
    createSearch(str: string, option: string) {
      var escapeTarget = /[-\/\\^$*+?.()|[\]{}]/;
      var res = '';
      for (let i = 0; i < str.length; i++) {
        let s = str[i];
        if (escapeTarget.test(s)) {
          res += `\\${s}`;
        }
        else {
          res += s;
        }
        if (i < str.length - 1) {
          // res += '(?=';
          let next = str[i + 1];
          if (escapeTarget.test(next)) {
            next = `\\${next}`;
          }
          res += `[^${next}]*`;
          // res += ')\\' + (i + 1)
        }
      }
      return new RegExp(res, option);
    },
  },
};

export const windowUtil = {
  getAll() {
    return chrome.windows.getAll();
  },

  getCurrent() {
    return chrome.windows.getCurrent();
  },

  activate(windowId: number) {
    return chrome.windows.update(windowId, { focused: true });
  },
};

export const bookmarkUtil = {
  async getAll(): Promise<SwitcherItem[]> {
    const tree = await chrome.bookmarks.getTree();

    var items: SwitcherItem[] = [];
    var f = (item: SwitcherItem, isRoot: boolean) => {
      if (item.bookmarkTreeNode?.children) {
        var nextIsRoot = item.title === '';
        /*
        children: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        dateAdded: 1554019638389
        dateGroupModified: 1565251428906
        id: "1"
        index: 0
        parentId: "0"
        title: "ブックマーク バー"
        */
        item.bookmarkTreeNode.children.forEach(child => {
          let childItem: SwitcherItem = {
            id: child.id,
            title: child.title || '',
            url: child.url || '',
            bookmarkTreeNode: child
          };
          // child.parent = item;
          let path = '';
          if (!isRoot) {
            path = item.path || '';
            path += '/' + child.title.replace(/\//g, '');
          }
          else {
            path = child.title.replace(/\//g, '');
          }
          childItem.path = path.replace(/^\//g, '');
          f(childItem, nextIsRoot);
        });
      }
      else {
        /*
        dateAdded: 1513510236914
        id: "188"
        index: 0
        parentId: "5"
        title: "QR",
        url: "",
        */

        item.type = 'bookmark';
        if (/^javascript\:/.test(item.url)) {
          item.isBookmarklet = true;
          item.script = item.url;
          item.url = 'bookmarklet';
        }
        else {
          item.favIconUrl = faviconURL(item.url);
        }
        items.push(item);
      }
    };
    // 並列の階層構造にする / は空白に置換
    // フォルダ名/タイトル
    tree.forEach(t => f({
      id: t.id,
      title: t.title,
      url: t.url || '',
      bookmarkTreeNode: t
    }, true));
    return items;
  }
};

export const tabUtil = {
  get(tabId: number) {
    return chrome.tabs.get(tabId);
  },

  getAll(windowId: number | undefined) {
    return chrome.tabs.query({ windowId });
  },

  async getCurrent() {
    const tabs = await chrome.tabs.query({
      windowId: chrome.windows.WINDOW_ID_CURRENT,
      active: true,
    });
    return tabs[0];
  },

  // TODO: サブドメインで分割、優先順位を考慮する (オプションページで設定)
  async sort(desc = false) {
    var n = desc ? 1 : -1;
    return await new Promise(async r => {
      var tabs: chrome.tabs.Tab[] = [];
      for (const w of await windowUtil.getAll()) {
        var _tabs = await tabUtil.getAll(w.id);
        _tabs = await new Promise(
          r => chrome.tabs.move(
            _tabs
              .sort((a, b) => (a.url || '') < (b.url || '') ? n : -n)
              .map(e => e.id || 0),
            { index: -1 },
            (tabs: chrome.tabs.Tab[]) => r(tabs)
          )
        );
        tabs = tabs.concat(_tabs);
      }
      r(tabs);
    });
  },

  async getAllByAllWindow() {
    const windows = await windowUtil.getAll();
    const tabsList = await Promise.all(windows.map(w => tabUtil.getAll(w.id)));
    return tabsList.flat();
  },

  async activate(tab: chrome.tabs.Tab) {
    const currentWindow = await windowUtil.getCurrent();
    if (currentWindow.id !== tab.windowId) {
      await windowUtil.activate(tab.windowId);
    }
    return chrome.tabs.update(tab.id, { active: true });
  },
};

const storage = {
  get(key: string) {
    return new Promise(r => chrome.storage.local.get(key, res => r(typeof key === 'string' ? res[key] : res)));
  },
  set(obj: Record<string, any>) {
    return chrome.storage.local.set(obj);
  },
};

// 配列でタブの履歴を管理する length - _historyIndex でアクセス
export const tabHistory = {
  STORAGE_KEY: 'util_tabHistory',
  LOCK_STORAGE_KEY: 'util_tabHistory_lock',
  _history: [] as number[],
  _historyIndex: 0,
  async load() {
    var obj = await storage.get(this.STORAGE_KEY);
    Object.assign(this, obj);
    return;
  },
  save() {
    return storage.set({
      [this.STORAGE_KEY]: {
        _history: this._history,
        _historyIndex: this._historyIndex,
      },
    });
  },
  // 履歴内に同じタブがある場合はそのタブを消してから push
  push(info: TabHistory) {
    // 戻っている場合は戻っている分の履歴は消す
    if (this._historyIndex !== 0) {
      this._history = this._history.slice(0, this._history.length - this._historyIndex);
    }
    var index = this._history.findIndex(item => item === info.tabId);
    if (index !== -1) {
      var id = this._history.splice(index, 1);
    }
    this._history.push(info.tabId);
    this._historyIndex = 0;
  },
  // 現在のタブを取得
  get current() {
    return this._history[this._history.length - this._historyIndex - 1];
  },
  // カウンターを進めて取得
  back() {
    this._historyIndex = Math.min(this._history.length - 1, this._historyIndex + 1);
    return this.current;
  },
  // カウンターを戻して取得
  forward() {
    this._historyIndex = Math.max(0, this._historyIndex - 1);
    return this.current;
  },

  lock() {
    return storage.set({ [this.LOCK_STORAGE_KEY]: true });
  },

  unlock() {
    return storage.set({ [this.LOCK_STORAGE_KEY]: false });
  },

  isLocked() {
    return storage.get(this.LOCK_STORAGE_KEY);
  },

  isFirst() {
    return this._historyIndex >= this._history.length - 1;
  },

  isLast() {
    return this._historyIndex <= 0;
  },
};

/**
 * 
 * @param func 
 * @param ms 
 */
export function debounce(
  func: (...args: any) => any,
  ms: number
): ((...args: any) => any) & { cancel: () => void } {
  let id: NodeJS.Timeout;
  return Object.assign((...args: any[]) => {
    clearTimeout(id);
    id = setTimeout(() => func(...args), ms);
  }, {
    cancel: () => clearTimeout(id),
  });
}

export function faviconURL(u: string): string {
  const url = new URL(chrome.runtime.getURL("/_favicon/"));
  url.searchParams.set("pageUrl", u);
  url.searchParams.set("size", "32");
  return url.toString();
}
