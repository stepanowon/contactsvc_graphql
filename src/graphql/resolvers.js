import { changePhoto, contactsAll, contactOne, searchContact, insertContact, updateContact, deleteContact } from '../db';

const getBaseUrl = (req) => req.protocol + '://' + req.get('host')

const resolvers = {
    Query : {
        contactsAll : (_, { pageno, pagesize }, context) => contactsAll({ pageno, pagesize, baseUrl:getBaseUrl(context.request) }),
        contactOne : (_, { _id }, context) => contactOne({ _id, baseUrl:getBaseUrl(context.request)  }),
        searchContact : (_, { name }, context) => searchContact({ name, baseUrl:getBaseUrl(context.request) })
    },
    Mutation : {
        insertContact : (_, {name, tel, address }, context) => insertContact({ name,tel, address }),
        insertContactAndQuery : (_, {name, tel, address }, context) => insertContact({ name,tel, address }),
        updateContact : (_, {_id, name, tel, address}, context) => updateContact({ _id, name, tel, address }),
        updateContactAndQuery : (_, {_id, name, tel, address}, context) => updateContact({ _id, name, tel, address }),
        deleteContact : (_, { _id }) => deleteContact({ _id }),
        deleteContactAndQuery : (_, { _id }) => deleteContact({ _id }),
        changePhoto : (_, { _id, file }) => changePhoto(_id, file),
        changePhotoAndQuery : (_, { _id, file }) => changePhoto(_id, file),
    }
}

export default resolvers;