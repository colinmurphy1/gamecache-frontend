<script>
  // Import svelte-navigator
  import { Router, Route } from 'svelte-navigator';
  import { onMount } from 'svelte';

  // Add ping function which checks if a token is valid (and extends time if
  // it is)
  import pingUser from "./api/auth/ping.js";

  // Import the userData store and subscribe to it
  import { userData } from './stores/userdata.js';
  let user;
  userData.subscribe(value => user = value);

  // When set to hideNav hide the navbar
  let hideNav = false;

  import ProtectedRoute from "./components/routing/ProtectedRoute.svelte";

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
  import Collection from './routes/Collection.svelte';

  import AdminHome from "./routes/admin/AdminHome.svelte";
  import AdminAddGame from "./routes/admin/AddGame.svelte";
  import AdminAddDeveloper from "./routes/admin/AddDeveloper.svelte";
  import AdminAddPlatform from "./routes/admin/AddPlatform.svelte";
  import AdminAddManufacturer from "./routes/admin/AddManufacturer.svelte";
  import AdminAddPost from "./routes/admin/AddPost.svelte";

  export let url = "";


  // Check user logon status on page load
  onMount(async () => {
    if(user.token) {
      const checkUser = await pingUser(user.token);
      if (checkUser) {
        // Update token expiry
        $userData.token_expires_at = checkUser.token_expires_at;
        return true;
      }
      // User not logged in, clear local storage
      userData.set({});
      return false;
    }
  });


  // Handle hiding nav and footer on specific pages
  function handleHideNav(event) {
    event.detail.hidden ? hideNav = true : hideNav = false;
  }

  // Import components for the main app
  import Navbar from './components/nav/Navbar.svelte';
</script>

<main>
  <Router url={url}>
    {#if hideNav == false}
      <Navbar />
    {/if}
    
    <Route path="/">
      <Home />
    </Route>

    <Route path="/news">
      <News />
    </Route>

    <Route path="/users/*">
      <Route path="/">
        <AllUsers />
      </Route>
      <Route path=":username" let:params>
        <Profile params={params} />
      </Route>
    </Route>
  
    <Route path="/games/id/:gameId" let:params>
      <Game gameId={params.gameId} />
    </Route>
  
    <Route path="/login">
      <Login on:hideNav={handleHideNav} />
    </Route>

    <Route path="/logout" primary={false}>
      <Logout />
    </Route>

    <Route path="/register">
      <Register on:hideNav={handleHideNav} />
    </Route>

    <ProtectedRoute path="/collection" component={Collection} />

    <!-- Site Admin -->
    <ProtectedRoute path="/admin" component={AdminHome} admin={true}/>
    <ProtectedRoute path="/admin/game/add" component={AdminAddGame} admin={true}/>
    <ProtectedRoute path="/admin/developer/add" component={AdminAddDeveloper} admin={true}/>
    <ProtectedRoute path="/admin/platform/add" component={AdminAddPlatform} admin={true}/>
    <ProtectedRoute path="/admin/manufacturer/add" component={AdminAddManufacturer} admin={true}/>
    <ProtectedRoute path="/admin/news/add" component={AdminAddPost} admin={true}/>
    <!-- Site Admin End -->
  
    <!-- Not Found page -->
    <Route path="*">
      <NotFound />
    </Route>
  </Router>

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
