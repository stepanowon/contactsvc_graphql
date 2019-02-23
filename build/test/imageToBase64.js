'use strict';

var _base64Img = require('base64-img');

var _base64Img2 = _interopRequireDefault(_base64Img);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = _base64Img2.default.base64Sync('./test/1.jpg');
console.log(data);
//# sourceMappingURL=imageToBase64.js.map