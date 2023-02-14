"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useApi;

var _react = require("react");

var _axios = _interopRequireDefault(require("axios"));

var _appBridgeUtils = require("@shopify/app-bridge-utils");

var _appBridgeReact = require("@shopify/app-bridge-react");

var api = _axios["default"].create();
/**
 * Creates a axios client that uses Shopify JWT Session Token authentication
 *
 * @returns axios
 */


function useApi() {
  var app = (0, _react.useContext)(_appBridgeReact.Context);
  (0, _react.useEffect)(function () {
    if (app) {
      api.interceptors.request.use(function (config) {
        return (0, _appBridgeUtils.getSessionToken)(app).then(function (token) {
          config.headers["Authorization"] = "Bearer ".concat(token);
          return config;
        })["catch"](function (err) {
          console.log(err);
        });
      });
    }
  }, [app]);
  return api;
}