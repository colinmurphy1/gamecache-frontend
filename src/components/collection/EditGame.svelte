<script>
  // Event dispatcher
  import {createEventDispatcher, onMount} from 'svelte';
  const dispatch = createEventDispatcher();

  // Import Svelte-use-form for the form
  import { useForm } from "svelte-use-form";
  const form = useForm();

  // UI Components
  import SmallHeading from "../headings/SmallHeading.svelte";

  // Import game info prop
  export let game; 

  // Hide modal dispatcher
  const hideModal = () => {
    dispatch('hideModal', true);
  };

  // status and ratings, for the form dropdowns
  const status = [
    {code: 0, value: "Unplayed"},
    {code: 1, value: "Playing"},
    {code: 2, value: "Completed"},
    {code: 3, value: "Won't Finish"}
  ];
  const ratings = [
    {stars: 0, value: "Unrated"},
    {stars: 1, value: "1 star"},
    {stars: 2, value: "2 stars"},
    {stars: 3, value: "3 stars"},
    {stars: 4, value: "4 stars"},
    {stars: 5, value: "5 stars"},
  ];

  const saveGame = () => {
    // Dispatch the updated information to the Collection route
    dispatch('saveGame', {
      gameId: game.id,
      notes: game.notes,
      rating: game.rating,
      status: game.status
    });
  };
</script>


<div class=" bg-black/40 w-full h-screen z-50 absolute top-0 left-0">
  <div class="md:inset-center bg-white p-10 md:rounded-xl drop-shadow-lg md:max-w-2xl w-full">
    <div class="uppercase text-gray-700 font-semibold -mb-1">
      Editing game
    </div>
    <SmallHeading>{game.title}</SmallHeading>

    <form class="w-full mt-4" use:form on:submit|preventDefault={saveGame}>
      <div class="md:flex md:items-center mb-2">
        <div class="md:w-1/4">
          <label class="block font-semibold md:text-right mb-1 md:mb-0 pr-4" for="status">
            Status:
          </label>
        </div>
        <div class="md:w-3/4">
          <select name="status" id="status" class="w-full form-select appearance-none border-2 border-gray-200 px-2 py-1 focus:outline-none focus:bg-white focus:border-blue-500 rounded" bind:value={game.status}>
            {#each status as x (x.code)}
              <option value={x.code}>{x.value}</option>
            {/each}
          </select>
        </div>
      </div>

      <div class="md:flex md:items-center mb-2">
        <div class="md:w-1/4">
          <label class="block font-semibold md:text-right mb-1 md:mb-0 pr-4" for="rating">
            Rating:
          </label>
        </div>
        <div class="md:w-3/4">
          <select name="rating" id="rating" class="w-full form-select appearance-none border-2 border-gray-200 px-2 py-1 focus:outline-none focus:bg-white focus:border-blue-500 rounded" bind:value={game.rating}>
            {#each ratings as x (x.stars)}
              <option value={x.stars}>{x.value}</option>
            {/each}
          </select>
        </div>
      </div>

      <div class="md:flex md:items-center mb-2">
        <div class="md:w-1/4">
          <label class="block font-semibold md:text-right mb-1 md:mb-0 pr-4" for="notes">
            Notes:
          </label>
        </div>
        <div class="md:w-3/4">
          <textarea
            name="notes"
            id="notes"
            class="w-full appearance-none border-2 border-gray-200 px-2 py-1 focus:outline-none focus:bg-white focus:border-blue-500 rounded resize-y h-40"
            bind:value={game.notes}
          ></textarea>
        </div>
      </div>

      <div class="flex flex-row justify-between mt-4">
        <button class="px-4 py-1 rounded bg-blue-400 hover:bg-blue-500 text-white font-semibold">
          Save
        </button>
        <button class="px-4 py-1 rounded bg-gray-400 hover:bg-gray-500 text-white font-semibold" on:click={hideModal}>
          Cancel
        </button>
      </div>
    </form>

  </div>
</div>

