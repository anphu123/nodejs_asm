const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://anphu221002:anphu123@cluster0.bjvupgu.mongodb.net/test1')
.catch((err)=>{
    console.log("loi ket noi csdl");
    console.log(err);
})

module.exports = {mongoose}