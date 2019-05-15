var util = {
  close() {
    // 処理を少し待ってから閉じる
    setTimeout(() => {
      close();
    }, 500);
  },
  reg: {
    createSearch(str, option) {
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
          res += '.*';
        }
      }
      return new RegExp(res, option);
    },
  },
  windows: {
    getAll() {
      return new Promise(resolve => {
        chrome.windows.getAll(null, (windows) => {
          resolve(windows);
        });
      });
    },

    getCurrent() {
      return new Promise(r => chrome.windows.getCurrent(null, w => r(w)));
    },

    activate(windowId) {
      return new Promise(r => chrome.windows.update(windowId, { focused: true }, e => r(e)));
    },
  },

  tabs: {
    getAll(windowId) {
      return new Promise(r => chrome.tabs.getAllInWindow(windowId, e => r(e)));
    },

    getCurrent() {
      return new Promise(r => chrome.tabs.getCurrent(e => r(e)));
    },

    async sort(desc = false) {
      var n = desc ? 1 : -1;
      return await new Promise(async r => {
        var tabs = [];
        for (const w of await util.windows.getAll()) {
          var _tabs = await util.tabs.getAll(w.id);
          _tabs = await new Promise(r => chrome.tabs.move(_tabs.sort((a, b) => a.url < b.url ? n : -n).map(e => e.id), { index: -1 }, tabs => r(tabs)));
          tabs = tabs.concat(_tabs);
        }
        r(tabs);
      });
    },

    async getAllByAllWindow() {
      return await new Promise(async r => {
        var tabs = [];
        for (const w of await util.windows.getAll()) {
          tabs = tabs.concat(await util.tabs.getAll(w.id));
        }
        r(tabs);
      });
    },

    activate(tabId) {
      return new Promise(r => chrome.tabs.update(tabId, {active: true}, e => r(e)));
    },
  },

};


riot.mount('app');