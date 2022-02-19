<script>
  export let center = false;
</script>

<h1 class="text-3xl my-2 font-semibold {center ? 'text-center' : ''}">
  <slot />
</h1>
