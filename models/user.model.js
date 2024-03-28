const db = require("./db");
const userSchema = new db.mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    passwd: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, required: true },
  },
  { collection: "tb_user" }
);
let userModel = db.mongoose.model("userModel",userSchema);
module.exports = { userModel };
