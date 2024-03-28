var express = require("express");
var router = express.Router();
var listCtrl = require("../controllers/list.controller");

var check_login = require("../middlewares/check_login");

router.use((req, res, next) => {
  console.log("dong nay la middleware");
  next();
});

/* GET users listing. */
router.get("/list/", check_login.yeu_cau_dang_nhap, function (req, res, next) {
  let u = req.session.userLogin;
  res.send(u);
});

router.get("/listsp",check_login.yeu_cau_dang_nhap, listCtrl.listsp);

router.get("/listuser",check_login.yeu_cau_dang_nhap, listCtrl.listuser);

router.get("/listtl",check_login.yeu_cau_dang_nhap, listCtrl.listtl);

router.get("/addtl",check_login.yeu_cau_dang_nhap, listCtrl.addtl);
router.post("/addtl",check_login.yeu_cau_dang_nhap, listCtrl.addtl);

router.get("/addsp",check_login.yeu_cau_dang_nhap, listCtrl.addsp);
router.post("/addsp",check_login.yeu_cau_dang_nhap, listCtrl.addsp);

router.get("/editsp/:idsp",check_login.yeu_cau_dang_nhap, listCtrl.editsp);
router.post("/editsp/:idsp",check_login.yeu_cau_dang_nhap, listCtrl.editsp);

router.get("/edittl/:idtl",check_login.yeu_cau_dang_nhap, listCtrl.edittl);
router.post("/edittl/:idtl",check_login.yeu_cau_dang_nhap, listCtrl.edittl);

router.get("/edituser/:iduser",check_login.yeu_cau_dang_nhap, listCtrl.edituser);
router.post("/edituser/:iduser",check_login.yeu_cau_dang_nhap, listCtrl.edituser);

// router.get("/deletesp/:idsp",check_login.yeu_cau_dang_nhap,listCtrl.deletesp);
router.get("/deletesp/:idsp",check_login.yeu_cau_dang_nhap,listCtrl.deletesp);

router.get("/deleteuser/:iduser",check_login.yeu_cau_dang_nhap,listCtrl.deleteuser);

router.get("/deletetl/:idtl",check_login.yeu_cau_dang_nhap,listCtrl.deletetl);

router.get("/detailsp/:idsp",check_login.yeu_cau_dang_nhap, listCtrl.detailsp);

module.exports = router;
