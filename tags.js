riot.tag2('app', '<div class="f flex-column s-full"> <module-tab-switcher class="f flex-column s-full"></module-tab-switcher> <button class="button primary" ref="sort" type="button" onclick="{sortTabs}">タブソート</button> </div>', 'app,[data-is="app"]{display:block;position:absolute;overflow:hidden;width:100%;height:100%}', '', function(opts) {

    this.on('mount', () => {
    });

    this.sortTabs = async () => {
      await util.tabs.sort();
      util.close();
    };
});
riot.tag2('module-tab-switcher', '<form onsubmit="{submit}" class="f flex-column s-full" onkeydown="{selectUpDown}"> <input ref="search" type="search" oninput="{delaySearch}" class="input w-full fs12 flex-fixed letter-spacing-1"> <div tabindex="-1" class="outline-none f w-full overflow-hidden"> <div class="flex-fixed w200 h-full f flex-column border-right"> <div class="bg-lightgray w-full p6 fs12 text-center flex-fixed">Shift + ↓↑</div> <div class="s-full overflow-scroll"> <item-domain each="{item in items}" item="{item}" selected="{_currentFocusDomain === item}" onclick="{parent.focusTabFirst}"></item-domain> </div> </div> <div class="s-full f flex-column"> <div class="bg-lightgray w-full p6 fs12 text-center flex-fixed">↓↑</div> <div class="overflow-scroll s-full" ref="scroll"> <div each="{domain in items}"> <div class="bg-whitesmoke border-bottom w-full py8 px6 fs12 flex-fixed">{domain.name}</div> <item-tab each="{item in domain.tabs}" item="{item}" onclick="{switchTab}" selected="{item.__index === parent.parent.selectIndex}"></item-tab> </div> </div> </div> </div> </form>', 'module-tab-switcher,[data-is="module-tab-switcher"]{display:block}', '', function(opts) {

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
        var urlIndex = item.url.indexOf(wordLowerCase);
        var titleIndex = item.title.toLowerCase().indexOf(wordLowerCase);

        if (urlIndex !== -1 || titleIndex !== -1) {
          partMatchItems.push({
            item,
            urlIndex: urlIndex === -1 ? Infinity : urlIndex,
            titleIndex: titleIndex === -1 ? Infinity : titleIndex,
          });
        }
        else {
          var urlTest = reg.test(item.url);
          var titleTest = reg.test(item.title);

          if (urlTest || titleTest) {
            aimaiMatchItems.push({
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
            return a.titleIndex - b.titleIndex;
          }
          else {
            return a.urlIndex - b.urlIndex;
          }
        }).map(item => item.item),
        aimaiMatchItems.sort((a, b) => {

          var aCount = +a.titleTest + a.urlTest;
          var bCount = +b.titleTest + b.urlTest;
          return bCount - aCount;
        }).map(item => item.item)
      ];
    };

    this.search = async () => {
      var items = await util.tabs.getAllByAllWindow();
      var v = this.refs.search.value;
      if (v) {
        var results = [];
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
        }, [items]).forEach(items => items.forEach(item => results.push(item)));
        items = results;
      }

      var domainMap = {};
      var domains = [];
      var domainReg = /^.*\:\/\/([^\/]*)\//i;
      items.forEach((item, index) => {
        var domainMatch = item.url.match(domainReg);
        var domainName = null;

        if (domainMatch) {
          domainName = domainMatch[1].replace(/^www\./, '').replace(/\:\d+/, '');
        }
        if (!domainName) {
          domainName = 'その他';
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
      });
      this.items = domains;
      var counter = 0;

      this.items.forEach((d, index) => {
        d.__index = index;
        d.tabs.forEach(i => {
          i.__index = counter++;
        });
      });
      this.tabLength = counter;
      this.selectIndex = 0;
      this.isSearching = false;
      this.trigger('searched');
      this.update();
      this.refs.scroll.scrollTop = 0;
    };

    this._debouncedSearch = _.debounce(this.search, 150);

    this.delaySearch = () => {
      this.isSearching = true;
      this._debouncedSearch();
    };

    this.switchTab = (e) => {
      util.tabs.activate(e.item.item);
      util.close();
    };

    this.focusTabFirst = (e) => {
      this.selectIndex = e.item.item.tabs[0].__index;
      this.update();
    };

    this.selectUpDown = (e) => {
      var code = e.keyCode;
      var isArrowUp = code === 38;
      var isArrowDown = code === 40;
      var domain = this._currentFocusDomain;
      if (e.shiftKey) {
        if (isArrowUp) {
          if (domain) {
            var item = this.items[Math.max(0, domain.__index - 1)];
            if (item) {
              this.selectIndex = item.tabs[0].__index;
            }
          }
          e.preventDefault();
        }
        else if (isArrowDown) {
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
        this.selectIndex = Math.max(0, this.selectIndex - 1);
        e.preventDefault();
      }
      else if (isArrowDown) {
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
riot.tag2('item-tab', '<div class="f fm w-full p4 border-bottom cursor-pointer {opts.selected ? \'bg-link text-white\' : \'hover-bg-primary hover-text-white\'}"> <div class="mr4 flex-fixed s24 f fh bg-white rounded-4"> <img riot-src="{opts.item.favIconUrl}" alt="" class="object-fit-cover s20"> </div> <div> <div class="line-clamp-1 word-break-all white-space-pre-wrap w-full fs12 lh12">{opts.item.title}</div> <div class="line-clamp-1 word-break-all white-space-pre-wrap w-full fs10 parent-hover-text-white lh12 {opts.selected ? \'text-white\' : \'text-weak\'}">{opts.item.url}</div> </div> </div>', 'item-tab,[data-is="item-tab"]{display:block}', '', function(opts) {
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