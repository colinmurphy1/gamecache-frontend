<script>
  import { onMount } from "svelte";

  // Load API functions
  import getGame from "../api/game/getGame.js";

  // Import stores
  import { userData } from '../stores/userdata.js';

  // Focus (for accessibility)
  import {useFocus} from 'svelte-navigator';
  const registerFocus = useFocus();

  // Load components
  import Page from "../components/Page.svelte";
  import PageTitle from "../components/headings/PageTitle.svelte";
  import Card from "../components/card/Card.svelte";
  import CardTitle from "../components/card/CardTitle.svelte";
  import CardRow from "../components/card/CardRow.svelte";

  let game;

  export let gameId;

  onMount(async () => {
    // Load Game
    try {
      game = await getGame(gameId, $userData.token);
    }
    catch(error) {
      console.log('Could not load game: ', error);
      return false;
    }
  });

</script>

<Page>
  {#if game}

    <div use:registerFocus class="focus:outline-none">
      <PageTitle title={game.info.title} center=true />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div class="col-span-1 lg:mr-2">
       <Card>
          <CardTitle title="Game Information" />
          <CardRow key="Developer:" value={game.info.Developer.name} url="/games/developer/{game.info.Developer.id}" />
          <CardRow key="Release year:" value={game.info.year} />
          <CardRow key="Platform:" value={game.info.Device.name} url="/games/platform/{game.info.Device.id}"/>
          <CardRow key="Rating:" value="{game.rating.value} ({game.rating.users} users)" />
        </Card>
      </div>

      <div class="col-span-1 lg:ml-2">
        <Card>
          <CardTitle title="Users who own this game" />
          {#if game.owners == 0}
            <p>
              Nobody owns {game.info.title} at this time.
            </p>
          {:else}
            <ul>
            {#each game.owners as owner (owner.id)}
              <li class="p-1 border-b border-gray-400 last:border-0">
                <a href="/users/{owner.username}" class="block hover:underline font-semibold">
                  {owner.username}
                </a>
              </li>
            {/each}
            </ul>
          {/if}
        </Card>
      </div>

    </div>

  {:else}
    <p>
      Could not load game
    </p>
  {/if}
</Page>


