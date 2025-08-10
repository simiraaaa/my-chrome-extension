<script lang="ts">
  import './style/meltline.css';
  import './style/main.less';
  import { util, tabUtil } from './script/util.js';
  import TabSwitcher from './modules/TabSwitcher.svelte';

  async function sortTabs() {
    await tabUtil.sort();
    util.close();
  }
</script>

<svelte:window
  onkeydown={(e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
      e.preventDefault();
      close();
    }
  }}
/>

<main>
  <div class="f flex-column s-full">
    <div class="f flex-column h0 flex-auto w-full">
      <TabSwitcher />
    </div>
    <button type="button" class="button primary flex-fixed" onclick={sortTabs}>タブソート</button>
  </div>
</main>

<style>
  main {
    display: block;
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
</style>
