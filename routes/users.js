var express = require('express');
var router = express.Router();

var check_login = require("../middlewares/check_login");

var userCtrl = require("../controllers/user.controller");

router.use((req,res,next)=>{
  console.log('dong nay la middleware');
  next();
});

/* GET users listing. */
router.get('/', check_login.yeu_cau_dang_nhap , function(req, res, next) {
  let u = req.session.userLogin;
  res.send(u);
});

router.get("/login", userCtrl.Login);
router.post("/login", userCtrl.Login);

router.get("/reg",userCtrl.Reg);
router.post("/reg",userCtrl.Reg);

module.exports = router;
