"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
var sequelize_1 = __importStar(require("sequelize"));
var Result = /** @class */ (function (_super) {
    __extends(Result, _super);
    function Result() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Result.init = function (sequelize) {
        _super.init.call(this, {
            home_goals: sequelize_1.default.INTEGER,
            away_goals: sequelize_1.default.INTEGER,
            owner: sequelize_1.default.INTEGER,
            status: sequelize_1.default.NUMBER,
            motivo_cancelamento: sequelize_1.default.STRING,
        }, {
            sequelize: sequelize,
        });
        return this;
    };
    Result.associate = function (models) {
        this.belongsTo(models.Championship, {
            foreignKey: 'championship_id',
            as: 'championship',
        });
        this.belongsTo(models.Team, {
            foreignKey: 'home_team',
            targetKey: 'id',
            as: 'home',
        });
        this.belongsTo(models.Team, {
            foreignKey: 'away_team',
            targetKey: 'id',
            as: 'away',
        });
    };
    return Result;
}(sequelize_1.Model));
exports.default = Result;
