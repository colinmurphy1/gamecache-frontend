<script>
  export let games;
  export let gameIds;
  export let showAddButton;

  // Font Awesome icons
  import Icon from 'svelte-awesome';
  import { plus } from 'svelte-awesome/icons';

  // Event dispatcher
  import {createEventDispatcher} from 'svelte';
  const dispatch = createEventDispatcher();


  let gameInCollection = (id) => {
    // If game is in the gameIds array return true
    if (gameIds.includes(id)) return true;
    return false;
  };


  // Add game dispatcher
  const addGame = (gameId) => {
    dispatch('addGame', gameId);
  }
</script>

<table class="table-auto border-gray-400 border w-full">
  <thead class="bg-gray-200 text-gray-800 text-left border-b border-gray-400">
    <tr>
      <th class="p-1 lg:w-6/12">
        Title
      </th>
      <th class="p-1">
        Year
      </th>
      <th class="p-1">
        Platform
      </th>
      <th class="p-1 ">
        Developer
      </th>
      {#if showAddButton}
        <th class="p-1 lg:w-24 text-center">
          Collection
        </th>
      {/if}
    </tr>
  </thead>
  <tbody>
  {#each games as game (game.id)}
    <tr class="border border-gray-400 hover:bg-gray-100 hover:text-gray-900">
      <td class="font-semibold">
        <a href="/games/id/{game.id}" class="p-1 hover:underline block">
          {game.title}
        </a>
      </td>
      <td class="p-1">
        {game.year}
      </td>
      <td>
        <a href="/games/platform/{game.Device.id}" class="p-1 hover:underline block">
          {game.Device.name}
        </a>
      </td>
      <td>
        <a href="/games/developer/{game.Developer.id}" class="p-1 hover:underline block">
          {game.Developer.name}
        </a>
      </td>
      {#if showAddButton}
        <td class="align-middle px-1 text-center">
          {#if gameInCollection(game.id)}
            <div class="font-semibold text-gray-700 uppercase">
              Added
            </div>
          {:else}
            <button
              class="px-2 py-0.5 rounded bg-green-400 hover:bg-green-500 text-green-900 font-semibold w-full"
              on:click={addGame(game)}
            >
              <Icon data={plus} /> Add
            </button>
          {/if}
       </td>
      {/if}
    </tr>
  {/each}
  </tbody>

</table>