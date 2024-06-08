var express = require('express');
var bodyParser = require('body-parser');
var authenticate = require('../authenticate');
var User = require('../models/users');
var passport = require('passport');
var cors = require('./cors');

var userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get( cors.cors,authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    User.find({})
        .then((users) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(users)
        },(err)=>next(err))
        .catch((err)=>next(err))
});

userRouter.route('/signup')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions,(req,res,next)=>{
    User.register(new User({username:req.body.username}),req.body.password,(err,user)=>{
        if(err){
            res.statusCode=500;
            res.setHeader('Content-Type','application/json');
            res.json({err:err});
        }
        else{
            if(req.body.firstname){
                user.firstname=req.body.firstname;
            }
            if(req.body.lastname){
                user.lastname=req.body.lastname;
            }
            user.save((err,user)=>{
                if(err){
                    res.statusCode=500;
                    res.setHeader('Content-Type','application/json');
                    res.json({err:err});
                }
                passport.authenticate('local')(req,res,()=>{
                    res.statusCode=200;
                    res.setHeader('Content-Type','application/json');
                    res.json({success:true,status:"Registration Successfull !"})
                })
            })
        }
    })
});

userRouter.route('/login')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions,passport.authenticate('local'),(req,res,next)=>{
    var token =authenticate.getToken({_id:req.user._id});
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({success:true,token:token,status:"You are successfully logged in"});
});

module.exports=userRouter;