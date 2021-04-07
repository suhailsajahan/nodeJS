const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');       //makes various checks
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    assert.equal(err,null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);        //connect to the DB

    dboper.insertDocument(db, {name:"Vadonut", description:'Test'}, (result) => {
        
        console.log('Insert Document:\n', result.ops);

        dboper.findDocuments(db, 'dishes', (docs) => {
            console.log('Found Document:\n', docs);

            dboper.updateDocument(db, {name:'Vadonut'}, {description:'Updated Test'}, 'dishes', (result) =>{
                console.log('Updated Document:\n',result.result);

                dboper.findDocuments(db, 'dishes', (docs) => {
                    console.log('Found Document:\n', docs);

                    db.dropCollection('dishes', (result) => {
                        console.log('Dropped Collection: ', result);

                        client.close();
                    });
                });

            });
        });

    });

});
