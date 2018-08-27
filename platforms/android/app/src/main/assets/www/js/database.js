// namaBarang,Harga,terapis,jml,total
var databaseName = 'myDB';
var databaseVersion = 1;
var openRequest = window.indexedDB.open(databaseName, databaseVersion),db,tx,store,index;
openRequest.onerror = function (event) {
    console.log(openRequest.errorCode);
};


openRequest.onupgradeneeded = function (event) {
    // This is either a newly created database, or a new version number
    // has been submitted to the open() call.
    var db = openRequest.result,
    store=db.createObjectStore("pesanan",{autoIncrement: true});

    db.onerror = function () {
        console.log(db.errorCode);
    };
};

openRequest.onsuccess = function (event) {
    // Database is open and initialized - we're good to proceed.
    db = openRequest.result;
    displayData();
};


