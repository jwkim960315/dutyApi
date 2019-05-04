const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const keys = require('../config/keys');
const User = require('../db/schema/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
});

passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ passportId: profile.id }).then(existingUser => {
            if (existingUser) {
                done(null, existingUser);
            } else {
                new User({ passportId: profile.id }).save()
                    .then(user => done(null, user))
            }
        })
    }
));

passport.use(
    new KakaoStrategy({
        clientID: keys.kakaoClientID,
        clientSecret: keys.kakaoClientSecret,
        callbackURL: '/oauth',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ passportId: profile.id }).then(existingUser => {
            if (existingUser) {
                done(null, existingUser);
            } else {
                new User({ passportId: profile.id }).save()
                    .then(user => done(null, user))
            }
        })
    })
)