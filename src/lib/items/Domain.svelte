<script lang="ts" module>
  import type { HTMLButtonAttributes } from 'svelte/elements';

  export interface DomainProps extends HTMLButtonAttributes {
    favIconUrl?: string;
    name?: string;
    selected?: boolean;
  }
</script>

<script lang="ts">
  let { favIconUrl, name, selected = false, ...attrs }: DomainProps = $props();

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
  class="f fm w-full text-left p4 border-bottom cursor-pointer {selected
    ? 'bg-link text-white'
    : 'hover-bg-primary hover-text-white'}"
  type="button"
  {...attrs}
  bind:this={root}
>
  <div class="mr4 flex-fixed s20 f fh bg-white rounded-4">
    <img class="object-fit-cover s16" src={favIconUrl} alt="" />
  </div>
  <div>
    <div class="line-clamp-2 word-break-all white-space-pre-wrap w-full fs12 lh12">{name}</div>
  </div>
</button>
