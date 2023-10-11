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
var Classification_1 = __importDefault(require("../models/Classification"));
var Team_1 = __importDefault(require("../models/Team"));
var Championship_1 = __importDefault(require("../models/Championship"));
var Op = require('sequelize').Op;
var ClassificationController = /** @class */ (function () {
    function ClassificationController() {
    }
    ClassificationController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var classifications;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Classification_1.default.findAll({
                            include: [
                                {
                                    model: Team_1.default,
                                    as: 'team', // Defina o alias corretamente aqui
                                },
                                {
                                    model: Championship_1.default,
                                    as: 'championship', // Defina o alias corretamente aqui
                                },
                            ],
                        })];
                    case 1:
                        classifications = _a.sent();
                        return [2 /*return*/, res.json(classifications)];
                }
            });
        });
    };
    ClassificationController.prototype.classificationForChamp = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var championship_id, classifications;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        championship_id = req.params.championship_id;
                        return [4 /*yield*/, Classification_1.default.findAll({
                                where: { championship_id: championship_id },
                                include: [
                                    { model: Team_1.default, attributes: ['team'], as: 'team' },
                                    {
                                        model: Championship_1.default,
                                        attributes: ['name'],
                                        as: 'championship',
                                    },
                                ],
                            })];
                    case 1:
                        classifications = _a.sent();
                        return [2 /*return*/, res.json(classifications)];
                }
            });
        });
    };
    ClassificationController.prototype.teamsHomeForResult = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, championship_id, user_id, classifications, teams, teamIds, filteredClassifications, filteredTeams;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, championship_id = _a.championship_id, user_id = _a.user_id;
                        return [4 /*yield*/, Classification_1.default.findAll({
                                where: { championship_id: championship_id, check: true },
                                include: [{ model: Team_1.default, as: 'team' }],
                            })];
                    case 1:
                        classifications = _b.sent();
                        return [4 /*yield*/, Team_1.default.findAll({
                                where: { user_id: user_id, check: true },
                            })];
                    case 2:
                        teams = _b.sent();
                        teamIds = teams.map(function (team) { return team.id; });
                        filteredClassifications = classifications.filter(function (classification) { return teamIds.includes(classification.team.id); });
                        filteredTeams = filteredClassifications.map(function (classification) { return classification.team; });
                        return [2 /*return*/, res.json(filteredTeams)];
                }
            });
        });
    };
    ClassificationController.prototype.teamsAwayForResult = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, championship_id, user_id, classifications, teamIdsInClassifications, teams;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = req.params, championship_id = _a.championship_id, user_id = _a.user_id;
                        return [4 /*yield*/, Classification_1.default.findAll({
                                attributes: [],
                                where: { championship_id: championship_id, check: true },
                                include: [{ model: Team_1.default, as: 'team' }],
                            })];
                    case 1:
                        classifications = _d.sent();
                        teamIdsInClassifications = classifications.map(function (classification) { return classification.team.id; });
                        return [4 /*yield*/, Team_1.default.findAll({
                                where: {
                                    id: (_b = {},
                                        _b[Op.in] = teamIdsInClassifications,
                                        _b),
                                    user_id: (_c = {},
                                        _c[Op.not] = user_id,
                                        _c),
                                    check: true, // Certifique-se de que check seja verdadeiro
                                },
                            })];
                    case 2:
                        teams = _d.sent();
                        return [2 /*return*/, res.json(teams)];
                }
            });
        });
    };
    ClassificationController.prototype.classificationForTeams = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var teams_ids, classificationsSearch, championshipIdsFound, classifications_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        teams_ids = req.body.teams_ids;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Classification_1.default.findAll({
                                where: {
                                    team_id: teams_ids, // Procura pelos team_id no array
                                },
                                attributes: ['championship_id'],
                                raw: true, // Retorna os resultados como objetos JS em vez de modelos Sequelize
                            })];
                    case 2:
                        classificationsSearch = _a.sent();
                        championshipIdsFound = classificationsSearch.map(function (item) { return item.championship_id; });
                        classifications_1 = [];
                        return [4 /*yield*/, Promise.all(championshipIdsFound.map(function (championshipId) { return __awaiter(_this, void 0, void 0, function () {
                                var classificationTable, error_2;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, Classification_1.default.findAll({
                                                    where: { championship_id: championshipId },
                                                    include: [
                                                        {
                                                            model: Team_1.default,
                                                            attributes: ['team'],
                                                            as: 'team',
                                                        },
                                                        {
                                                            model: Championship_1.default,
                                                            attributes: ['name'],
                                                            as: 'championship',
                                                        },
                                                    ],
                                                    order: [
                                                        ['points', 'DESC'],
                                                        ['wins', 'DESC'],
                                                        ['goals_difference', 'DESC'],
                                                        ['goals_pro', 'DESC'],
                                                    ],
                                                })];
                                        case 1:
                                            classificationTable = _a.sent();
                                            classifications_1.push(classificationTable);
                                            return [3 /*break*/, 3];
                                        case 2:
                                            error_2 = _a.sent();
                                            console.error("Erro ao buscar classifica\u00E7\u00E3o para championship_id: ".concat(championshipId), error_2);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.json(classifications_1)];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, res
                                .status(500)
                                .json({ error: 'Erro ao buscar as classificações.' })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ClassificationController.prototype.store = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, existingTeams, team_championship;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = Yup.object().shape({
                            championship_id: Yup.number().required(),
                            team_id: Yup.number().required(),
                        });
                        return [4 /*yield*/, schema.isValid(req.body)];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/, res.status(400).json({ error: 'falha na validação' })];
                        }
                        return [4 /*yield*/, Classification_1.default.findOne({
                                where: {
                                    championship_id: req.body.championship_id,
                                    team_id: req.body.team_id,
                                },
                            })];
                    case 2:
                        existingTeams = _a.sent();
                        if (existingTeams) {
                            return [2 /*return*/, res
                                    .status(400)
                                    .json({ error: 'Time já cadastrado neste campeonato. ' })];
                        }
                        return [4 /*yield*/, Classification_1.default.create(req.body)];
                    case 3:
                        team_championship = _a.sent();
                        return [2 /*return*/, res.status(200).json(team_championship)];
                }
            });
        });
    };
    ClassificationController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, team;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Classification_1.default.findByPk(id)];
                    case 1:
                        team = _a.sent();
                        if (!team) {
                            return [2 /*return*/, res.status(400).json({ error: 'Time não existe. ' })];
                        }
                        return [4 /*yield*/, team.update(req.body)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.json(team)];
                }
            });
        });
    };
    ClassificationController.prototype.checkChange = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, classification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.body.id;
                        return [4 /*yield*/, Classification_1.default.findByPk(id)];
                    case 1:
                        classification = _a.sent();
                        if (!classification) {
                            return [2 /*return*/, res.status(400).json({
                                    error: 'Time não existe na tabela de classificação. ',
                                })];
                        }
                        classification.check = !classification.check;
                        return [4 /*yield*/, classification.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.json(classification)];
                }
            });
        });
    };
    ClassificationController.prototype.searchById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, classification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Classification_1.default.findByPk(id)];
                    case 1:
                        classification = _a.sent();
                        if (!classification) {
                            return [2 /*return*/, res
                                    .status(400)
                                    .json({ error: 'Classification não existe. ' })];
                        }
                        return [2 /*return*/, res.json(classification)];
                }
            });
        });
    };
    ClassificationController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, classification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Classification_1.default.findByPk(id)];
                    case 1:
                        classification = _a.sent();
                        if (!classification) {
                            return [2 /*return*/, res.status(400).json({ error: 'Tarefa não existe. ' })];
                        }
                        return [4 /*yield*/, classification.destroy()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send()];
                }
            });
        });
    };
    return ClassificationController;
}());
exports.default = new ClassificationController();
