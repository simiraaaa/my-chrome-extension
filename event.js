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