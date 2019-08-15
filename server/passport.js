const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./config');
const User = require('./models/user');

// JSON WEB TOKEN strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
   try {
    const user = await User.findOne({where: {email: payload.sub}});
    if (!user) {
        return done(null, false);
    }

    done(null, user);
   } catch (error){
    done(error, false);
   }
}));

// LOCAL STRATEGY 
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne({where: {email: email}});

    if (!user) {
        return done(null, false);
    }

}));

// GOOGLE OAUTH STRATEGY
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: '78149834239-motebnftgu8aasdffela0polsvok2mbm.apps.googleusercontent.com',
    clientSecret: '4ZYAufUhqtc_vMcx0EpWSli0'
}, async (accessToken, refreshToken, profile, done) => {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
}));