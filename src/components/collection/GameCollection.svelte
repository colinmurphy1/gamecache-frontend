<script>
  // Import games list
  export let games;

  // Event dispatcher
  import {createEventDispatcher} from 'svelte';
  const dispatch = createEventDispatcher();

  // Font Awesome icons
  import Icon from 'svelte-awesome';
  import { stickyNoteO, stickyNote, trash, pencil } from 'svelte-awesome/icons';

  // Rating stars
  import Rating from '../Rating.svelte';

  // Game statii
  const status = {
    0: 'Unplayed',
    1: 'Playing',
    2: 'Completed',
    3: 'Won\'t Finish'
  }

  // Background styles for the rows
  const backgrounds = {
    0: 'bg-gray-100 text-gray-900',
    1: 'bg-blue-100 text-blue-900',
    2: 'bg-green-100 text-green-900',
    3: 'bg-red-100 text-red-900'
  }

  // Delete Game dispatcher
  const deleteGame = (game) => {
    dispatch('deleteGame', game);
  };

  // Edit Game dispatcher
  const editGame = (game) => {
    dispatch('editGame', game);
  };


</script>

<div class="overflow-x-auto">
  <table class="table-auto border-gray-400 border w-full">
    <thead class="bg-gray-200 text-gray-800 text-left border-b border-gray-400">
      <tr>
        <th class="p-1 md:w-5/12 w-9/12">
          Title
        </th>
        <th class="p-1">
          Year
        </th>
        <th class="p-1">
          Developer
        </th>
        <th class="p-1">
          Rating
        </th>
        <th class="p-1">
          Status
        </th>
        <th class="p-1">
          Platform
        </th>
        <th class="p-1 text-center" colspan=2>
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
    {#each games as game (game.id)}
      <tr class="border border-gray-400 {backgrounds[game.status]}">
        <td class="p-1 font-semibold">
          <a href="/games/id/{game.gameId}" class="hover:underline block">
            {game.title}
          </a>
        </td>
        <td class="p-1">
          {game.year}
        </td>
        <td class="p-1">
          <a href="/games/developer/{game.developerId}" class="hover:underline block">
            {game.developer}
          </a>
        </td>
        <td class="p-1">
          <Rating stars={game.rating} />
        </td>
        <td class="p-1">
          {status[game.status]}
        </td>
        <td class="p-1">
          <abbr title="{game.deviceName}">{game.deviceShortname}</abbr>
        </td>
        <td class="px-1">
          <button
            class="p-0.5 rounded bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold w-full"
            title="Edit"
            on:click="{editGame(game)}"
          >
            <Icon data={pencil} /> Edit
          </button>
        </td>
        <td class="px-1">
          <button
            class="p-0.5 rounded bg-red-400 hover:bg-red-500 text-red-900 font-semibold w-full"
            title="Delete"
            on:click="{deleteGame(game)}"
          >
            <Icon data={trash} /> Delete
          </button>
        </td>
      </tr>
    {/each}
    </tbody>
  </table>
  
</div>

