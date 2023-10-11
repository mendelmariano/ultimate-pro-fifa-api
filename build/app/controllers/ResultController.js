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
var Result_1 = __importDefault(require("../models/Result"));
var Classification_1 = __importDefault(require("../models/Classification"));
var Team_1 = __importDefault(require("../models/Team"));
var Championship_1 = __importDefault(require("../models/Championship"));
var Op = require('sequelize').Op;
var ResultController = /** @class */ (function () {
    function ResultController() {
    }
    ResultController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Result_1.default.findAll({
                            include: [
                                { model: Team_1.default, as: 'home', attributes: ['team'] },
                                { model: Team_1.default, as: 'away', attributes: ['team'] },
                            ],
                        })];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, res.json(results)];
                }
            });
        });
    };
    ResultController.prototype.store = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, verifyResultsExistsInChamp, resultCadastrado, home_team, away_team, championship_id_1, existingTeams_1, teamsToCreate, error_1;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 6, , 7]);
                        schema = Yup.object().shape({
                            home_goals: Yup.number().required(),
                            away_goals: Yup.number().required(),
                            home_team: Yup.number().required(),
                            away_team: Yup.number().required(),
                            status: Yup.number(),
                            championship_id: Yup.number().required(),
                        });
                        return [4 /*yield*/, schema.isValid(req.body)];
                    case 1:
                        if (!(_e.sent())) {
                            return [2 /*return*/, res.status(400).json({ error: 'falha na validação' })];
                        }
                        return [4 /*yield*/, Result_1.default.findAll({
                                where: (_a = {
                                        championship_id: req.body.championship_id
                                    },
                                    _a[Op.or] = [
                                        (_b = {},
                                            _b[Op.and] = [
                                                { home_team: req.body.home_team },
                                                { away_team: req.body.away_team },
                                            ],
                                            _b),
                                        (_c = {},
                                            _c[Op.and] = [
                                                { home_team: req.body.away_team },
                                                { away_team: req.body.home_team },
                                            ],
                                            _c),
                                    ],
                                    _a.status = (_d = {},
                                        _d[Op.lt] = 2,
                                        _d),
                                    _a),
                            })];
                    case 2:
                        verifyResultsExistsInChamp = _e.sent();
                        if (verifyResultsExistsInChamp.length >= 2) {
                            return [2 /*return*/, res.status(400).json({
                                    error: 'Você só pode jogar duas vezes contra o mesmo adversário por campeonato',
                                })];
                        }
                        // Interceptando para pegar o id do usuário logado e setar ele como proprietário deste resultado
                        req.body.owner = req.userId;
                        return [4 /*yield*/, Result_1.default.create(req.body)];
                    case 3:
                        resultCadastrado = _e.sent();
                        if (!resultCadastrado) {
                            return [2 /*return*/, res
                                    .status(400)
                                    .json({ error: 'falha no registro de resultado' })];
                        }
                        home_team = resultCadastrado.home_team, away_team = resultCadastrado.away_team, championship_id_1 = resultCadastrado.championship_id;
                        return [4 /*yield*/, Classification_1.default.findAll({
                                where: {
                                    championship_id: championship_id_1,
                                    team_id: [home_team, away_team],
                                },
                            })];
                    case 4:
                        existingTeams_1 = _e.sent();
                        teamsToCreate = [home_team, away_team].filter(function (teamId) {
                            return !existingTeams_1.some(function (team) { return team.team_id === teamId; });
                        });
                        return [4 /*yield*/, Classification_1.default.bulkCreate(teamsToCreate.map(function (teamId) { return ({
                                team_id: teamId,
                                championship_id: championship_id_1,
                                check: true, // Defina como 'true' ou outro valor adequado
                            }); }))];
                    case 5:
                        _e.sent();
                        return [2 /*return*/, res.json(resultCadastrado)];
                    case 6:
                        error_1 = _e.sent();
                        console.error(error_1);
                        return [2 /*return*/, res.status(500).json({
                                error: 'Erro interno do servidor na criação do resultado',
                            })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ResultController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Result_1.default.findByPk(id)];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            return [2 /*return*/, res.status(400).json({ error: 'Resultado não existe. ' })];
                        }
                        return [4 /*yield*/, result.update(req.body)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.json(result)];
                }
            });
        });
    };
    ResultController.prototype.searchById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Result_1.default.findByPk(id)];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            return [2 /*return*/, res.status(400).json({ error: 'Resultado não existe. ' })];
                        }
                        return [2 /*return*/, res.json(result)];
                }
            });
        });
    };
    ResultController.prototype.loadResultUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, teams, teamIds, results;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        user_id = req.params.user_id;
                        return [4 /*yield*/, Team_1.default.findAll({
                                where: {
                                    user_id: user_id,
                                    check: true, // Certifique-se de que check seja verdadeiro
                                },
                            })];
                    case 1:
                        teams = _d.sent();
                        teamIds = teams.map(function (team) { return team.id; });
                        return [4 /*yield*/, Result_1.default.findAll({
                                where: (_a = {},
                                    _a[Op.or] = [
                                        {
                                            home_team: (_b = {},
                                                _b[Op.in] = teamIds,
                                                _b),
                                        },
                                        {
                                            away_team: (_c = {},
                                                _c[Op.in] = teamIds,
                                                _c),
                                        },
                                    ],
                                    _a),
                                include: [
                                    { model: Team_1.default, as: 'home', attributes: ['team'] },
                                    { model: Team_1.default, as: 'away', attributes: ['team'] },
                                    {
                                        model: Championship_1.default,
                                        as: 'championship',
                                        attributes: ['id', 'name'],
                                    },
                                ],
                            })];
                    case 2:
                        results = _d.sent();
                        return [2 /*return*/, res.json(results)];
                }
            });
        });
    };
    ResultController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Result_1.default.findByPk(id)];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            return [2 /*return*/, res.status(400).json({ error: 'Resultado não existe. ' })];
                        }
                        return [4 /*yield*/, result.destroy()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send()];
                }
            });
        });
    };
    ResultController.prototype.declineResult = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, motivo_cancelamento, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, id = _a.id, motivo_cancelamento = _a.motivo_cancelamento;
                        return [4 /*yield*/, Result_1.default.findByPk(id, {
                                include: [
                                    { model: Team_1.default, as: 'home', attributes: ['team'] },
                                    { model: Team_1.default, as: 'away', attributes: ['team'] },
                                    {
                                        model: Championship_1.default,
                                        as: 'championship',
                                        attributes: ['id', 'name'],
                                    },
                                ],
                            })];
                    case 1:
                        result = _b.sent();
                        if (!result) {
                            return [2 /*return*/, res.status(400).json({ error: 'Resultado não existe. ' })];
                        }
                        // Define o campo 'status' como 2
                        result.status = 2;
                        result.motivo_cancelamento = motivo_cancelamento;
                        return [4 /*yield*/, result.save()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.json(result)];
                }
            });
        });
    };
    ResultController.prototype.updateCheck = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, homeTeamClassification, awayTeamClassification, awayTeamClassification, homeTeamClassification, homeTeamClassification, awayTeamClassification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.body.id;
                        return [4 /*yield*/, Result_1.default.findByPk(id, {
                                include: [
                                    { model: Team_1.default, as: 'home', attributes: ['team'] },
                                    { model: Team_1.default, as: 'away', attributes: ['team'] },
                                    {
                                        model: Championship_1.default,
                                        as: 'championship',
                                        attributes: ['id', 'name'],
                                    },
                                ],
                            })];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            return [2 /*return*/, res.status(400).json({ error: 'Resultado não existe. ' })];
                        }
                        if (result.owner === req.userId) {
                            return [2 /*return*/, res.status(400).json({
                                    error: 'Você não pode confirmar um resultado contra seu próprio time.',
                                })];
                        }
                        // Define o campo 'check' como true
                        result.status = 1;
                        // Salva as mudanças no banco de dados
                        return [4 /*yield*/, result.save()];
                    case 2:
                        // Salva as mudanças no banco de dados
                        _a.sent();
                        if (!(result.home_goals > result.away_goals)) return [3 /*break*/, 5];
                        return [4 /*yield*/, Classification_1.default.findOne({
                                where: {
                                    championship_id: result.championship_id,
                                    team_id: result.home_team,
                                },
                            })];
                    case 3:
                        homeTeamClassification = _a.sent();
                        homeTeamClassification.wins += 1;
                        homeTeamClassification.points += 3;
                        homeTeamClassification.goals_pro += result.home_goals;
                        homeTeamClassification.goals_conceded += result.away_goals;
                        homeTeamClassification.goals_difference =
                            homeTeamClassification.goals_pro -
                                homeTeamClassification.goals_conceded;
                        homeTeamClassification.save();
                        return [4 /*yield*/, Classification_1.default.findOne({
                                where: {
                                    championship_id: result.championship_id,
                                    team_id: result.away_team,
                                },
                            })];
                    case 4:
                        awayTeamClassification = _a.sent();
                        awayTeamClassification.loses += 1;
                        awayTeamClassification.goals_pro += result.away_goals;
                        awayTeamClassification.goals_conceded += result.home_goals;
                        awayTeamClassification.goals_difference =
                            awayTeamClassification.goals_pro -
                                awayTeamClassification.goals_conceded;
                        awayTeamClassification.save();
                        _a.label = 5;
                    case 5:
                        if (!(result.home_goals < result.away_goals)) return [3 /*break*/, 8];
                        return [4 /*yield*/, Classification_1.default.findOne({
                                where: {
                                    championship_id: result.championship_id,
                                    team_id: result.home_team,
                                },
                            })];
                    case 6:
                        awayTeamClassification = _a.sent();
                        awayTeamClassification.wins += 1;
                        awayTeamClassification.points += 3;
                        awayTeamClassification.goals_pro = +result.home_goals;
                        awayTeamClassification.goals_conceded += result.away_goals;
                        awayTeamClassification.goals_difference =
                            awayTeamClassification.goals_pro -
                                awayTeamClassification.goals_conceded;
                        awayTeamClassification.save();
                        return [4 /*yield*/, Classification_1.default.findOne({
                                where: {
                                    championship_id: result.championship_id,
                                    team_id: result.away_team,
                                },
                            })];
                    case 7:
                        homeTeamClassification = _a.sent();
                        homeTeamClassification.loses += 1;
                        homeTeamClassification.goals_pro = +result.away_goals;
                        homeTeamClassification.goals_conceded += result.home_goals;
                        homeTeamClassification.goals_difference =
                            homeTeamClassification.goals_pro -
                                homeTeamClassification.goals_conceded;
                        homeTeamClassification.save();
                        _a.label = 8;
                    case 8:
                        if (!(result.home_goals === result.away_goals)) return [3 /*break*/, 11];
                        return [4 /*yield*/, Classification_1.default.findOne({
                                where: {
                                    championship_id: result.championship_id,
                                    team_id: result.home_team,
                                },
                            })];
                    case 9:
                        homeTeamClassification = _a.sent();
                        homeTeamClassification.ties += 1;
                        homeTeamClassification.points += 1;
                        homeTeamClassification.goals_pro = +result.home_goals;
                        homeTeamClassification.goals_conceded += result.away_goals;
                        homeTeamClassification.save();
                        return [4 /*yield*/, Classification_1.default.findOne({
                                where: {
                                    championship_id: result.championship_id,
                                    team_id: result.away_team,
                                },
                            })];
                    case 10:
                        awayTeamClassification = _a.sent();
                        awayTeamClassification.ties += 1;
                        awayTeamClassification.points += 1;
                        awayTeamClassification.goals_pro = +result.away_goals;
                        awayTeamClassification.goals_conceded += result.home_goals;
                        awayTeamClassification.save();
                        _a.label = 11;
                    case 11: return [2 /*return*/, res.json(result)];
                }
            });
        });
    };
    return ResultController;
}());
exports.default = new ResultController();
