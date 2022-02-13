<script>
  export let message = "";
  export let level = "info";
  export let title = "";

  let styles = "";

  switch (level) {
    case "info":
      styles = "bg-indigo-100 text-indigo-700 border-indigo-400";
      break;
    case "success": 
      styles = "bg-green-100 text-green-700 border-green-400";
      break;
    case "warning":
      styles = "bg-yellow-100 text-yellow-700 border-yellow-400";
      break;
    case "danger":
      styles = "bg-red-100 text-red-700 border-red-400";
      break;
  }

</script>

<div class="py-1 px-2 my-2 border {styles} flex flex-row space-x-4">
  {#if title}
  <div class="font-bold">
    {title}
  </div>
  {/if}
  <div>
    {message}
  </div>
</div>
