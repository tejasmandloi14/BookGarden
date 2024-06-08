var config = require('./config');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var Users = require('./models/users');

passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

exports.getToken = (user)=>{
    return jwt.sign(user,config.secret,{expiresIn:3600})
};

var opts ={};

opts.secretOrKey = config.secret;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

exports.jwtStrategy = passport.use(new JwtStrategy(opts,
    (payload,done)=>{
        Users.findOne({_id:payload._id},(err,user)=>{
            if(err){
                return done(err,false);
            }
            else if(user){
                return done(null,user);
            }
            else{
                return done(null,false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt',{session:false});

exports.verifyAdmin = ((req,res,next)=>{
    if(req.user.admin){
        next();
    }
    else{
        var err =  new Error("You are not Authorized !");
        err.status=403;
        next(err);
    }
})
