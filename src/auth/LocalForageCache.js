import localforage from 'localforage';
import memoryDriver from 'localforage-memoryStorageDriver';
import { setupCache } from 'axios-cache-adapter';

/**
 * Async function to configure localforage and setup the cache
 *
 * @returns {Object} A configured cache instance to use when creating an axios instance
 */
export default async function configureCache() {
  // Register the imported `memoryDriver` to `localforage`
  await localforage.defineDriver(memoryDriver);

  // Create `localforage` instance
  const forageStore = localforage.createInstance({
    // List of drivers used
    driver: [
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
      memoryDriver._driver
    ]
  });

  // Set up the cache with a default maxAge of 5 minutes and using localforage as the storage source
  return setupCache({
    maxAge: 5 * 60 * 1000,
    store: forageStore
  });
}