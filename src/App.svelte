<script>
  // Import page.js
  import router from 'page';

  // Import routes
  import Home from './routes/Home.svelte';
  import News from './routes/News.svelte';
  import AllUsers from './routes/AllUsers.svelte';
  import Profile from './routes/UserProfile.svelte';
  import Game from './routes/Game.svelte';
  import Login from './routes/Login.svelte';
  import Logout from './routes/Logout.svelte';
  import Register from './routes/Register.svelte'
  import NotFound from './routes/NotFound.svelte';

  let page;
  let params = null;

  let hideNav = false;

  // Specify routes
  router('/', () => page = Home);

  // News
  router('/news', () => page = News);

  // All users
  router('/users', () => page = AllUsers)

  // Single user profile
  router('/users/:username',
    (ctx, next) => {
      params = ctx.params;
      next();
    },
    () => page = Profile
  );

  // Single game page
  router('/games/id/:gameId',
    (ctx, next) => {
      params = ctx.params;
      next();
    },
    () => page = Game
  );

  // Log in, log out, register endpoints
  router('/login', () => page = Login);
  router('/logout', () => page = Logout);

  router('/register', () => page = Register);

  // Not Found page
  router('/*', () => page = NotFound);

  router.start();

  // Handle hiding nav and footer on specific pages
  function handleHideNav(event) {
    event.detail.hidden ? hideNav = true : hideNav = false;
  }

  // Import components for the main app
  import Navbar from './components/nav/Navbar.svelte';
</script>

<main>
  {#if hideNav == false}
    <Navbar />
  {/if}

  <svelte:component this={page} params={params} on:hideNav={handleHideNav} />
</main>

<style lang="postcss" global>
  /* Load Tailwind CSS */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer utilities { 
    .inset-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>