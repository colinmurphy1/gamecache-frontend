<script>
  // Import marked for markdown rendering
  import { marked } from 'marked';

  // Event dispatcher
  import {createEventDispatcher} from 'svelte';
  const dispatch = createEventDispatcher();

  // UI Components
  import SmallHeading from "../headings/SmallHeading.svelte";

  // Import game info prop
  export let game; 

  // Hide modal dispatcher
  const hideModal = () => {
    dispatch('hideModal', true);
  };

</script>


<div class=" bg-black/40 w-full h-screen z-50 absolute top-0 left-0">
  <div class="md:inset-center bg-white p-10 md:rounded-xl drop-shadow-lg md:max-w-2xl w-full">
    <div class="uppercase text-gray-700 font-semibold -mb-1">
      Game Notes
    </div>
    <SmallHeading>{game.title}</SmallHeading>

    <div class="my-8">
      {@html marked.parse(game.notes)}
    </div>
  

    <div class="mt-4">
      <button class="px-4 py-1 rounded bg-blue-400 hover:bg-blue-500 text-white font-semibold" on:click={hideModal}>
        Close
      </button>
    </div>

  </div>
</div>

