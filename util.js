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
    get(tabId) {
      return new Promise((r, rej) => {
        chrome.tabs.get(tabId, e => {
          if (chrome.runtime.lastError) {
            rej(chrome.runtime.lastError);
          }
          else {
            r(e);
          }
        });
      });
    },

    getAll(windowId) {
      return new Promise(r => chrome.tabs.getAllInWindow(windowId, e => r(e)));
    },

    getCurrent() {
      return new Promise(r => chrome.tabs.query({
        windowId: chrome.windows.WINDOW_ID_CURRENT,
        active: true,
      }, e => r(e && e[0])));
    },

    // TODO: サブドメインで分割、優先順位を考慮する (オプションページで設定)
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

    activate(tab) {
      util.windows.activate(tab.windowId);
      return new Promise(r => chrome.tabs.update(tab.id, {active: true}, e => r(e)));
    },
  },

  localStorage: {
    get(key) {
      return new Promise(r => chrome.storage.local.get(key, res => r(typeof key === 'string' ? res[key] : res)));
    },
    set(obj) {
      return new Promise(r => chrome.storage.local.set(obj, () => r()));
    },
  },
  // 配列でタブの履歴を管理する length - _historyIndex でアクセス
  tabHistory: {
    STORAGE_KEY: 'util_tabHistory',
    LOCK_STORAGE_KEY: 'util_tabHistory_lock',
    _history: [],
    _historyIndex: 0,
    async load() {
      var obj = await util.localStorage.get(this.STORAGE_KEY);
      Object.assign(this, obj);
      return;
    },
    save() {
      return util.localStorage.set({
        [this.STORAGE_KEY]: {
          _history: this._history,
          _historyIndex: this._historyIndex,
        },
      });
    },
    // 履歴内に同じタブがある場合はそのタブを消してから push
    push(info) {
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
      return util.localStorage.set({ [this.LOCK_STORAGE_KEY]: true });
    },

    unlock() {
      return util.localStorage.set({ [this.LOCK_STORAGE_KEY]: false });
    },

    isLocked() {
      return util.localStorage.get(this.LOCK_STORAGE_KEY);
    },

    isFirst() {
      return this._historyIndex >= this._history.length - 1;
    },

    isLast() {
      return this._historyIndex <= 0;
    },
  },
  
};