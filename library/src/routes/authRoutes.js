const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {
    authRouter.route('/signUp')
        .post((req, res) => {
            const { userName, password } = req.body;
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            (async function addUser() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('conectado no servidor mongo');

                    const db = client.db(dbName);
                    const col = db.collection('users');
                    const user = { userName, password };
                    const result = await col.insertOne(user);

                    debug(result);

                    // create user
                    req.logIn(result.ops[0], () => {
                        res.redirect('/auth/profile');
                    });
                } catch (err) {
                    debug(err);
                }
            }());

            debug(req.body);
        });

    authRouter.route('/signIn')
        .get((req, res) => {
            res.render('signIn', {
                nav,
                title: 'Sign In'
            });
        })
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }));

    authRouter.route('/signOut')
        .post((req, res) => {
            req.logOut();
            res.redirect('/');
        });

    authRouter.route('/profile')
        .all((req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.redirect('/');
            }
        })
        .get((req, res) => {
            res.json(req.user);
        });

    return authRouter;
}

module.exports = router;
