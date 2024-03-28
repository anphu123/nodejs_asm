const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/b')
.catch((err)=>{
    console.log("loi ket noi csdl");
    console.log(err);
})

module.exports = {mongoose}