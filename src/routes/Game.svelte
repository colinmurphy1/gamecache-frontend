<script>
  import { onMount } from "svelte";

  // Load API functions
  import getGame from "../api/game/getGame.js";

  // Load components
  import Page from "../components/Page.svelte";
  import PageTitle from "../components/headings/PageTitle.svelte";
  import Card from "../components/card/Card.svelte";
  import CardTitle from "../components/card/CardTitle.svelte";
  import CardRow from "../components/card/CardRow.svelte";

  let game;

  export let params;

  onMount(async () => {
    // Load Game
    try {
      game = await getGame(params.gameId);
    }
    catch(error) {
      console.log('Could not load game: ', error);
      return false;
    }

    console.log(game);
  });

</script>

<Page>
  {#if game}
    <PageTitle title={game.info.title} center=true />

    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div class="col-span-1 lg:mr-2">
       <Card>
          <CardTitle title="Game Information" />
          <CardRow key="Publisher:" value={game.info.publisher} url="/publisher/{game.info.publisher}" />
          <CardRow key="Release year:" value={game.info.year} />
          <CardRow key="Platform:" value={game.info.Device.name} />
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


