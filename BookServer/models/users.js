const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plug = require('passport-local-mongoose');

var userSchema = new Schema({
    admin:{
        type:Boolean,
        default:false
    },
    firstname:{
        type:String,
        default:""
    },
    lastname:{
        type:String,
        default:""
    }
});

userSchema.plugin(plug);

module.exports = mongoose.model('user',userSchema);