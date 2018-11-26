const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'userName',
        passwordField: 'password'
    }, (userName, password, done) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('connectado no servidor');

                const db = client.db(dbName);
                const col = db.collection('users');
                console.log('userName');
                debug(userName);
                const user = await col.findOne({ userName });

                if (user.password === password) {
                    debug('senha confere!!!!!');
                    done(null, user);
                } else {
                    debug('senha nao confere!!!!!');
                    done(null, false);
                }
            } catch (error) {
                console.log(error.stack);
            }
            client.close();
        }());

        // const user = {
        //     username, password
        // };
        // done(null, user);
    }));
};
