<script>
  // Import page.js
  import router from 'page';

  // Import routes
  import Home from './routes/Home.svelte';
  import News from './routes/News.svelte';
  import AllUsers from './routes/AllUsers.svelte';
  import Profile from './routes/UserProfile.svelte';

  import Login from './routes/Login.svelte';
  import Logout from './routes/Logout.svelte';

  import NotFound from './routes/NotFound.svelte';

  let page;
  let params = null;

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

  // Log in, log out, register endpoints
  router('/login', () => page = Login);
  router('/logout', () => page = Logout);

  // Not Found page
  router('/*', () => page = NotFound);

  router.start();

  // Import components for the main app
  import Navbar from './components/nav/Navbar.svelte';
</script>

<main>
  <Navbar />

  <div class="container max-w-screen-xl mx-auto">
    <svelte:component this="{page}" params="{params}" />
  </div>
</main>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>