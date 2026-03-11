// testing indexedDB

// creating the database

/*
let db;

const request = indexedDB.open("MyDatabase", 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains("values")) {
        db.createObjectStore("value");
    }
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log("Database opened successfully");
};

request.onerror = function(event) {
    console.log("Error opening database:", event.target.errorCode);
};

// adding values to the database
function addValue(id, name, value) {
    console.log(db);
    let transaction = request.transaction(["values"], "readwrite");
    let store = transaction.objectStore("value");

    let Values = { id: id, name: name, value: value };

    let request = store.add(Values);

    request.onsuccess = function() {
        console.log("User added:", Values);
    };

    request.onerror = function() {
        console.log("Error adding user:", request.error);
    };
}

window.addEventListener("DOMContentLoaded", function () {
  addValue(1, "value1", 432);
})

*/
const request1 = window.indexedDB.open('MyTestDatabase');

request1.onerror = function(event) {
    console.error('Database error: ' + event.target.errorCode);
};

request1.onsuccess = function(event) {
    console.log('Database opened successfully.');
    // close
    const db = event.target.result;
    db.close();
    
};




// Step 1: Open the IndexedDB database
let db;
const DB_NAME = 'TestDB';
const request = indexedDB.open(DB_NAME);

request.onerror = function(event) {
    console.error('Database error:', event.target.errorCode);
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains('values')) {
        db.createObjectStore('values', { keyPath: 'id' });
    }
};

const clean = function() {
    db.close();
    
    console.log("Database closed and deleted");
}




request.onsuccess = function(event) {
    db = event.target.result;

    // Step 2: Start a transaction
    const transaction = db.transaction(['values'], 'readwrite');

    // Access the object store
    const store = transaction.objectStore('values');

    // Step 3: Perform operations - Adding a new book

    // this is where you can add data into the database
    const book = {id: 1, title: 'Effective JavaScript', value: 24};
    const addRequest = store.add(book);

    addRequest.onsuccess = function() {
        console.log('Book added successfully!');
    };

    addRequest.onerror = function(event) {
        console.error('Failed to add book:', event.target.error);
    };

    // Step 4: Complete the transaction
    transaction.oncomplete = function() {
        console.log('Transaction completed successfully.');
        clean();
    };

    transaction.onerror = function() {
        console.error('Transaction failed.');
        clean();
    };
};

