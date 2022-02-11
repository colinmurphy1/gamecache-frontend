<script>
  // Import page.js
  import router from 'page';

  // Import stores
  import { userData } from './stores/userdata.js';

  /*
  let user;
  userData.subscribe(value => {
    user = value;
  })
  */

  // Import routes
  import Home from './routes/Home.svelte';
  import News from './routes/News.svelte';
  import Profile from './routes/UserProfile.svelte';

  import Login from './routes/Login.svelte';
  import Logout from './routes/Logout.svelte';

  import NotFound from './routes/NotFound.svelte';

  let page;
  let params = null;

  // Specify routes
  router('/', () => (page = Home));
  router('/news', () => (page = News));
  router('/profile/:username',
    (ctx, next) => {
      params = ctx.params;
      next();
    },
    () => (page = Profile)
  );

  router('/login', () => (page = Login));
  router('/logout', () => (page = Logout));

  // Not Found page
  router('/*', () => (page = NotFound));

  router.start();

  // Import components for the main app
  import Navbar from './components/Navbar.svelte';

</script>

<main>
  <Navbar />

  <svelte:component this="{page}" params="{params}" />
</main>

<style>
  main {
    max-width: 1024px;
    margin: auto;
  }
</style>