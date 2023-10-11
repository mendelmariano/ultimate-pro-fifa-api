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
var sequelize_1 = require("sequelize");
var User_1 = __importDefault(require("../models/User"));
var Profile_1 = __importDefault(require("../models/Profile"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, _b, pageSize, offset, users, totalPages;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.params, page = _a.page, _b = _a.pageSize, pageSize = _b === void 0 ? 10 : _b;
                        offset = (page - 1) * pageSize;
                        return [4 /*yield*/, User_1.default.findAndCountAll({
                                include: [
                                    {
                                        model: Profile_1.default,
                                        as: 'profile',
                                        attributes: ['name', 'id'],
                                    },
                                ],
                                attributes: [
                                    'id',
                                    'name',
                                    'email',
                                    'whatsapp',
                                    'profile_id',
                                    'createdAt',
                                    'updatedAt',
                                ],
                                limit: pageSize,
                                offset: offset,
                            })];
                    case 1:
                        users = _c.sent();
                        totalPages = Math.ceil(users.count / pageSize);
                        return [2 /*return*/, res.json({
                                currentPage: parseInt(page, 10),
                                totalPages: totalPages,
                                totalCount: users.count,
                                users: users.rows,
                            })];
                }
            });
        });
    };
    UserController.prototype.indexSearch = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, _b, pageSize, search, offset, whereClause, users, totalPages, error_1;
            var _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = req.body, page = _a.page, _b = _a.pageSize, pageSize = _b === void 0 ? 10 : _b, search = _a.search;
                        offset = (page - 1) * pageSize;
                        whereClause = search
                            ? (_c = {},
                                _c[sequelize_1.Op.or] = [
                                    { name: (_d = {}, _d[sequelize_1.Op.like] = "%".concat(search, "%"), _d) },
                                    { email: (_e = {}, _e[sequelize_1.Op.like] = "%".concat(search, "%"), _e) },
                                    { '$profile.name$': (_f = {}, _f[sequelize_1.Op.like] = "%".concat(search, "%"), _f) },
                                ],
                                _c) : {};
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, User_1.default.findAndCountAll({
                                include: [
                                    {
                                        model: Profile_1.default,
                                        as: 'profile',
                                        attributes: ['name'],
                                    },
                                ],
                                attributes: [
                                    'id',
                                    'name',
                                    'email',
                                    'whatsapp',
                                    'profile_id',
                                    'createdAt',
                                    'updatedAt',
                                ],
                                where: whereClause,
                                limit: pageSize,
                                offset: offset,
                            })];
                    case 2:
                        users = _g.sent();
                        totalPages = Math.ceil(users.count / pageSize);
                        return [2 /*return*/, res.json({
                                currentPage: parseInt(page, 10),
                                totalPages: totalPages,
                                totalCount: users.count,
                                users: users.rows,
                            })];
                    case 3:
                        error_1 = _g.sent();
                        // Trate qualquer erro que possa ocorrer durante a consulta ao banco de dados.
                        return [2 /*return*/, res.status(500).json({ error: 'Erro interno do servidor' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.store = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, userExist, whatsappExist, profileExist, _a, id, name, email, whatsapp, profile_id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        schema = Yup.object().shape({
                            name: Yup.string().required(),
                            whatsapp: Yup.string(),
                            email: Yup.string().email().required(),
                            password: Yup.string().required().min(6),
                            profile_id: Yup.number().required(),
                        });
                        return [4 /*yield*/, User_1.default.findOne({
                                where: { email: req.body.email },
                            })];
                    case 1:
                        userExist = _b.sent();
                        return [4 /*yield*/, User_1.default.findOne({
                                where: { whatsapp: req.body.whatsapp },
                            })];
                    case 2:
                        whatsappExist = _b.sent();
                        return [4 /*yield*/, Profile_1.default.findOne({
                                where: { id: req.body.profile_id },
                            })];
                    case 3:
                        profileExist = _b.sent();
                        return [4 /*yield*/, schema.isValid(req.body)];
                    case 4:
                        if (!(_b.sent())) {
                            return [2 /*return*/, res.status(400).json({ error: 'falha na validação' })];
                        }
                        if (userExist) {
                            return [2 /*return*/, res.status(400).json({ error: 'Usuário já existe. ' })];
                        }
                        if (whatsappExist) {
                            return [2 /*return*/, res.status(400).json({ error: 'Este contato já existe. ' })];
                        }
                        if (!profileExist) {
                            return [2 /*return*/, res.status(400).json({ error: 'Perfil inválido. ' })];
                        }
                        return [4 /*yield*/, User_1.default.create(req.body)];
                    case 5:
                        _a = _b.sent(), id = _a.id, name = _a.name, email = _a.email, whatsapp = _a.whatsapp, profile_id = _a.profile_id;
                        return [2 /*return*/, res.json({
                                id: id,
                                name: name,
                                whatsapp: whatsapp,
                                email: email,
                                profile_id: profile_id,
                            })];
                }
            });
        });
    };
    UserController.prototype.searchById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, User_1.default.findByPk(id, {
                                include: [
                                    {
                                        model: Profile_1.default,
                                        as: 'profile',
                                    },
                                ],
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(400).json({ error: 'Usuário não existe. ' })];
                        }
                        return [2 /*return*/, res.json(user)];
                }
            });
        });
    };
    UserController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, oldPassword, password, confirmPassword, user, userExist, _b, _c, id, name, whatsapp;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = req.body, email = _a.email, oldPassword = _a.oldPassword, password = _a.password, confirmPassword = _a.confirmPassword;
                        return [4 /*yield*/, User_1.default.findByPk(req.userId)];
                    case 1:
                        user = _d.sent();
                        if (!(email && email !== user.email)) return [3 /*break*/, 3];
                        return [4 /*yield*/, User_1.default.findOne({
                                where: { email: req.body.email },
                            })];
                    case 2:
                        userExist = _d.sent();
                        if (userExist) {
                            return [2 /*return*/, res.status(400).json({ error: 'Email já existe. ' })];
                        }
                        _d.label = 3;
                    case 3:
                        _b = oldPassword;
                        if (!_b) return [3 /*break*/, 5];
                        return [4 /*yield*/, user.checkPassword(oldPassword)];
                    case 4:
                        _b = !(_d.sent());
                        _d.label = 5;
                    case 5:
                        // Verifica se a propriedade oldPassword existe na requisição e se ela confere com a senha do usuário
                        if (_b) {
                            return [2 /*return*/, res.status(400).json({ error: 'Senha incorreta. ' })];
                        }
                        // Se password está definido, newPassword e confirmPassword também devem estar definidos
                        if (password) {
                            if (!oldPassword) {
                                return [2 /*return*/, res.status(400).json({
                                        error: 'A senha antiga é necessária para atualizar a senha. ',
                                    })];
                            }
                            if (!confirmPassword) {
                                return [2 /*return*/, res.status(400).json({
                                        error: 'O campo de confirmação de senha é obrigatório. ',
                                    })];
                            }
                            if (password !== confirmPassword) {
                                return [2 /*return*/, res
                                        .status(400)
                                        .json({ error: 'As senhas não coincidem. ' })];
                            }
                            if (password.length < 6) {
                                return [2 /*return*/, res.status(400).json({
                                        error: 'A nova senha deve ter pelo menos 6 caracteres. ',
                                    })];
                            }
                        }
                        return [4 /*yield*/, user.update(req.body)];
                    case 6:
                        _c = _d.sent(), id = _c.id, name = _c.name, whatsapp = _c.whatsapp;
                        return [2 /*return*/, res.json({
                                id: id,
                                name: name,
                                email: email,
                                whatsapp: whatsapp,
                            })];
                }
            });
        });
    };
    UserController.prototype.updateSomeone = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, email, user, userExist, id, userEdited;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = Yup.object().shape({
                            name: Yup.string(),
                            email: Yup.string().email(),
                            whatsapp: Yup.string(),
                            password: Yup.string(),
                            profile_id: Yup.number().required(),
                        });
                        return [4 /*yield*/, schema.isValid(req.body)];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/, res.status(400).json({ error: 'falha na validação' })];
                        }
                        email = req.body.email;
                        return [4 /*yield*/, User_1.default.findByPk(req.params.id)];
                    case 2:
                        user = _a.sent();
                        if (!(email !== user.email)) return [3 /*break*/, 4];
                        return [4 /*yield*/, User_1.default.findOne({
                                where: { email: req.body.email },
                            })];
                    case 3:
                        userExist = _a.sent();
                        if (userExist) {
                            return [2 /*return*/, res.status(400).json({ error: 'Email já existe. ' })];
                        }
                        _a.label = 4;
                    case 4: return [4 /*yield*/, user.update(req.body)];
                    case 5:
                        id = (_a.sent()).id;
                        return [4 /*yield*/, User_1.default.findOne({
                                where: [{ id: id }],
                                include: [
                                    {
                                        model: Profile_1.default,
                                        as: 'profile',
                                        attributes: ['name', 'id'],
                                    },
                                ],
                                attributes: [
                                    'id',
                                    'name',
                                    'email',
                                    'whatsapp',
                                    'profile_id',
                                    'createdAt',
                                    'updatedAt',
                                ],
                            })];
                    case 6:
                        userEdited = _a.sent();
                        return [2 /*return*/, res.json(userEdited)];
                }
            });
        });
    };
    UserController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.params.user_id;
                        return [4 /*yield*/, User_1.default.findByPk(user_id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(400).json({ error: 'Usuário não existe. ' })];
                        }
                        return [4 /*yield*/, user.destroy()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send()];
                }
            });
        });
    };
    return UserController;
}());
exports.default = new UserController();
