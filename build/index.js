'use strict';

var _graphqlYoga = require('graphql-yoga');

var _resolvers = require('./graphql/resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

var _schema = require('./graphql/schema');

var _schema2 = _interopRequireDefault(_schema);

var _testdb = require('./db/testdb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const server = new _graphqlYoga.GraphQLServer({
  typeDefs: _schema2.default,
  resolvers: _resolvers2.default,
  context: ({ request, response }) => {
    return { request, response };
  }
});

server.express.use("/photos/:id", (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    console.log(req.params.id);
    let doc = yield _testdb.Photo.findOne({ _id: req.params.id });
    if (doc) {
      res.setHeader('Content-Type', doc.mimetype);
      res.end(doc.image);
    } else {
      res.status(404);
      res.end();
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

const options = {
  endpoint: '/graphql',
  playground: '/'
  //port: 8080
};

server.start(options, ({ port }) => console.log(`GraphQL Server is running!! (port : ${port})`));
//# sourceMappingURL=index.js.map