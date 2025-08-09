import { changePhoto, contactsAll, contactOne, searchContact, insertContact, updateContact, deleteContact } from '../db';
import createGraphQLLogger from 'graphql-log';

const getBaseUrl = (req) => {
  if (!req || !req.url) return 'http://localhost:4000';
  try {
    const url = new URL(req.url);
    return url.origin;
  } catch {
    return 'http://localhost:4000';
  }
}

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

const logExecutions = createGraphQLLogger({
    prefix: 'resolvers.',
});
logExecutions(resolvers);


export default resolvers;