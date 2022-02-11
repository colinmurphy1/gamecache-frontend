<script>
  // Import games list
  export let games;

  // Font Awesome icons
  import Icon from 'svelte-awesome';
  import { stickyNoteO, stickyNote } from 'svelte-awesome/icons';

  // Rating stars
  import Rating from './Rating.svelte';

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

  // Notes dialog (TODO MAKE THIS A MODAL WITH MARKDOWN!)
  const showNote = (title, text) => {
    alert(`Notes for: ${title}\n\n${text}`);
  };

</script>

<table class="table-auto border-gray-400 border w-full">
  <thead class="bg-gray-200 text-gray-800 text-left border-b border-gray-400">
    <tr>
      <th class="p-1 md:w-6/12">
        Title
      </th>
      <th class="p-1">
        Year
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
      <th class="p-1">
        <Icon data={stickyNoteO} />
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
        <Rating stars={game.rating} />
      </td>
      <td class="p-1">
        {status[game.status]}
      </td>
      <td class="p-1">
        <abbr title="{game.deviceName}">{game.deviceShortname}</abbr>
      </td>
      <td class="p-1">
        {#if game.notes}
          <button on:click={() => showNote(game.title, game.notes)}>
            <Icon data={stickyNote} />
          </button>
        {/if}
      </td>
    </tr>
  {/each}
  </tbody>
</table>
