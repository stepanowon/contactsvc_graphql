"use strict";

var _graphqlYoga = require("graphql-yoga");
var _nodeHttp = require("node:http");
var _schema = require("@graphql-tools/schema");
var _resolvers = _interopRequireDefault(require("./graphql/resolvers"));
var _schema2 = _interopRequireDefault(require("./graphql/schema"));
var _testdb = require("./db/testdb");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Create executable schema
const schema = (0, _schema.makeExecutableSchema)({
  typeDefs: _schema2.default,
  resolvers: _resolvers.default
});

// Create Yoga instance
const yoga = (0, _graphqlYoga.createYoga)({
  schema,
  context: ({
    request
  }) => {
    return {
      request
    };
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
  formatError: error => {
    console.log(error);
    return error;
  },
  cors: true
});

// Create HTTP server
const server = (0, _nodeHttp.createServer)(async (req, res) => {
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
      const doc = await _testdb.Photo.findOne({
        _id: id
      });
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
//# sourceMappingURL=index.js.map