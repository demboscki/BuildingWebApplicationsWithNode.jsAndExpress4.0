const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoute');

const adminRouter = express.Router();

const books = [{
    title: 'The wind in the willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    bookId: 5659,
    read: false
}, {
    title: 'Life on the mississipi',
    genre: 'History',
    author: 'Mark Twain',
    bookId: 99152,
    read: false
}, {
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    bookId: 414999,
    read: false
}];


function router(nav) {
    adminRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Conectamos ao servidor mongo');

                    const db = client.db(dbName);
                    debug('mandou o dbname');

                    const response = await db.collection('books').insertMany(books);
                    debug('*** inseriu');
                    debug(response);
                    res.json(response);
                } catch (err) {
                    debug(err.stack);
                }

                client.close();
            }());

            // res.send('inserting books');
        });

    return adminRouter;
}

module.exports = router;
