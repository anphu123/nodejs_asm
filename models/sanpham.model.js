var db = require("./db");

const spSchema = new db.mongoose.Schema(
  {
    id_theloai:{type: db.mongoose.Schema.Types.ObjectId, ref:'theloaiModel'},
    ma: { type: String, required: true },
    name: { type: String, required: true },
    soluong: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String }

  },
  {
    collection: "san_pham",
  }
);
//tạo model
let spModel = db.mongoose.model("spModel", spSchema);

let theloaiSchema = new db.mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    collection: "the_loai",
  }
);

let theloaiModel = db.mongoose.model("theloaiModel",theloaiSchema);

module.exports = { spModel,theloaiModel}
