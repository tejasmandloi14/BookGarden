var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    Comment : {
        type:String,
        required:true
    },

    Author : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{
    timestamps:true
});

var bookSchema = new Schema({
    Name : {
        type:String,
        required:true,
        unique:true
    },

    Rating : {
        type:Number,
        required:true,
        min:1,
        max :5
    },

    Plot : {
        type:String,
        required:true
    },

    Publisher : {
        type : String,
        required:true
    },

    Comments : [commentSchema]
},{
    timestamps:true
});



module.exports = mongoose.model('book',bookSchema);