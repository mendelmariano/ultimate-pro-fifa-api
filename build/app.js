"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// eslint-disable-next-line import/no-extraneous-dependencies
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
// Importando nossa database
require("./database");
var App = /** @class */ (function () {
    function App() {
        this.server = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    App.prototype.middlewares = function () {
        this.server.use((0, cors_1.default)());
        this.server.use(express_1.default.json());
    };
    App.prototype.routes = function () {
        this.server.use(routes_1.default);
    };
    return App;
}());
exports.default = new App().server;
