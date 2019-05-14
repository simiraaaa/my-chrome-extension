riot.tag2('app', '<button class="button primary" ref="sort" type="button" onclick="{sortTabs}">タブソート</button>', 'app,[data-is="app"]{display:block;width:800px;max-width:800px}', '', function(opts) {

    this.on('mount', () => {
      this.refs.sort.focus();
    });

    this.sortTabs = async () => {
      await util.tabs.sort();
      util.close();
    };
});