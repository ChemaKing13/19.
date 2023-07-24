import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // // console.error('putDb not implemented');
  // if (!content.id) {
  //   content.id = generateUniqueId(); 
  // }
  

  const jateDb = await openDB('jate', 1); 
  const tx = jateDb.transaction('jate', 'readwrite'); 
  const store = tx.objectStore('jate');
  const request = store.put({id: 1, value: content});
  const result = await request; 
  console.log('result.value', result.value); 
  // return result; 
}; 


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { 
  // console.error('getDb not implemented');
  //create a connection to the database and version we want to use
  const jateDb = await openDB('jate', 1); 
  //open up the desired object store
  const tx = jateDb.transaction('jate', 'readonly'); 
  //open up the desired object store
  const store = tx.objectStore('jate');
  //use the .getAll() method to get all data in the database
  const request = store.get(1); 
  //get confirmation of the request
  const result = await request; 
  console.log('result.value', result); 
  return result?.value; 
}; 

initdb();
