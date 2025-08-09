import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';
import { Photo } from './db/testdb';

// Create executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Create Yoga instance
const yoga = createYoga({
  schema,
  context: ({ request }) => {
    return { request };
  },
  graphqlEndpoint: '/graphql',
  graphiql: {
    title: 'Contact Service GraphQL API',
    defaultQuery: `query {
  contactsAll(pageno: 1, pagesize: 10) {
    pageno
    pagesize
    totalcount
    contacts {
      _id
      name
      tel
      address
      photo
    }
  }
}`
  },
  introspection: true,
  multipart: {
    maxFileSize: 1024 * 1024 * 4 // 4MB
  },
  formatError: (error) => {
    console.log(error);
    return error;
  },
  cors: true
});

// Create HTTP server
const server = createServer(async (req, res) => {
  // Handle root path redirect to GraphQL playground
  if (req.url === '/') {
    res.statusCode = 302;
    res.setHeader('Location', '/graphql');
    res.end();
    return;
  }

  // Handle photo requests
  if (req.url?.startsWith('/photos/')) {
    const id = req.url.split('/photos/')[1];
    try {
      const doc = await Photo.findOne({ _id: id });
      if (doc) {
        res.setHeader('Content-Type', doc.mimetype);
        res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.setHeader('Expires', '-1');
        res.setHeader('Pragma', 'no-cache');
        res.end(doc.image);
        return;
      }
    } catch (error) {
      console.error('Photo fetch error:', error);
    }
    res.statusCode = 404;
    res.end();
    return;
  }

  // Pass all other requests to GraphQL Yoga
  return yoga(req, res);
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`GraphQL Server is running!! (port : ${port})`);
  console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
  console.log(`GraphiQL playground: http://localhost:${port}/graphql`);
  console.log(`Root URL (redirects to /graphql): http://localhost:${port}/`);
});