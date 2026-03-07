<script lang="ts" module>
  import type { HTMLButtonAttributes } from 'svelte/elements';

  export interface TabProps extends HTMLButtonAttributes {
    selected: boolean;
    favIconUrl?: string;
    title?: string;
    url: string;
    hasBeenRead?: boolean;
    isReadingList?: boolean;
    onToggleRead?: () => void;
  }
</script>

<script lang="ts">
  let {
    class: className,
    selected = false,
    favIconUrl = '',
    title = '',
    url,
    hasBeenRead = false,
    isReadingList = false,
    onToggleRead,
    ...attrs
  }: TabProps = $props();

  let root = $state<HTMLButtonElement>();
  let _lastSelected = false;

  $effect(() => {
    if (!_lastSelected && selected) {
      root?.scrollIntoView({
        block: 'nearest',
        inline: 'nearest'
      });
    }
    _lastSelected = selected;
  });
</script>

<button
  class="{className} f fm w-full p4 border-bottom cursor-pointer text-left {selected
    ? 'bg-link text-white'
    : 'hover-bg-primary hover-text-white'}"
  type="button"
  bind:this={root}
  {...attrs}
>
  <div class="mr4 flex-fixed s24 f fh bg-white rounded-4">
    <img class="object-fit-cover s20" src={favIconUrl} alt="" />
  </div>
  <div class="f-1 overflow-hidden">
    <div class="line-clamp-1 word-break-all white-space-pre-wrap w-full fs12 lh12">
      {title}
    </div>
    <div
      class="line-clamp-1 word-break-all white-space-pre-wrap w-full fs10 parent-hover-text-white lh12 {selected
        ? 'text-white'
        : 'text-weak'}"
    >
      {url}
    </div>
  </div>
  {#if isReadingList}
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div
      class="flex-fixed ml-auto pl6 f fh"
      role="button"
      tabindex="0"
      title={hasBeenRead ? '既読' : '未読'}
      onclick={(e) => { e.stopPropagation(); onToggleRead?.(); }}
    >
      {#if hasBeenRead}
        <!-- 既読: grey fill + white check -->
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" fill="#999" stroke="#999" stroke-width="2"/>
          <polyline points="7 12.5 10.5 16 17 9" fill="none" stroke="white" stroke-width="2.2"/>
        </svg>
      {:else}
        <!-- 未読: outline circle + outline check -->
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
          <polyline points="7 12.5 10.5 16 17 9" fill="none" stroke="currentColor" stroke-width="2.2"/>
        </svg>
      {/if}
    </div>
  {/if}
</button>
