<script lang="ts">
  import Test from './Test.svelte';

  let count = $state(0);
</script>

<button onclick={() => count++}>click {count}</button>
<Test></Test>

<style>
  button {
    color: blue;
  }
</style>
