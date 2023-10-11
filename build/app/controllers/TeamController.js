"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
var Yup = __importStar(require("yup"));
var Team_1 = __importDefault(require("../models/Team"));
var Mode_1 = __importDefault(require("../models/Mode"));
var User_1 = __importDefault(require("../models/User"));
var TeamController = /** @class */ (function () {
    function TeamController() {
    }
    TeamController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var teams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Team_1.default.findAll({
                            include: {
                                model: Mode_1.default,
                                as: 'mode', // Defina o alias corretamente aqui
                            },
                        })];
                    case 1:
                        teams = _a.sent();
                        return [2 /*return*/, res.json(teams)];
                }
            });
        });
    };
    TeamController.prototype.store = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, _a, team, mode_id, check, teams;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        schema = Yup.object().shape({
                            team: Yup.string().required(),
                        });
                        return [4 /*yield*/, schema.isValid(req.body)];
                    case 1:
                        if (!(_b.sent())) {
                            return [2 /*return*/, res.status(400).json({ error: 'falha na validação' })];
                        }
                        _a = req.body, team = _a.team, mode_id = _a.mode_id, check = _a.check;
                        return [4 /*yield*/, Team_1.default.create({
                                user_id: req.userId,
                                team: team,
                                mode_id: mode_id,
                                check: check,
                            })];
                    case 2:
                        teams = _b.sent();
                        return [2 /*return*/, res.json(teams)];
                }
            });
        });
    };
    TeamController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, team, teamUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Team_1.default.findByPk(id)];
                    case 1:
                        team = _a.sent();
                        if (!team) {
                            return [2 /*return*/, res.status(400).json({ error: 'Time não existe. ' })];
                        }
                        return [4 /*yield*/, team.update(req.body)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, Team_1.default.findByPk(id, {
                                include: {
                                    model: Mode_1.default,
                                    as: 'mode', // Defina o alias corretamente aqui
                                },
                            })];
                    case 3:
                        teamUpdate = _a.sent();
                        return [2 /*return*/, res.json(teamUpdate)];
                }
            });
        });
    };
    TeamController.prototype.searchById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, team;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Team_1.default.findByPk(id, {
                                include: [
                                    {
                                        model: Mode_1.default,
                                        as: 'mode', // Certifique-se de que o alias esteja definido corretamente
                                    },
                                    {
                                        model: User_1.default,
                                        as: 'user',
                                        attributes: ['id', 'email', 'name', 'whatsapp'],
                                    },
                                ],
                            })];
                    case 1:
                        team = _a.sent();
                        if (!team) {
                            return [2 /*return*/, res.status(400).json({ error: 'Time não existe. ' })];
                        }
                        return [2 /*return*/, res.json(team)];
                }
            });
        });
    };
    TeamController.prototype.findByUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, teams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Team_1.default.findAll({
                                where: { user_id: id },
                                include: {
                                    model: Mode_1.default,
                                    as: 'mode', // Defina o alias corretamente aqui
                                },
                            })];
                    case 1:
                        teams = _a.sent();
                        return [2 /*return*/, res.json(teams)];
                }
            });
        });
    };
    TeamController.prototype.findCheckedByUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, teams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Team_1.default.findAll({
                                where: { user_id: id, check: true },
                                include: {
                                    model: Mode_1.default,
                                    as: 'mode', // Defina o alias corretamente aqui
                                },
                            })];
                    case 1:
                        teams = _a.sent();
                        return [2 /*return*/, res.json(teams)];
                }
            });
        });
    };
    TeamController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, team;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Team_1.default.findByPk(id)];
                    case 1:
                        team = _a.sent();
                        if (!team) {
                            return [2 /*return*/, res.status(400).json({ error: 'Tarefa não existe. ' })];
                        }
                        return [4 /*yield*/, team.destroy()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send()];
                }
            });
        });
    };
    TeamController.prototype.updateCheck = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, team;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Team_1.default.findByPk(id, {
                                include: {
                                    model: Mode_1.default,
                                    as: 'mode', // Certifique-se de que o alias esteja definido corretamente
                                },
                            })];
                    case 1:
                        team = _a.sent();
                        if (!team) {
                            return [2 /*return*/, res.status(400).json({ error: 'Time não existe. ' })];
                        }
                        // Define o campo 'check' como true
                        team.check = !team.check;
                        // Salva as mudanças no banco de dados
                        return [4 /*yield*/, team.save()];
                    case 2:
                        // Salva as mudanças no banco de dados
                        _a.sent();
                        return [2 /*return*/, res.json(team)];
                }
            });
        });
    };
    return TeamController;
}());
exports.default = new TeamController();
