const debug = require('debug')('app:bookController');
const { MongoClient, ObjectID } = require('mongodb');

function bookController(nav, bookService) {
    function getIndex(req, res) {
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Conectamos ao servidor mongo');

                const db = client.db(dbName);
                debug('mandou o dbname');

                const col = await db.collection('books');
                const books2 = await col.find().toArray();

                res.render(
                    'bookListView',
                    {
                        nav,
                        title: 'Library',
                        books: books2
                    }
                );
            } catch (err) {
                debug(err.stack);
            }

            client.close();
        }());
    }
    function getById(req, res) {
        const { id } = req.params;

        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Conectamos ao servidor mongo');

                const db = client.db(dbName);
                debug('mandou o dbname');

                const col = await db.collection('books');
                const book = await col.findOne({ _id: new ObjectID(id) });

                book.details = await bookService.getBookById(book.bookId);

                res.render('bookView',
                    {
                        nav,
                        title: 'Library',
                        book
                    });
            } catch (err) {
                debug(err.stack);
            }

            client.close();
        }());
    }
    function middleware(req, res, next) {
        // if (req.user) {
        next();
        // } else {
        //  res.redirect('/');
        // }
    }

    return {
        getIndex,
        getById,
        middleware
    };
}

module.exports = bookController;
