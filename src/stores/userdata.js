import { writable } from "svelte/store";

/* 
 * The UserData store stores user information for the API, such as username,
 * the user token, and the time it expires.
 */

// Load data in local storage if it exists, if it does not, create the store.
const stored = localStorage.getItem('gamecache_userData');
export const userData = writable(JSON.parse(stored) || {});

// Update localstorage on update
userData.subscribe((value) => {
  console.log('localstorage updated')
  localStorage.setItem('gamecache_userData', JSON.stringify(value));
});
