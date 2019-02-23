import { GraphQLServer } from 'graphql-yoga';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';
import { Photo } from './db/testdb';


const server = new GraphQLServer({
    typeDefs: typeDefs,
    resolvers:resolvers,
    context: ({request, response}) => {
      return { request, response };
    }
})

server.express.use("/photos/:id", async (req,res)=> {
  console.log(req.params.id);
  let doc = await Photo.findOne({ _id: req.params.id });
  if (doc) {
    res.setHeader('Content-Type', doc.mimetype);
    res.end(doc.image);
  } else {
    res.status(404);
    res.end();
  }
})

const options = {
    endpoint: '/graphql',
    playground: '/',
    //port: 8080
}

server.start(options, ({ port }) =>
  console.log(
    `GraphQL Server is running!! (port : ${port})`,
  ),
)