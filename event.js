importScripts('util.js');

// ウィンドウフォーカスしたときも タブ履歴 push する
chrome.windows.onFocusChanged.addListener(async windowId => {
  const {
    tabHistory,
    tabs,
  } = util;
  // unfocus
  if (windowId === -1) {
    return;
  }
  if (await tabHistory.isLocked()) {
    tabHistory.unlock();
    return;
  }
  await tabHistory.load();
  var currentTab = await tabs.getCurrent();
  if (tabHistory.current === currentTab.id) {
    return;
  }
  tabHistory.push({ tabId: currentTab.id });
  tabHistory.save();
});
// タブ履歴 push
chrome.tabs.onActivated.addListener(async info => {
  const {
    tabHistory,
  } = util;
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
  const {
    tabs,
    tabHistory,
  } = util;
  var commandFunc = {
    async backTab() {
      await tabHistory.load();
      var tabId, tab;
      var currentTab = await tabs.getCurrent();
      while (typeof (tabId = tabHistory.back()) === 'number') {
        try {
          if (currentTab.id !== tabId) {
            tab = await tabs.get(tabId);
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
        tabs.activate(tab);
      }
    },
    async forwardTab() {
      await tabHistory.load();
      var tabId, tab;
      var currentTab = await tabs.getCurrent();
      while (typeof (tabId = tabHistory.forward()) === 'number') {
        try {
          if (currentTab.id !== tabId) {
            tab = await tabs.get(tabId);
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
        tabs.activate(tab);
      }
    },
  };
  var f = commandFunc[command];
  f && f();
});