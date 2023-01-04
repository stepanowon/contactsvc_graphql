'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../db');

var _graphqlLog = require('graphql-log');

var _graphqlLog2 = _interopRequireDefault(_graphqlLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getBaseUrl = req => req.protocol + '://' + req.get('host');

const resolvers = {
    Query: {
        contactsAll: (_, { pageno, pagesize }, context) => (0, _db.contactsAll)({ pageno, pagesize, baseUrl: getBaseUrl(context.request) }),
        contactOne: (_, { _id }, context) => (0, _db.contactOne)({ _id, baseUrl: getBaseUrl(context.request) }),
        searchContact: (_, { name }, context) => (0, _db.searchContact)({ name, baseUrl: getBaseUrl(context.request) })
    },
    Mutation: {
        insertContact: (_, { name, tel, address }, context) => (0, _db.insertContact)({ name, tel, address }),
        insertContactAndQuery: (_, { name, tel, address }, context) => (0, _db.insertContact)({ name, tel, address }),
        updateContact: (_, { _id, name, tel, address }, context) => (0, _db.updateContact)({ _id, name, tel, address }),
        updateContactAndQuery: (_, { _id, name, tel, address }, context) => (0, _db.updateContact)({ _id, name, tel, address }),
        deleteContact: (_, { _id }) => (0, _db.deleteContact)({ _id }),
        deleteContactAndQuery: (_, { _id }) => (0, _db.deleteContact)({ _id }),
        changePhoto: (_, { _id, file }) => (0, _db.changePhoto)(_id, file),
        changePhotoAndQuery: (_, { _id, file }) => (0, _db.changePhoto)(_id, file)
    }
};

const logExecutions = (0, _graphqlLog2.default)({
    prefix: 'resolvers.'
});
logExecutions(resolvers);

exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map