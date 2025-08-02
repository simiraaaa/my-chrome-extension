<script>
  let count = $state(0);
</script>

<button onclick={() => count++}>Increment</button>
{count}

<style>
  button {
    color: red;
  }
</style>
