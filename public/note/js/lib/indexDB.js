(function (d) {
    //浏览器端数据库
    const DB_NAME = 'dairo-off-line';
    const DB_VERSION = 1;
    const DB_STORE_NAME = 'user';
    var db;
    //传入需创建的字段进行初始化
    d.initDb = function () {
        console.debug("initDb ...");
        var args = arguments;
        var req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onsuccess = function (evt) {
            db = this.result;
            console.debug("initDb DONE");
        };
        req.onerror = function (evt) {
            console.error("initDb:", evt.target.errorCode);
        };
        req.onupgradeneeded = function (evt) {
            console.debug("initDb.onupgradeneeded");
            var i;
            var store = evt.currentTarget.result.createObjectStore(
                DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });
            for (i in args){
                store.createIndex(args, args, { unique: false });
            }
        };
    };
    //写入数据
    d.addPublication = function (indexed) {
        console.debug("addPublication arguments:", arguments);
        if (!db) {
            console.error("addPublication: the db is not initialized");
            return;
        }
        var tx = db.transaction(DB_STORE_NAME, 'readwrite');
        var store = tx.objectStore(DB_STORE_NAME);
        var req = store.add(indexed);
        req.onsuccess = function (evt) {
            console.debug("Insertion in DB successful");
        };
        req.onerror = function() {
            console.error("add error", this.error);
            displayActionFailure(this.error);
        };
    };
    d.deletePublication = function (id) {
        console.debug("delete ...");
        var k = id;
        console.debug("delete k:", k);
        var tx = db.transaction(DB_STORE_NAME, 'readwrite');
        var store = tx.objectStore(DB_STORE_NAME);
        k = Number(k);
        var req = store.get(k);
        req.onsuccess = function(evt) {
            var record = evt.target.result;
            console.debug("record:", record);
            if (typeof record !== 'undefined') {
                req = store.delete(k);
                req.onsuccess = function(evt) {
                    console.debug("evt:", evt);
                    console.debug("evt.target:", evt.target);
                    console.debug("evt.target.result:", evt.target.result);
                    console.debug("delete successful");
                    displayActionSuccess("Deletion successful");
                    d.displayPubList();
                };
                req.onerror = function (evt) {
                    console.error("delete:", evt.target.errorCode);
                };
            } else {
                displayActionFailure("No matching record found");
            }
        };
        req.onerror = function (evt) {
            console.error("delete:", evt.target.errorCode);
        };
    }
    //显示数据列表
    d.displayPubList =  function () {
        console.debug("displayPubList");
        var tx = db.transaction(DB_STORE_NAME, 'readonly');
        var store = tx.objectStore(DB_STORE_NAME);
        var req;
        //得到数据个数
        req = store.count();
        req.onsuccess = function(evt) {
            console.log(evt.target.result);
        };
        req.onerror = function(evt) {
            console.error("add error", this.error);
            displayActionFailure(this.error);
        };
        //得到数据个数
        req = store.openCursor();
        req.onsuccess = function(evt) {
            var cursor = evt.target.result;
            if (cursor) {
                console.debug("cursor.value:", cursor.value);
                cursor.continue();
            } else {
                console.debug("No more entries!");
            }
        };
    };
    function displayActionFailure(msg) {
        msg = typeof msg !== 'undefined' ? "Failure: " + msg : "Failure";
        console.log(msg);
    };
    function displayActionSuccess(msg) {
        msg = typeof msg !== 'undefined' ? "Success: " + msg : "Success";
        console.log(msg);
    };
})(window.dairo = window.dairo || {});