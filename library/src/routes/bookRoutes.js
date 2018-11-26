const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');
const { MongoClient, ObjectID } = require('mongodb');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodReadsService');

const bookRouter = express.Router();

function router(nav) {
    const { getIndex, getById, middleware } = bookController(nav, bookService);

    // const books = [{
    //   title: 'The wind in the willows',
    //   genre: 'Fantasy',
    //   author: 'Kenneth Grahame',
    //   read: false
    // }, {
    //   title: 'Life on the mississipi',
    //   genre: 'History',
    //   author: 'Mark Twain',
    //   read: false
    // }, {
    //   title: 'Childhood',
    //   genre: 'Biography',
    //   author: 'Lev Nikolayevich Tolstoy',
    //   read: false
    // }];
    bookRouter.use(middleware);

    bookRouter.route('/')
        //             .get((req, res) => {
        //       // res.send('hello books');
        //       const request = new sql.Request();
        //       request.query('select * from books')
        //         .then((result) => {
        //           debug(result);
        //           res.render(
        //             'bookListView',
        //             {
        //               nav,
        //               title: 'Library',
        //               books: result.recordset
        //             }
        //           );
        //         });
        //     });

        // .get((req, res) => {
        //   (async function query() {
        //     const request = new sql.Request();
        //     const { recordset } = await request.query('select * from books');

        //     // debug(result);
        //     res.render(
        //       'bookListView',
        //       {
        //         nav,
        //         title: 'Library',
        //         books: recordset
        //       }
        //     );
        //   }());
        // });
        .get(getIndex);

    bookRouter.route('/:id')
        // /*sql*/
        // .all((req, res, next) => {
        //   (async function query() {
        //     const { id } = req.params;
        //     const request = new sql.Request();
        //     const { recordset } = await request.input('id', sql.Int, id)
        //       .query('select * from books where id = @id');
        //     [req.book] = recordset;
        //     next();
        //   }());
        // })
        // .get((req, res) => {
        //   res.render('bookView',
        //     {
        //       nav,
        //       title: 'Library',
        //       book: req.book
        //     });
        // });
        // /*mongo*/
        .get(getById);

    return bookRouter;
}

module.exports = router;
