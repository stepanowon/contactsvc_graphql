"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _db = require("../db");
var _graphqlLog = _interopRequireDefault(require("graphql-log"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getBaseUrl = req => {
  if (!req || !req.url) return 'http://localhost:4000';
  try {
    const url = new URL(req.url);
    return url.origin;
  } catch {
    return 'http://localhost:4000';
  }
};
const resolvers = {
  Query: {
    contactsAll: (_, {
      pageno,
      pagesize
    }, context) => (0, _db.contactsAll)({
      pageno,
      pagesize,
      baseUrl: getBaseUrl(context.request)
    }),
    contactOne: (_, {
      _id
    }, context) => (0, _db.contactOne)({
      _id,
      baseUrl: getBaseUrl(context.request)
    }),
    searchContact: (_, {
      name
    }, context) => (0, _db.searchContact)({
      name,
      baseUrl: getBaseUrl(context.request)
    })
  },
  Mutation: {
    insertContact: (_, {
      name,
      tel,
      address
    }, context) => (0, _db.insertContact)({
      name,
      tel,
      address
    }),
    insertContactAndQuery: (_, {
      name,
      tel,
      address
    }, context) => (0, _db.insertContact)({
      name,
      tel,
      address
    }),
    updateContact: (_, {
      _id,
      name,
      tel,
      address
    }, context) => (0, _db.updateContact)({
      _id,
      name,
      tel,
      address
    }),
    updateContactAndQuery: (_, {
      _id,
      name,
      tel,
      address
    }, context) => (0, _db.updateContact)({
      _id,
      name,
      tel,
      address
    }),
    deleteContact: (_, {
      _id
    }) => (0, _db.deleteContact)({
      _id
    }),
    deleteContactAndQuery: (_, {
      _id
    }) => (0, _db.deleteContact)({
      _id
    }),
    changePhoto: (_, {
      _id,
      file
    }) => (0, _db.changePhoto)(_id, file),
    changePhotoAndQuery: (_, {
      _id,
      file
    }) => (0, _db.changePhoto)(_id, file)
  }
};
const logExecutions = (0, _graphqlLog.default)({
  prefix: 'resolvers.'
});
logExecutions(resolvers);
var _default = exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map