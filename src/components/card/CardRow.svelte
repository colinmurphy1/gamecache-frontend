<script>
  export let key, value;
  export let url = "";
</script>

<div class="grid grid-cols-2 p-1 border-b border-gray-400 last:border-0">
  <div class="text-gray-800 font-semibold">
    {key}
  </div>
  <div>
    {#if url}
      <a href={url} class="hover:underline block">
        {value}
      </a>
    {:else}
      {value}
    {/if}
    
  </div>
</div>