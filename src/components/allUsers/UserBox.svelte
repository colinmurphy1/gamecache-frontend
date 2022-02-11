<script>
  export let username;
  export let online;

  // Font Awesome
  import Icon from 'svelte-awesome';
  import { circle } from 'svelte-awesome/icons';
</script>

<div>
  <a href="/users/{username}" class="w-full block bg-gray-600 hover:bg-blue-500 text-white p-2 rounded font-semibold mt-1 focus:outline-none focus:ring focus:border-blue-300 lg:text-lg">
    {username}
    {#if online}
      <Icon data={circle} class="text-green-500 text-shadow float-right py-1 lg:py-1.5" scale="2" />
      <span class="invisible">(online)</span>
    {/if}
  </a>
</div>
