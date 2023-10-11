"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = __importDefault(require("sequelize"));
var database_1 = __importDefault(require("../config/database"));
var User_1 = __importDefault(require("../app/models/User"));
var Team_1 = __importDefault(require("../app/models/Team"));
var Profile_1 = __importDefault(require("../app/models/Profile"));
var Championship_1 = __importDefault(require("../app/models/Championship"));
var Classification_1 = __importDefault(require("../app/models/Classification"));
var Result_1 = __importDefault(require("../app/models/Result"));
var Mode_1 = __importDefault(require("../app/models/Mode"));
var models = [
    Profile_1.default,
    User_1.default,
    Team_1.default,
    Championship_1.default,
    Classification_1.default,
    Result_1.default,
    Mode_1.default,
];
var Database = /** @class */ (function () {
    function Database() {
        this.init();
    }
    Database.prototype.init = function () {
        var _this = this;
        this.connection = new sequelize_1.default(database_1.default);
        models
            .map(function (model) { return model.init(_this.connection); })
            .map(function (model) {
            return model.associate && model.associate(_this.connection.models);
        });
    };
    return Database;
}());
exports.default = new Database();
