riot.tag2('app', '<div class="f flex-column s-full"> <module-tab-switcher class="f flex-column h0 flex-auto w-full"></module-tab-switcher> <button class="button primary flex-fixed" ref="sort" type="button" onclick="{sortTabs}">タブソート</button> </div>', 'app,[data-is="app"]{display:block;position:absolute;overflow:hidden;width:100%;height:100%}', '', function(opts) {

    this.on('mount', () => {
    });

    this.sortTabs = async () => {
      await util.tabs.sort();
      util.close();
    };
});
riot.tag2('module-tab-switcher', '<form onsubmit="{submit}" class="f flex-column s-full" onkeydown="{shortcut}" onmousemove="{onmousemove}"> <input ref="search" type="search" oninput="{delaySearch}" class="input w-full fs12 flex-fixed letter-spacing-1"> <div tabindex="-1" class="outline-none f w-full overflow-hidden"> <div class="flex-fixed w200 h-full f flex-column border-right"> <div class="bg-lightgray w-full p6 fs12 text-center flex-fixed">Shift + ↓↑</div> <div class="s-full overflow-scroll"> <item-domain each="{item in items}" item="{item}" selected="{_currentFocusDomain === item}" onclick="{parent.focusTabFirst}"></item-domain> </div> </div> <div class="s-full f flex-column"> <div class="bg-lightgray w-full p6 fs12 text-center flex-fixed">↓↑</div> <div class="overflow-scroll s-full" ref="scroll"> <div each="{domain in items}"> <div class="bg-whitesmoke border-bottom w-full py8 px6 fs12 flex-fixed">{domain.name}</div> <item-tab each="{item in domain.tabs}" item="{item}" onclick="{switchTab}" selected="{item.__index === parent.parent.selectIndex}" onmouseenter="{mouseenter}" class="{\'opacity-50 pointer-none\' : item._del}"></item-tab> </div> </div> </div> </div> </form>', 'module-tab-switcher,[data-is="module-tab-switcher"]{display:block}', '', function(opts) {

    this.selectIndex = 0;

    this.on('mount', () => {
      this.refs.search.focus();
      this.delaySearch();
    });

    this.on('update', () => {
      var item = null;
      this._currentFocusDomain = null;
      this._currentFocusTab = null;
      this.items && this.items.some(d => {
        return d.tabs.some(_item => {
          var hit = _item.__index === this.selectIndex;
          if (hit) {
            item = _item;
            this._currentFocusDomain = d;
          }
          return hit;
        });
      });
      if (item) {
        this._currentFocusTab = item;
      }
    });

    this.submit = (e) => {
      e.preventDefault();
      var _switch = () => {

        if (this._currentFocusTab) {
          this.switchTab({item:{item:this._currentFocusTab}});
        }
      };
      if (this.isSearching) {
        this.one('searched', _switch);
      }
      else {
        _switch();
      }
    };

    this.filterItems = (items, word) => {
      if (!word) return [items];
      var wordLowerCase = word.toLowerCase();
      var reg = util.reg.createSearch(word, 'i');
      var partMatchItems = [];
      var aimaiMatchItems = [];
      items.forEach(item => {
        var urlIndex = item.isBookmarklet ? -1 : item.url.indexOf(wordLowerCase);
        var title = item.type === 'bookmark' ? item.path : item.title;
        var titleIndex = title.toLowerCase().indexOf(wordLowerCase);
        item.isSearchText = false;
        if (item.searchText) {
          titleIndex = item.searchText.toLowerCase().indexOf(wordLowerCase);
          item.isSearchText = true;
        }

        if (urlIndex !== -1 || titleIndex !== -1) {
          partMatchItems.push({
            item,
            title,
            urlIndex: urlIndex === -1 ? Infinity : urlIndex,
            titleIndex: titleIndex === -1 ? Infinity : titleIndex,
          });
        }
        else {
          var urlTest = item.isBookmarklet ? false : reg.test(item.url);
          var titleTest = reg.test(title);
          item.isSearchText = false;
          if (item.searchText) {
            item.isSearchText = true;
            titleTest = titleTest || reg.test(item.searchText);
          }

          if (urlTest || titleTest) {
            aimaiMatchItems.push({
              title,
              item,
              urlTest,
              titleTest,
            });
          }
        }
      });
      return [
        partMatchItems.sort((a, b) => {
          if (a.urlIndex === b.urlIndex) {
            if (a.titleIndex === b.titleIndex) {
              return a.title.length - b.title.length;
            }
            return a.titleIndex - b.titleIndex;
          }
          else {
            return a.urlIndex - b.urlIndex;
          }
        }).map(item => item.item),
        aimaiMatchItems.sort((a, b) => {

          var aCount = +a.titleTest + a.urlTest;
          var bCount = +b.titleTest + b.urlTest;
          if (aCount === bCount) {
            return a.title.length - b.title.length;
          }
          return bCount - aCount;
        }).map(item => item.item)
      ];
    };

    this.getItems = async (v) => {
      var searchType = 'normal';
      var items;

      if (/^\>/.test(v)) {
        searchType = 'bookmarklet';
        items = await util.bookmarks.getAll();
        items = items.filter(item => item.isBookmarklet);
        v = v.substr(1);
      }

      else if (/^\s/.test(v)) {
        searchType = 'bookmark';
        items = await util.bookmarks.getAll();
        items = items.filter(item => !item.isBookmarklet);
        v = v.substr(1);
      }
      else {
        var [items, bookmarks] = await Promise.all([util.tabs.getAllByAllWindow(), util.bookmarks.getAll()]);
        bookmarks = bookmarks.filter(item => !item.isBookmarklet);
        bookmarks.forEach(bookmark => {
          var item = items.find(item => item.url === bookmark.url);
          if (item) {
            item.searchText = bookmark.path;
          }
        });
      }
      if (v) {
        var result = [];

        v.split(/\s+/).reduce((filteredItems, word) => {
          var results = [];

          filteredItems.forEach((items) => {
            this.filterItems(items, word).forEach(items => {
              if (items.length > 0) {
                results.push(items);
              }
            });
          });
          return results;
        }, [items]).forEach(items => items.forEach(item => result.push(item)));
        items = result;

      }
      return items;
    };

    this.search = async () => {
      var v = this.refs.search.value;
      var items = await this.getItems(v);

      var domainMap = {};
      var domains = [];
      var domainReg = /^.*\:\/\/([^\/]*)\//i;
      var pushFunction = (item, index) => {
        var domainName = null;
        if (item.isBookmarklet) {
          domainName = 'ブックマークレット';
        }
        else {
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
            tabs: [],
          };
          domains.push(domain);
        }
        domain.tabs.push(item);
      };
      var updateIndex = () => {
        var counter = 0;

        domains.forEach((d, index) => {
          d.__index = index;
          d.tabs.forEach(i => {
            i.__index = counter++;
            i._del = false;
          });
        });
        this.tabLength = counter;
      };

      items.slice(0, 5).forEach(pushFunction);
      updateIndex();
      setTimeout(() => {
        items.slice(5, 10).forEach(pushFunction);
        updateIndex();
        this.update();
      }, 300);
      setTimeout(() => {
        items.slice(10, 20).forEach(pushFunction);
        updateIndex();
        this.update();
      }, 500);
      setTimeout(() => {
        items.slice(20).forEach(pushFunction);
        updateIndex();
        this.update();
      }, 1000);
      this.items = domains;

      this.selectIndex = 0;
      this.isSearching = false;
      this.update();
      this.trigger('searched');
      this.refs.scroll.scrollTop = 0;
    };

    this._debouncedSearch = _.debounce(this.search, 150);

    this.delaySearch = () => {
      this.isSearching = true;
      this._debouncedSearch();
    };

    this.switchTab = async (e) => {
      const {item} = e.item;
      if (item.isBookmarklet) {
        chrome.tabs.executeScript(await util.tabs.getCurrent().id, {
          code: decodeURIComponent(item.script.substr('javascript:'.length)),
        }, function () {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          }
          else {
            close();
          }
        });
      }
      else if (item.type === 'bookmark') {
        var tabs = await util.tabs.getAllByAllWindow();
        var url = item.url.replace(/\/$/g, '');
        var tab = tabs.find(tab => {
          return tab.url.replace(/\/$/g, '') === url;
        });
        if (tab) {
          util.tabs.activate(tab);
          util.close();
        }
        else {
          open(item.url);
        }
      }
      else {
        util.tabs.activate(item);
        util.close();
      }
    };

    this.focusTabFirst = (e) => {
      this.selectIndex = e.item.item.tabs[0].__index;
      this.update();
    };

    this.closeTab = (tab) => {
      if (!tab) return ;
      if (tab._del) return ;
      tab._del = true;
      this.update();
      chrome.tabs.remove(tab.id);
    };

    this.shortcut = (e) => {
      var code = e.keyCode;
      var isArrowUp = code === 38;
      var isArrowDown = code === 40;
      var domain = this._currentFocusDomain;
      var self = this;
      if (e.ctrlKey) {
        var f = {
          d() {
            var tab = this._primaryHover ? this._lastHover : this._currentFocusTab;
            if (!tab || tab._del) {
              tab = this._currentFocusTab;
            }
            this.closeTab(tab);
            e.preventDefault();
          },
        }[e.key];
        if (f) f.call(this);
        return ;
      }
      if (e.shiftKey) {
        if (isArrowUp) {
          this._primaryHover = false;
          if (domain) {
            var item = this.items[Math.max(0, domain.__index - 1)];
            if (item) {
              this.selectIndex = item.tabs[0].__index;
            }
          }
          e.preventDefault();
        }
        else if (isArrowDown) {
          this._primaryHover = false;
          if (domain) {
            var item = this.items[Math.min(this.items.length - 1, domain.__index + 1)];
            if (item) {
              this.selectIndex = item.tabs[0].__index;
            }
          }
          e.preventDefault();
        }
      }
      else if (isArrowUp) {
        this._primaryHover = false;
        this.selectIndex = Math.max(0, this.selectIndex - 1);
        e.preventDefault();
      }
      else if (isArrowDown) {
        this._primaryHover = false;
        this.selectIndex = Math.min(this.tabLength - 1, this.selectIndex + 1);
        e.preventDefault();
      }
      else {

        if (document.activeElement !== this.refs.search) {
          this.refs.search.focus();
        }
        e.preventUpdate = true;
      }
    };

    this.onmousemove = (e) => {
      e.preventUpdate = true;
      this._primaryHover = true;
    };

    this.mouseenter = (e) => {
      this._lastHover = e.item.item;
      e.preventUpdate = true;
    };

});
riot.tag2('item-domain', '<div class="f fm w-full p4 border-bottom cursor-pointer {opts.selected ? \'bg-link text-white\' : \'hover-bg-primary hover-text-white\'}"> <div class="mr4 flex-fixed s20 f fh bg-white rounded-4"> <img riot-src="{opts.item.favIconUrl}" alt="" class="object-fit-cover s16"> </div> <div> <div class="line-clamp-2 word-break-all white-space-pre-wrap w-full fs12 lh12">{opts.item.name}</div> </div> </div>', 'item-domain,[data-is="item-domain"]{display:block}', '', function(opts) {
    this.on('updated', () => {
      if (!this._lastSelected && opts.selected) {
        this.root.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
        });
      }
      this._lastSelected = opts.selected;
    });

});
riot.tag2('item-tab', '<div class="f fm w-full p4 border-bottom cursor-pointer {opts.selected ? \'bg-link text-white\' : \'hover-bg-primary hover-text-white\'}"> <div class="mr4 flex-fixed s24 f fh bg-white rounded-4"> <img riot-src="{opts.item.favIconUrl}" alt="" class="object-fit-cover s20"> </div> <div> <div class="line-clamp-1 word-break-all white-space-pre-wrap w-full fs12 lh12">{opts.item.isSearchText ? opts.item.searchText : opts.item.title}</div> <div class="line-clamp-1 word-break-all white-space-pre-wrap w-full fs10 parent-hover-text-white lh12 {opts.selected ? \'text-white\' : \'text-weak\'}">{opts.item.url}</div> </div> </div>', 'item-tab,[data-is="item-tab"]{display:block}', '', function(opts) {
    this.on('mount', () => {
      this.update();
    });
    this.on('updated', () => {
      if (!this._lastSelected && opts.selected) {
        this.root.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
        });
      }
      this._lastSelected = opts.selected;
    });

});