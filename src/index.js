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

server.express.use(function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
});

const options = {
    endpoint: '/graphql',
    playground: '/',
    uploads : { maxFileSize : 1024*1024*4 },
    formatResponse: (res, query) => {
      console.log(query.context.request.body)
      return res;
    },
    //port: 8080
}

server.start(options, ({ port }) =>
  console.log(
    `GraphQL Server is running!! (port : ${port})`,
  ),
)