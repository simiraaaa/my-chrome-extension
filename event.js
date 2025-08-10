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
  };

  return commandFunc[command]?.();
});