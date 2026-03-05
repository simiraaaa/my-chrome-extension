import { tabHistory, tabUtil } from './dist/mce.js';

// ウィンドウフォーカスしたときも タブ履歴 push する
chrome.windows.onFocusChanged.addListener(async windowId => {
  // unfocus
  if (windowId === -1) {
    return;
  }
  if (await tabHistory.isLocked()) {
    tabHistory.unlock();
    return;
  }
  await tabHistory.load();
  var currentTab = await tabUtil.getCurrent();
  if (tabHistory.current === currentTab.id) {
    return;
  }
  tabHistory.push({ tabId: currentTab.id });
  tabHistory.save();
});

// タブ履歴 push
chrome.tabs.onActivated.addListener(async info => {
  if (await tabHistory.isLocked()) {
    tabHistory.unlock();
    return;
  }
  // タブの履歴へ追加
  await tabHistory.load();
  tabHistory.push(info);
  tabHistory.save();
});

// 履歴から削除する
chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
  // ウィンドウが閉じられた場合のタブが閉じられたときは何もしない
  if (removeInfo.isWindowClosing) {
    return;
  }
  // TODO: タブ履歴から消す
});

// ショートカット
chrome.commands.onCommand.addListener(async function(command) {
  var commandFunc = {
    async backTab() {
      await tabHistory.load();
      var tabId, tab;
      var currentTab = await tabUtil.getCurrent();
      while (typeof (tabId = tabHistory.back()) === 'number') {
        try {
          if (currentTab.id !== tabId) {
            tab = await tabUtil.get(tabId);
          }
          break;
        }
        catch (e) {
          if (tabHistory.isFirst()) {
            break;
          }
        }
      }
      await tabHistory.save();
      if (tab) {
        await tabHistory.lock();
        tabUtil.activate(tab);
      }
    },
    async forwardTab() {
      await tabHistory.load();
      var tabId, tab;
      var currentTab = await tabUtil.getCurrent();
      while (typeof (tabId = tabHistory.forward()) === 'number') {
        try {
          if (currentTab.id !== tabId) {
            tab = await tabUtil.get(tabId);
          }
          break;
        }
        catch (e) {
          if (tabHistory.isLast()) {
            break;
          }
        }
      }
      await tabHistory.save();
      if (tab) {
        await tabHistory.lock();
        tabUtil.activate(tab);
      }
    },
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

      chrome.action.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
      chrome.action.setBadgeText({ text: '✅' });
      setTimeout(() => chrome.action.setBadgeText({ text: '' }), 3000);
    },
  };

  return commandFunc[command]?.();
});