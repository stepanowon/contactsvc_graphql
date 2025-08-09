"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateContact = exports.searchContact = exports.insertContact = exports.deleteContact = exports.contactsAll = exports.contactOne = exports.changePhoto = void 0;
var _mongodb = require("mongodb");
var _testdb = require("./testdb");
var _constant = _interopRequireDefault(require("../constant"));
var _shortid = _interopRequireDefault(require("shortid"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const contactOne = async ({
  _id,
  baseUrl
}) => {
  if (typeof _id !== "string" && _id == "") _id = "not passed";
  let doc = await _testdb.Contact.findById(_id);
  if (doc) {
    doc.photo = baseUrl + _constant.default.PHOTO_URL + doc.photo;
    return doc;
  }
  return {
    _id
  };
};
exports.contactOne = contactOne;
const contactsAll = async ({
  pageno,
  pagesize,
  baseUrl
}) => {
  if (typeof pageno !== "number" || pageno < 0) pageno = 0;
  if (typeof pagesize !== "number") pagesize = 5;
  let contacts;
  if (pageno === 0) {
    pagesize = 0;
    contacts = await _testdb.Contact.find().sort({
      _id: -1
    });
  } else {
    contacts = await _testdb.Contact.find().sort({
      _id: -1
    }).skip((pageno - 1) * pagesize).limit(pagesize);
  }
  contacts = contacts.map(c => {
    let {
      _id,
      name,
      tel,
      address,
      photo
    } = c;
    return {
      _id,
      name,
      tel,
      address,
      photo: baseUrl + _constant.default.PHOTO_URL + photo
    };
  });
  let count = await _testdb.Contact.countDocuments();
  return {
    pageno,
    pagesize,
    totalcount: count,
    contacts
  };
};
exports.contactsAll = contactsAll;
const searchContact = async ({
  name,
  baseUrl
}) => {
  if (typeof name !== "string" || name.length < 2) {
    throw new Error("두글자 이상의 이름을 입력하세요");
  }
  let contacts = await _testdb.Contact.find({
    name: new RegExp(name, "i")
  }).sort({
    name: 1
  });
  contacts = contacts.map((c, index) => {
    let {
      _id,
      name,
      tel,
      address,
      photo
    } = c;
    return {
      _id,
      name,
      tel,
      address,
      photo: baseUrl + _constant.default.PHOTO_URL + photo
    };
  });
  return contacts;
};
exports.searchContact = searchContact;
const insertContact = async ({
  name,
  tel,
  address,
  photo
}) => {
  if (typeof photo === "undefined" || photo == null) {
    photo = 'noimage';
  }
  let _id = new _mongodb.ObjectId().toHexString();
  let c1 = new _testdb.Contact({
    _id,
    name,
    tel,
    address,
    photo
  });
  let doc = await c1.save();
  return {
    status: "ok",
    message: "연락처 추가 성공",
    _id: doc._id
  };
};
exports.insertContact = insertContact;
const updateContact = async ({
  _id,
  name,
  tel,
  address
}) => {
  if (typeof _id === "undefined") {
    return {
      status: "fail",
      message: "_id 필드는 반드시 전달해야 합니다."
    };
  }
  let doc = await _testdb.Contact.updateOne({
    _id: _id
  }, {
    name,
    tel,
    address
  });
  if (doc.ok === 1 && doc.n === 1) {
    return {
      status: "ok",
      message: "업데이트 성공",
      _id: _id
    };
  } else {
    return {
      status: "fail",
      message: "업데이트 실패"
    };
  }
};
exports.updateContact = updateContact;
const deleteContact = async ({
  _id
}) => {
  if (typeof _id === "undefined") {
    return {
      status: "fail",
      message: "_id 필드는 반드시 전달해야 합니다."
    };
  }
  let delDoc = await contactOne({
    _id,
    baseUrl: ""
  });
  if (delDoc.photo !== _constant.default.PHOTO_URL + "noimage") {
    let photo_id = delDoc.photo.substr(_constant.default.PHOTO_URL.length);
    await _testdb.Photo.deleteOne({
      _id: photo_id
    });
  }
  let doc = await _testdb.Contact.deleteOne({
    _id: _id
  });
  if (doc.ok === 1 && doc.n === 1) {
    return {
      status: "ok",
      message: "삭제 성공",
      _id: _id
    };
  } else {
    return {
      status: "fail",
      message: "삭제 실패"
    };
  }
};
exports.deleteContact = deleteContact;
const streamToBuffer = async stream => {
  return new Promise((resolve, reject) => {
    let buffers = [];
    stream.on('error', reject);
    stream.on('data', data => buffers.push(data));
    stream.on('end', () => resolve(Buffer.concat(buffers)));
  });
};
const storeImageToDB = async ({
  stream,
  mimetype
}) => {
  let photo = new _testdb.Photo();
  photo._id = _shortid.default.generate();
  photo.image = await streamToBuffer(stream);
  photo.mimetype = mimetype;
  await photo.save();
  return photo._id;
};
const changePhoto = async (_id, upload) => {
  const {
    stream,
    mimetype
  } = await upload;
  if (!mimetype.startsWith("image/")) {
    return {
      status: "fail",
      message: "이미지만 업로드 가능합니다."
    };
  }
  //기존 이미지 삭제(noimage가 아닐 경우만)
  let doc = await contactOne({
    _id,
    baseUrl: ""
  });
  if (doc.photo !== _constant.default.PHOTO_URL + "noimage") {
    let photo_id = doc.photo.substr(_constant.default.PHOTO_URL.length);
    await _testdb.Photo.deleteOne({
      _id: photo_id
    });
  }
  const photo_id = await storeImageToDB({
    stream,
    mimetype
  });
  let updatedDoc = await _testdb.Contact.updateOne({
    _id: _id
  }, {
    photo: photo_id
  });
  if (updatedDoc.ok === 1 && updatedDoc.n === 1) {
    return {
      status: "ok",
      message: `사진 변경 성공 => photo_id : ${photo_id})`,
      _id: _id
    };
  } else {
    return {
      status: "fail",
      message: "사진 변경 실패"
    };
  }
};
exports.changePhoto = changePhoto;
//# sourceMappingURL=index.js.map