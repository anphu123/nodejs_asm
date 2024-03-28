var myMD = require("../models/sanpham.model");
var userMD = require("../models/user.model");
const path = require('path');

exports.listsp = async (req, res, next) => {
  let listsp = await myMD.spModel.find().populate("id_theloai");
  console.log(listsp);
  res.render("list/listsp", { listsp: listsp });
};

exports.listuser = async (req, res, next) => {
  let listuser = await userMD.userModel.find();
  res.render("list/listuser", { listuser: listuser });
};

exports.listtl = async (req, res, next) => {
  let listtl = await myMD.theloaiModel.find();
  console.log(listtl);
  res.render("list/listtl", { listtl: listtl });
};

exports.addtl = async (req, res, next) => {
  let msg = "";

  if (req.method == "POST") {
    //viết kiểm tra hợp lệ dữ liệu

    //tạo đối tượng model để gắn dữ liệU
    let objTL = new myMD.theloaiModel();
    objTL.name = req.body.name;

    //thực hiện ghi vào cơ sở dữ liệu
    try {
      let new_tl = await objTL.save();
      console.log(new_tl);
      msg = "đã thêm thành công";
    } catch (error) {
      msg = "lỗi ghi csdl " + error.message;
      console.log(error);
    }
  }

  res.render("list/addtl", { msg: msg });
};

exports.addsp = async (req, res, next) => {
  let msg = "";

  let listtl = await myMD.theloaiModel.find();

  if (req.method == "POST") {
    // Kiểm tra hợp lệ dữ liệu và xử lý tải lên hình ảnh
    let image = req.files ? req.files.image : null;
    let imagePath = image ? `/uploads/${image.name}` : null;

    // Tạo đối tượng model để gắn dữ liệu
    let objSP = new myMD.spModel();
    objSP.ma = req.body.ma;
    objSP.name = req.body.name;
    objSP.soluong = req.body.soluong;
    objSP.price = req.body.price;
    objSP.id_theloai = req.body.theloai;
    objSP.image = imagePath;

    // Thực hiện ghi vào cơ sở dữ liệu
    try {
      if (image) {
        // Di chuyển hình ảnh vào thư mục uploads (cần cài đặt middleware express-fileupload)
        await image.mv(path.join(__dirname, '../public/uploads', image.name));
      }
      let new_sp = await objSP.save();
      console.log(new_sp);
      msg = "Đã thêm thành công";
    } catch (error) {
      msg = "Lỗi ghi csdl " + error.message;
      console.log(error);
    }
  }

  res.render("list/addsp", { msg: msg, listtl: listtl });
};

exports.editsp = async (req, res, next) => {
  let msg = "";
  let idsp = req.params.idsp;
  let objSP = await myMD.spModel.findById(idsp);

  console.log(objSP);
  let listtl = await myMD.theloaiModel.find();

  if (req.method == "POST") {
    let objSP = new myMD.spModel();
    objSP.ma = req.body.ma;
    objSP.name = req.body.name;
    objSP.soluong = req.body.soluong;
    objSP.price = req.body.price;
    objSP.id_theloai = req.body.theloai;

    objSP._id = idsp;

    try {
      await myMD.spModel.findByIdAndUpdate(idsp, objSP);
      msg = "đã cập nhật thành công";
    } catch (error) {
      msg = "lỗi ghi csdl " + error.message;
      console.log(error);
    }
  }

  res.render("list/editsp", { msg: msg, objSP: objSP, listtl: listtl });
};

exports.edittl = async (req, res, next) => {
  let msg = "";
  let idtl = req.params.idtl;
  let objTL = await myMD.theloaiModel.findById(idtl);

  console.log(objTL);

  if (req.method == "POST") {
    let objTL = new myMD.theloaiModel();

    objTL.name = req.body.name;

    objTL._id = idtl;

    try {
      await myMD.theloaiModel.findByIdAndUpdate(idtl, objTL);
      msg = "đã cập nhật thành công";
    } catch (error) {
      msg = "lỗi ghi csdl " + error.message;
      console.log(error);
    }
  }
  res.render("list/edittl", { msg: msg, objTL: objTL });
};

exports.edituser = async (req, res, next) => {
  let msg = "";
  let iduser = req.params.iduser;
  let objU = await userMD.userModel.findById(iduser);

  console.log(objU);

  if (req.method == "POST") {
    let objnew = new userMD.userModel();

    objnew.name = req.body.name;
    objnew.username = req.body.username;
    objnew.passwd = req.body.passwd;
    objnew.email = req.body.email;
    objnew.status = req.body.status;

    objnew._id = iduser;

    try {
      await userMD.userModel.findByIdAndUpdate(iduser, objnew);
      msg = "đã cập nhật thành công";
    } catch (error) {
      msg = "lỗi ghi csdl " + error.message;
      console.log(error);
    }
  }
  res.render("list/edituser", { msg: msg, objU: objU });
};

exports.deletesp = async (req, res, next) => {
  let idsp = req.params.idsp;
  let sp = await myMD.spModel.findById(idsp);

  try {
    await myMD.spModel.findByIdAndDelete(idsp, sp);
  } catch (error) {}

  res.redirect("/list/listsp");

  // res.render("list/deletesp", { sp: sp });
};

exports.deleteuser = async (req, res, next) => {
  let iduser = req.params.iduser;
  let user = await userMD.userModel.findById(iduser);

  try {
    await userMD.userModel.findByIdAndDelete(iduser, user);
  } catch (error) {}

  res.redirect("/list/listuser");

  // res.render("list/deletesp", { sp: sp });
};

exports.deletetl = async (req, res, next) => {
  let idtl = req.params.idtl;
  let tl = await myMD.theloaiModel.findById(idtl);

  try {
    await myMD.theloaiModel.findByIdAndDelete(idtl, tl);
  } catch (error) {}

  res.redirect("/list/listtl");

  // res.render("list/deletesp", { sp: sp });
};

exports.detailsp = async (req,res,next) =>{
  let idsp = req.params.idsp;
  let objsp = await myMD.spModel.findById(idsp);
  let listtl = await myMD.theloaiModel.findById(objsp.id_theloai);


  res.render('list/detailsp',{objsp:objsp,listtl:listtl});
}