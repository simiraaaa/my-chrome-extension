riot.tag2('app', '<div class="f flex-column s-full"> <module-tab-switcher class="f flex-column s-full"></module-tab-switcher> <button class="button primary" ref="sort" type="button" onclick="{sortTabs}">タブソート</button> </div>', 'app,[data-is="app"]{display:block;position:absolute;overflow:hidden;width:100%;height:100%}', '', function(opts) {

    this.on('mount', () => {
      this.refs.sort.focus();
    });

    this.sortTabs = async () => {
      await util.tabs.sort();
      util.close();
    };
});
riot.tag2('module-tab-switcher', '<form onsubmit="{submit}" class="f flex-column s-full" onkeydown="{selectUpDown}"> <input ref="search" type="search" oninput="{delaySearch}" class="input w-full fs12 flex-fixed letter-spacing-1"> <div class="overflow-scroll s-full" ref="scroll"> <item-tab each="{item, i in items}" item="{item}" onclick="{switchTab}" selected="{i === parent.selectIndex}"></item-tab> </div> </form>', 'module-tab-switcher,[data-is="module-tab-switcher"]{display:block}', '', function(opts) {

    this.selectIndex = 0;

    this.on('mount', () => {
      this.search();
      this.refs.search.focus();
    });

    this.submit = (e) => {
      e.preventDefault();

      var item = this.items[this.selectIndex];
      if (item) {
        this.switchTab({item:{item}});
      }
    };

    this.search = async () => {
      var items = await util.tabs.getAllByAllWindow();
      var v = this.refs.search.value;
      var reg = util.reg.createSearch(v, 'i');
      if (v) {
        var partMatchItems = [];
        var aimaiMatchItems = [];
        items.forEach(item => {
          var urlIndex = item.url.indexOf(v.toLowerCase());
          var titleIndex = item.title.toLowerCase().indexOf(v.toLowerCase());
          if (urlIndex !== -1 || titleIndex !== -1) {
            partMatchItems.push({
              item,
              urlIndex,
              titleIndex,
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
        items = partMatchItems.sort((a, b) => {
          if (a.urlIndex === b.urlIndex) {
            return a.titleIndex - b.titleIndex;
          }
          else {
            return a.urlIndex - b.urlIndex;
          }
        }).map(item => item.item).concat(aimaiMatchItems.sort((a, b) => {

          var aCount = +a.titleTest + a.urlTest;
          var bCount = +b.titleTest + b.urlTest;
          return bCount - aCount;
        }).map(item => item.item));
      }
      this.items = items;
      this.selectIndex = 0;
      this.update();
      this.refs.scroll.scrollTop = 0;
    };

    this.delaySearch = _.debounce(this.search, 150);

    this.switchTab = (e) => {
      util.tabs.activate(e.item.item);
      util.close();
    };

    this.selectUpDown = (e) => {
      if (e.keyCode === 38) {
        this.selectIndex = Math.max(0, this.selectIndex - 1);
        e.preventDefault();
      }
      else if (e.keyCode === 40) {
        this.selectIndex = Math.min(this.items.length - 1, this.selectIndex + 1);
        e.preventDefault();
      }
      else {
        e.preventUpdate = true;
      }
    };

});
riot.tag2('item-tab', '<div class="f fm w-full p4 border-bottom cursor-pointer {opts.selected ? \'bg-link text-white\' : \'hover-bg-primary hover-text-white\'}"> <div class="mr4 flex-fixed s24 f fh bg-white rounded-4"> <img riot-src="{opts.item.favIconUrl}" alt="" class="object-fit-cover s20"> </div> <div> <div class="line-clamp-1 word-break-all white-space-pre-wrap w-full fs12 lh12">{opts.item.title}</div> <div class="line-clamp-1 word-break-all white-space-pre-wrap w-full fs10 parent-hover-text-white lh12 {opts.selected ? \'text-white\' : \'text-weak\'}">{opts.item.url}</div> </div> </div>', 'item-tab,[data-is="item-tab"]{display:block}', '', function(opts) {
});