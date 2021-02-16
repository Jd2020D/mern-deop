const mongoose = require('mongoose');

const Status ={
    PLAYING:"Playing",
    NOT_PLAYING:"Not Playing",
    UNDECIDED:"Undecided"
}

const PlayerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Player must have a name!"],
        minlength: [2, "Name must be at least 2  characters!"],
    },
    prefPosition:{
        type:String,
        default:""
    },  
    game1:{
        type:String,
        default:Status.UNDECIDED,
        enum:Status,

    },
    game2:{
        type:String,
        default:Status.UNDECIDED,
        enum:Status,

    },
    game3:{
        type:String,
        default:Status.UNDECIDED,
        enum:Status,

    }
        

}, {timestamps: true})

module.exports.Player = mongoose.model("Player", PlayerSchema);

module.exports.Status=Status;