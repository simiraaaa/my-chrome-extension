<script lang="ts" module>
  import type { HTMLButtonAttributes } from 'svelte/elements';

  export interface TabProps extends HTMLButtonAttributes {
    selected: boolean;
    favIconUrl?: string;
    title?: string;
    url: string;
  }
</script>

<script lang="ts">
  let {
    class: className,
    selected = false,
    favIconUrl = '',
    title = '',
    url,
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
  <div>
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
</button>
