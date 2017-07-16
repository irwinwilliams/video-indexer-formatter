define('app',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var App = exports.App = function () {
        function App() {
            _classCallCheck(this, App);

            this.message = "Hello, let's read some videoindexer output!";
            this.vi_output_files = {};
            this.vi_output = [];
        }

        App.prototype.parseFiles = function parseFiles() {
            console.log("INFO: parsing " + this.vi_output_files.length + " files");
            for (var _iterator = this.vi_output_files, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var file = _ref;

                var reader = new FileReader();
                reader.App = this;
                reader.onload = this.outputVIContent;
                reader.readAsText(file);
            }
        };

        App.prototype.replaceAll = function replaceAll(str, find, replace) {
            return str.replace(new RegExp(find, 'g'), replace);
        };

        App.prototype.cleanTimeStamp = function cleanTimeStamp(str) {
            var point = str.indexOf(".");
            var before = str.substring(0, point);
            var after = str.substring(point);
            after = this.replaceAll(after, '0', '');
            var cleaned = before + after;
            var hms = cleaned;
            var a = hms.split(':');
            var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
            var jublerFormat = seconds * 10;
            return jublerFormat;
        };

        App.prototype.outputVIContent = function outputVIContent(event) {
            var reader = event.currentTarget;
            var transcriptBlocks = JSON.parse(reader.result).breakdowns[0].insights.transcriptBlocks;
            console.log(transcriptBlocks);
            var result = '';
            for (var _iterator2 = transcriptBlocks, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                var block = _ref2;

                var blockResult = '';
                for (var _iterator3 = block.lines, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                    var _ref3;

                    if (_isArray3) {
                        if (_i3 >= _iterator3.length) break;
                        _ref3 = _iterator3[_i3++];
                    } else {
                        _i3 = _iterator3.next();
                        if (_i3.done) break;
                        _ref3 = _i3.value;
                    }

                    var line = _ref3;

                    blockResult += line.text + ' ';
                    result += line.text + ' ';
                    var end = line.adjustedTimeRange.end;
                    var start = line.adjustedTimeRange.start;
                    end = reader.App.cleanTimeStamp(end);
                    start = reader.App.cleanTimeStamp(start);
                    this.App.vi_output.push({
                        "start": start,
                        "end": end,
                        "line": line.text
                    });
                }
            }
        };

        return App;
    }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><h1>${message}</h1><h2>Upload a file and have it processed and the lines returned.</h2><p><input type=\"file\" files.bind=\"vi_output_files\"> <button type=\"button\" click.trigger=\"parseFiles()\">Parse</button></p><span>${vi_output.length} blocks parsed</span><div><ul style=\"list-style-type:none\"><li repeat.for=\"prop of vi_output\"><span style=\"display:inline-block;width:100px\">[${prop.start}]</span> <span style=\"display:inline-block;width:100px\">[${prop.end}]</span> <span style=\"display:inline\">${prop.line}</span></li></ul></div></template>"; });
//# sourceMappingURL=app-bundle.js.map