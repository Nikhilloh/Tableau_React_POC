'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _es6Promise = require('es6-promise');

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _tokenizeUrl = require('./tokenizeUrl');

var _tokenizeUrl2 = _interopRequireDefault(_tokenizeUrl);

var _tableauApi = require('tableau-api');

var _tableauApi2 = _interopRequireDefault(_tableauApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  filters: _propTypes2.default.object,
  url: _propTypes2.default.string.isRequired,
  parameters: _propTypes2.default.object,
  options: _propTypes2.default.object,
  token: _propTypes2.default.string,
  onLoad: _propTypes2.default.func,
  query: _propTypes2.default.string
};

var defaultProps = {
  loading: false,
  parameters: {},
  filters: {},
  options: {},
  query: '?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes'
};

var TableauReport = function (_React$Component) {
  (0, _inherits3.default)(TableauReport, _React$Component);

  function TableauReport(props) {
    (0, _classCallCheck3.default)(this, TableauReport);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TableauReport.__proto__ || (0, _getPrototypeOf2.default)(TableauReport)).call(this, props));

    _this.state = {
      filters: props.filters,
      parameters: props.parameters
    };
    return _this;
  }

  (0, _createClass3.default)(TableauReport, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initTableau();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var isReportChanged = nextProps.url !== this.props.url;
      var isFiltersChanged = !(0, _shallowequal2.default)(this.props.filters, nextProps.filters, this.compareArrays);
      var isParametersChanged = !(0, _shallowequal2.default)(this.props.parameters, nextProps.parameters);
      var isLoading = this.state.loading;

      // Only report is changed - re-initialize
      if (isReportChanged) {
        this.initTableau();
      }

      // Only filters are changed, apply via the API
      if (!isReportChanged && isFiltersChanged && !isLoading) {
        this.applyFilters(nextProps.filters);
      }

      // Only parameters are changed, apply via the API
      if (!isReportChanged && isParametersChanged && !isLoading) {
        this.applyParameters(nextProps.parameters);
      }

      // token change, validate it.
      if (nextProps.token !== this.props.token) {
        this.setState({ didInvalidateToken: false });
      }
    }

    /**
     * Compares the values of filters to see if they are the same.
     * @param  {Array<Number>} a
     * @param  {Array<Number>} b
     * @return {Boolean}
     */

  }, {
    key: 'compareArrays',
    value: function compareArrays(a, b) {
      if (Array.isArray(a) && Array.isArray(b)) {
        return a.sort().toString() === b.sort().toString();
      }

      return undefined;
    }

    /**
     * Execute a callback when an array of promises complete, regardless of
     * whether any throw an error.
     */

  }, {
    key: 'onComplete',
    value: function onComplete(promises, cb) {
      _es6Promise.Promise.all(promises).then(function () {
        return cb();
      }, function () {
        return cb();
      });
    }

    /**
     * Returns a vizUrl, tokenizing it if a token is passed and immediately
     * invalidating it to prevent it from being used more than once.
     */

  }, {
    key: 'getUrl',
    value: function getUrl() {
      var _props = this.props,
          token = _props.token,
          query = _props.query;

      var parsed = _url2.default.parse(this.props.url, true);

      if (!this.state.didInvalidateToken && token) {
        this.invalidateToken();
        return (0, _tokenizeUrl2.default)(this.props.url, token) + query;
      }

      return parsed.protocol + '//' + parsed.host + parsed.pathname + query;
    }
  }, {
    key: 'invalidateToken',
    value: function invalidateToken() {
      this.setState({ didInvalidateToken: true });
    }

    /**
     * Asynchronously applies filters to the worksheet, excluding those that have
     * already been applied, which is determined by checking against state.
     * @param  {Object} filters
     * @return {void}
     */

  }, {
    key: 'applyFilters',
    value: function applyFilters(filters) {
      var _this2 = this;

      var REPLACE = _tableauApi2.default.FilterUpdateType.REPLACE;
      var promises = [];

      this.setState({ loading: true });

      for (var key in filters) {
        if (!this.state.filters.hasOwnProperty(key) || !this.compareArrays(this.state.filters[key], filters[key])) {
          promises.push(this.sheet.applyFilterAsync(key, filters[key], REPLACE));
        }
      }

      this.onComplete(promises, function () {
        return _this2.setState({ loading: false, filters: filters });
      });
    }
  }, {
    key: 'applyParameters',
    value: function applyParameters(parameters) {
      var _this3 = this;

      var promises = [];

      for (var key in parameters) {
        if (!this.state.parameters.hasOwnProperty(key) || this.state.parameters[key] !== parameters[key]) {
          var val = parameters[key];
          // Ensure that parameters are applied only when we have a workbook
          if (this.workbook && this.workbook.changeParameterValueAsync) {
            promises.push(this.workbook.changeParameterValueAsync(key, val));
          }
        }
      }

      this.onComplete(promises, function () {
        return _this3.setState({ loading: false, parameters: parameters });
      });
    }

    /**
     * Initialize the viz via the Tableau JS API.
     * @return {void}
     */

  }, {
    key: 'initTableau',
    value: function initTableau() {
      var _this4 = this;

      var _props2 = this.props,
          filters = _props2.filters,
          parameters = _props2.parameters;

      var vizUrl = this.getUrl();

      var options = (0, _extends3.default)({}, filters, parameters, this.props.options, {
        onFirstInteractive: function onFirstInteractive() {
          _this4.workbook = _this4.viz.getWorkbook();
          _this4.sheets = _this4.workbook.getActiveSheet().getWorksheets();
          _this4.sheet = _this4.sheets[0];

          _this4.props.onLoad && _this4.props.onLoad(new Date());
        }
      });

      // cleanup
      if (this.viz) {
        this.viz.dispose();
        this.viz = null;
      }

      this.viz = new _tableauApi2.default.Viz(this.container, vizUrl, options);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      return _react2.default.createElement('div', { ref: function ref(c) {
          return _this5.container = c;
        } });
    }
  }]);
  return TableauReport;
}(_react2.default.Component);

TableauReport.propTypes = propTypes;
TableauReport.defaultProps = defaultProps;

exports.default = TableauReport;
module.exports = exports['default'];