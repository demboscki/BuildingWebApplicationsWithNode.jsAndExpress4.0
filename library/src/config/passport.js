const passport = require('passport');

require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    // mantem usuario na sessão
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // obtém usuário da sessão.
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};
