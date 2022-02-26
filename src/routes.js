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
import AdminGames from './routes/admin/Games.svelte';


export default [
  // Home page
  {
    path: '/',
    component: Home
  },

  // News Page
  {
    path: '/news',
    component: News
  },

  // All Users page
  {
    path: '/users',
    component: AllUsers
  },

  // Single user profile page
  {
    path: '/users/:username',
    component: Profile
  },

  // Single game page
  {
    path: '/games/id/:gameId',
    component: Game
  },

  // Game Collection page (must be logged in)
  {
    path: '/collection',
    component: Collection,
    auth: true
  },

  // Login 
  {
    path: '/login',
    component: Login,
  },

  // Logout
  {
    path: '/logout',
    component: Logout
  },

  // Register
  {
    path: '/register',
    component: Register,
  },

  {
    path: '/admin/games',
    component: AdminGames
  },

  // Not Found Page
  {
    path: '/*',
    component: NotFound
  }
]
