"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const schema = `
scalar Upload

type Contact {
    _id : String!
    name : String!
    tel : String!
    address: String
    photo: String
}

type ContactList {
    pageno: Int!
    pagesize: Int!
    totalcount: Int!
    contacts : [Contact]!
}

type Result {
    status: String!
    message: String!
    _id: String
}

type Query {
    contactsAll(pageno:Int, pagesize:Int) : ContactList!
    contactOne(_id:String!) : Contact!
    searchContact(name:String!) : [Contact]!
}

type Mutation {
    insertContact(name:String!, tel:String!, address:String) : Result!
    insertContactAndQuery(name:String!, tel:String!, address:String) : Query!

    updateContact(_id:String!, name:String!, tel:String!, address:String) : Result!
    updateContactAndQuery(_id:String!, name:String!, tel:String!, address:String) : Query!

    deleteContact(_id:String!) : Result!
    deleteContactAndQuery(_id:String!) : Query!

    changePhoto(_id:String!, file:Upload!) : Result!
    changePhotoAndQuery(_id:String!, file:Upload!) : Result!
}
`;
var _default = exports.default = schema;
//# sourceMappingURL=schema.js.map