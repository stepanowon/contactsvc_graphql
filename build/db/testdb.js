"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Photo = exports.Contact = void 0;
Object.defineProperty(exports, "mongoose", {
  enumerable: true,
  get: function () {
    return _mongoose.default;
  }
});
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_dotenv.default.config();
let uri = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost:27017/test";
_mongoose.default.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const contactSchema = new _mongoose.default.Schema({
  _id: String,
  name: String,
  tel: String,
  address: String,
  photo: String
});
const photoSchema = new _mongoose.default.Schema({
  _id: String,
  image: Buffer,
  mimetype: String
});
contactSchema.index({
  name: 1
});
photoSchema.index({
  contact_id: 1
});
const Contact = exports.Contact = _mongoose.default.model("contacts", contactSchema);
const Photo = exports.Photo = _mongoose.default.model("photos", photoSchema);
//# sourceMappingURL=testdb.js.map