<script module lang="ts">
  export type SwitcherDomain = {
    favIconUrl?: string;
    name: string;
    tabs: SwitcherItem[];
    __index?: number;
  };
</script>

<script lang="ts">
  import { SvelteSet } from 'svelte/reactivity';

  import Domain from '../items/Domain.svelte';
  import Tab from '../items/Tab.svelte';

  import { debounce, type SwitcherItem } from '../script/util.js';
  import { util, bookmarkUtil, tabUtil, readingListUtil } from '../script/util.js';

  let currentFocusTab: SwitcherItem | null = null;
  let currentFocusDomain = $state.raw<SwitcherDomain | null>(null);
  let searchInput = $state<HTMLInputElement>();
  let scrollElement = $state<HTMLDivElement>();
  let searchValue = $state('');
  let items = $state.raw<SwitcherDomain[]>([]);
  let selectIndex = $state(0);
  let isSearching = $state(false);
  let isSubmitted = $state(false);
  /** ホバー操作後、キーボード操作の対象要素をホバーした要素にする */
  let isHoverPriority = false;
  let tabLength = 0;
  let lastHoveredItem: SwitcherItem | null = null;
  const deletedTabIDs = new SvelteSet<number>();
  const deletedReadingListURLs = new SvelteSet<string>();
  let searchType = $state<'normal' | 'bookmarklet' | 'bookmark' | 'readingList'>('normal');

  const listLabel = $derived({ 
    normal: 'タブ', 
    bookmark: 'ブックマーク',
    bookmarklet: 'ブックマークレット',
    readingList: 'リーディングリスト',
  }[searchType]);

  $effect.pre(() => {
    var item = null;
    currentFocusDomain = null;
    currentFocusTab = null;

    items?.some((d) => {
      return d.tabs.some((_item) => {
        var hit = _item.__index === selectIndex;
        if (hit) {
          item = _item;
          currentFocusDomain = d;
        }
        return hit;
      });
    });
    if (item) {
      currentFocusTab = item;
    }
  });

  // 初回実行時
  $effect(() => {
    searchInput?.focus();
    search();
  });

  // 送信時にタブを切り替える
  $effect(() => {
    if (!isSubmitted) return;

    // 検索中は検索が終わるまで待つ
    if (isSearching) return;

    // 選択しているアイテムをクリックする
    if (currentFocusTab) {
      switchTab(currentFocusTab);
    }
  });

  function submit(e: Event) {
    e.preventDefault();
    isSubmitted = true;
  }

  function filterItems(items: SwitcherItem[], word: string) {
    if (!word) return [items];
    var wordLowerCase = word.toLowerCase();
    var reg = util.reg.createSearch(word, 'i');
    var partMatchItems: {
      item: SwitcherItem;
      title: string;
      urlIndex: number;
      titleIndex: number;
    }[] = [];
    var fuzzyMatchItems: {
      title: string;
      item: SwitcherItem;
      urlTest: boolean;
      titleTest: boolean;
      isSearchText?: boolean;
    }[] = [];
    items.forEach((item) => {
      var urlIndex = item.isBookmarklet ? -1 : item.url.indexOf(wordLowerCase);
      var title = (item.type === 'bookmark' ? item.path : item.title) || '';
      var titleIndex = title.toLowerCase().indexOf(wordLowerCase);
      item.isSearchText = false;
      if (item.searchText) {
        titleIndex = item.searchText.toLowerCase().indexOf(wordLowerCase);
        item.isSearchText = true;
      }
      // 部分一致
      if (urlIndex !== -1 || titleIndex !== -1) {
        partMatchItems.push({
          item,
          title,
          urlIndex: urlIndex === -1 ? Infinity : urlIndex,
          titleIndex: titleIndex === -1 ? Infinity : titleIndex
        });
      } else {
        var urlTest = item.isBookmarklet ? false : reg.test(item.url);
        var titleTest = reg.test(title);
        item.isSearchText = false;
        if (item.searchText) {
          item.isSearchText = true;
          titleTest = titleTest || reg.test(item.searchText);
        }
        // 曖昧一致
        if (urlTest || titleTest) {
          fuzzyMatchItems.push({
            title,
            item,
            urlTest,
            titleTest
          });
        }
      }
    });
    return [
      partMatchItems
        .sort((a, b) => {
          if (a.urlIndex === b.urlIndex) {
            if (a.titleIndex === b.titleIndex) {
              return a.title.length - b.title.length;
            }
            return a.titleIndex - b.titleIndex;
          } else {
            return a.urlIndex - b.urlIndex;
          }
        })
        .map((item) => item.item),
      fuzzyMatchItems
        .sort((a, b) => {
          // 両方マッチしてるやつが上
          var aCount = Number(a.titleTest) + Number(a.urlTest);
          var bCount = Number(b.titleTest) + Number(b.urlTest);
          if (aCount === bCount) {
            return a.title.length - b.title.length;
          }
          return bCount - aCount;
        })
        .map((item) => item.item)
    ];
  }

  async function getItems(v: string): Promise<SwitcherItem[]> {
    var sItems: SwitcherItem[] = [];
    // リーディングリスト検索 <
    if (/^</.test(v)) {
      searchType = 'readingList';
      sItems = await readingListUtil.getAll();
      v = v.slice(1);
    }
    // ブックマークレット検索 :
    else if (/^\>/.test(v)) {
      searchType = 'bookmarklet';
      sItems = await bookmarkUtil.getAll();
      sItems = sItems.filter((item) => item.isBookmarklet);
      v = v.slice(1);
    }
    // ブックマーク検索 (最初がスペースの場合)
    else if (/^\s/.test(v)) {
      searchType = 'bookmark';
      sItems = await bookmarkUtil.getAll();
      sItems = sItems.filter((item) => !item.isBookmarklet);
      v = v.slice(1);
    } else {
      searchType = 'normal';
      let [tabs, bookmarks] = await Promise.all([
        tabUtil.getAllByAllWindow(),
        bookmarkUtil.getAll()
      ]);
      sItems = tabs.map((tab): SwitcherItem => {
        return {
          id: tab.id ?? 0,
          title: tab.title || '',
          url: tab.url || '',
          favIconUrl: tab.favIconUrl,
          tab
        };
      });
      bookmarks = bookmarks.filter((item) => !item.isBookmarklet);
      bookmarks.forEach((bookmark) => {
        var item = sItems.find((item) => item.url === bookmark.url);
        if (item) {
          item.searchText = bookmark.path;
        }
      });
    }
    if (v) {
      const result: SwitcherItem[] = [];
      // 空白文字で分割して、配列の配列を result に flatten で入れる
      v.split(/\s+/)
        .reduce(
          (filteredItems: SwitcherItem[][], word: string) => {
            const results: SwitcherItem[][] = [];
            // 一致度が高い順に並ぶようにpushする
            filteredItems.forEach((items) => {
              filterItems(items, word).forEach((items) => {
                if (items.length > 0) {
                  results.push(items);
                }
              });
            });
            return results;
          },
          [sItems]
        )
        .forEach((items) => items.forEach((item) => result.push(item)));
      sItems = result;
      // if (searchType === 'normal') {
      //   items = items.concat(await getItems(` ${v}`));
      // }
    }
    return sItems;
  }

  async function search() {
    var v = searchValue;
    var sItems = await getItems(v);

    // ドメインごとに分ける
    var domainMap: Record<string, SwitcherDomain> = {};
    var domains: SwitcherDomain[] = [];
    var domainReg = /^.*\:\/\/([^\/]*)\//i;
    var pushFunction = (item: SwitcherItem) => {
      var domainName = null;
      if (searchType === 'readingList' && item.hasBeenRead) {
        domainName = '既読';
      } else if (item.isBookmarklet) {
        domainName = 'ブックマークレット';
      } else {
        var domainMatch = item.url.match(domainReg);

        if (domainMatch) {
          domainName = domainMatch[1].replace(/^www\./, '').replace(/\:\d+/, '');
        }
        if (!domainName) {
          domainName = 'その他';
        }
      }
      var domain = domainMap[domainName];
      if (!domain) {
        domain = domainMap[domainName] = {
          favIconUrl: item.favIconUrl,
          name: domainName,
          tabs: []
        };
        domains.push(domain);
      }
      domain.tabs.push(item);
    };
    var updateIndex = () => {
      var counter = 0;
      // index
      domains.forEach((d, index) => {
        d.__index = index;
        d.tabs.forEach((i) => {
          i.__index = counter++;
        });
      });
      tabLength = counter;
    };

    // sItems.slice(0, 5).forEach(pushFunction);
    // updateIndex();
    // setTimeout(() => {
    //   sItems.slice(5, 10).forEach(pushFunction);
    //   updateIndex();
    // }, 300);
    // setTimeout(() => {
    //   sItems.slice(10, 20).forEach(pushFunction);
    //   updateIndex();
    // }, 500);
    // setTimeout(() => {
    //   sItems.slice(20).forEach(pushFunction);
    //   updateIndex();
    // }, 1000);
    sItems.forEach(pushFunction);
    updateIndex();
    items = domains;

    selectIndex = 0;
    isSearching = false;
    if (scrollElement) scrollElement.scrollTop = 0;
  }

  const _debouncedSearch = debounce(search, 64);

  function delaySearch() {
    isSearching = true;
    _debouncedSearch();
  }

  async function switchTab(item: SwitcherItem) {
    if (item.isBookmarklet) {
      const tabId = (await tabUtil.getCurrent()).id;
      if (typeof tabId !== 'number') {
        console.error('Current tab ID is not a number:', tabId);
        return;
      }
      if (!item.script || !item.script.startsWith('javascript:')) {
        console.error('Invalid bookmarklet script:', item.script);
        return;
      }
      if (!chrome.userScripts) {
        alert('拡張機能の設定画面から「ユーザー スクリプトを許可する」を有効にしてください。');
        return;
      }

      await chrome.userScripts
        .execute({
          js: [{ code: decodeURIComponent(item.script.slice('javascript:'.length)) }],
          world: 'MAIN',
          target: { tabId },
          injectImmediately: true
        })
        .catch((e) => {
          console.error(e.message);
        });

      close();
    } else if (item.type === 'bookmark' || item.type === 'readingList') {
      var tabs = await tabUtil.getAllByAllWindow();
      var url = item.url.replace(/\/$/g, '');
      var tab = tabs.find((tab) => {
        return (tab.url || '').replace(/\/$/g, '') === url;
      });
      if (tab) {
        tabUtil.activate(tab);
        util.close();
      } else {
        open(item.url);
      }
    } else {
      if (item.tab) tabUtil.activate(item.tab);
      util.close();
    }
  }

  function focusTabFirst(domain: SwitcherDomain) {
    selectIndex = domain.tabs[0]?.__index || 0;
  }

  /** リーディングリストの既読状態をその場で更新（位置変更なし） */
  function toggleReadInPlace(url: string, newHasBeenRead: boolean) {
    readingListUtil.toggleRead(url, newHasBeenRead);
    items = items.map((d) => ({
      ...d,
      tabs: d.tabs.map((t) => (t.url === url ? { ...t, hasBeenRead: newHasBeenRead } : t))
    }));
  }

  /** フォーカス中のアイテムを返す。上下キー未操作でも selectIndex で探す */
  function getTargetItem(): SwitcherItem | null {
    if (isHoverPriority && lastHoveredItem) {
      // items 再構築後も stale 参照を使わず URL で引き直す
      for (const d of items) {
        for (const t of d.tabs) {
          if (t.url === lastHoveredItem.url) return t;
        }
      }
      return lastHoveredItem;
    }
    if (currentFocusTab) return currentFocusTab;
    for (const d of items) {
      for (const t of d.tabs) {
        if (t.__index === selectIndex) return t;
      }
    }
    return null;
  }

  function isDeletedItem(item: SwitcherItem | null): boolean {
    if (!item) return false;
    if (searchType === 'readingList') {
      return deletedReadingListURLs.has(item.url);
    }
    return typeof item.tab?.id === 'number' ? deletedTabIDs.has(item.tab.id) : false;
  }

  function closeTab(tab: SwitcherItem | null) {
    if (typeof tab?.tab?.id !== 'number') return;
    if (isDeletedItem(tab)) return;
    deletedTabIDs.add(tab.tab.id);
    chrome.tabs.remove(tab.tab.id);
  }

  function shortcut(e: KeyboardEvent) {
    var code = e.code;
    var isArrowUp = code === 'ArrowUp';
    var isArrowDown = code === 'ArrowDown';
    var domain = currentFocusDomain;
    if (e.ctrlKey) {
      var f = {
        d() {
          e.preventDefault();
          var tab = getTargetItem();
          if (!tab) return;
          if (searchType === 'readingList') {
            if (deletedReadingListURLs.has(tab.url)) return;
            deletedReadingListURLs.add(tab.url);
            readingListUtil.remove(tab.url);
          } else {
            closeTab(tab);
          }
        },
        x() {
          e.preventDefault();
          if (searchType !== 'readingList') return;
          var tab = getTargetItem();
          if (!tab) return;
          toggleReadInPlace(tab.url, !tab.hasBeenRead);
        }
      }[e.key];
      f?.();
      return;
    }
    if (e.shiftKey) {
      if (isArrowUp) {
        e.preventDefault();
        isHoverPriority = false;
        if (domain) {
          var item = items[Math.max(0, (domain.__index || 0) - 1)];
          if (item) {
            selectIndex = item.tabs[0].__index || 0;
          }
        }
      } else if (isArrowDown) {
        e.preventDefault();
        isHoverPriority = false;
        if (domain) {
          var item = items[Math.min(items.length - 1, (domain.__index || 0) + 1)];
          if (item) {
            selectIndex = item.tabs[0].__index || 0;
          }
        }
      }
    } else if (isArrowUp) {
      e.preventDefault();
      isHoverPriority = false;
      selectIndex = Math.max(0, selectIndex - 1);
    } else if (isArrowDown) {
      e.preventDefault();
      isHoverPriority = false;
      selectIndex = Math.min(tabLength - 1, selectIndex + 1);
    } else {
      // 特にショートカットキーではない場合は search に focus
      if (document.activeElement !== searchInput) {
        searchInput?.focus();
      }
    }
  }

  function onmousemove() {
    isHoverPriority = true;
  }

  function mouseenter(item: SwitcherItem) {
    lastHoveredItem = item;
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<form onsubmit={submit} class="f flex-column s-full" onkeydown={shortcut} {onmousemove}>
  <input
    class="input w-full fs12 flex-fixed letter-spacing-1"
    type="search"
    oninput={delaySearch}
    bind:this={searchInput}
    bind:value={searchValue}
  />
  <div tabIndex="-1" class="outline-none f w-full overflow-hidden">
    <div class="flex-fixed w200 h-full f flex-column border-right">
      <div class="bg-lightgray w-full p6 fs12 text-center flex-fixed">Shift + ↓↑</div>
      <div class="s-full overflow-scroll">
        {#each items as item (item.name)}
          <Domain
            name={item.name}
            favIconUrl={item.favIconUrl}
            selected={currentFocusDomain === item}
            onclick={() => focusTabFirst(item)}
          />
        {/each}
      </div>
    </div>
    <div class="s-full f flex-column">
      <div class="bg-lightgray w-full p6 fs12 text-center flex-fixed">↓↑ {listLabel}</div>
      <div class="overflow-scroll s-full" bind:this={scrollElement}>
        {#each items as domain (domain.name)}
          <div>
            <div class="bg-whitesmoke border-bottom w-full py8 px6 fs12 flex-fixed">
              {domain.name}
            </div>
            {#each domain.tabs as item (item.id)}
              <Tab
                class={isDeletedItem(item) ? 'opacity-50 pointer-none' : ''}
                favIconUrl={item.favIconUrl}
                title={item.isSearchText ? item.searchText : item.title}
                url={item.url}
                onclick={() => switchTab(item)}
                selected={item.__index === selectIndex}
                onmouseenter={() => mouseenter(item)}
                hasBeenRead={item.hasBeenRead}
                isReadingList={searchType === 'readingList'}
                onToggleRead={searchType === 'readingList' ? () => toggleReadInPlace(item.url, !item.hasBeenRead) : undefined}
              />
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>
</form>
