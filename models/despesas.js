const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const despesas = new Schema({
    tipo:{
        type: String,
        required: true
    },
    descricao: {
        type:String,
        required:true
    },
    data:{
        type: String,
        required:true
    },
    image: {
        type:String,
        required:true
    },
    status: {
        type: String,
        required: true
    }

});

const Despesas = mongoose.model("despesas", despesas)
module.exports = Despesas