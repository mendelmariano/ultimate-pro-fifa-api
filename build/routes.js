"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = __importDefault(require("./app/controllers/UserController"));
var SessionController_1 = __importDefault(require("./app/controllers/SessionController"));
var ProfileController_1 = __importDefault(require("./app/controllers/ProfileController"));
var auth_1 = __importDefault(require("./app/middlewares/auth"));
var TeamController_1 = __importDefault(require("./app/controllers/TeamController"));
var ChampionshipController_1 = __importDefault(require("./app/controllers/ChampionshipController"));
var ResultController_1 = __importDefault(require("./app/controllers/ResultController"));
var ClassificationController_1 = __importDefault(require("./app/controllers/ClassificationController"));
var ModeController_1 = __importDefault(require("./app/controllers/ModeController"));
var routes = new express_1.Router();
routes.post('/users', UserController_1.default.store);
routes.delete('/users/:user_id', UserController_1.default.delete);
routes.post('/sessions', SessionController_1.default.store);
// Todas as rotas abaixo precisam estar autenticadas
routes.use(auth_1.default);
routes.put('/users', UserController_1.default.update);
routes.put('/users/:id', UserController_1.default.updateSomeone);
routes.get('/users/:id', UserController_1.default.searchById);
routes.get('/users/paginate/index/:page', UserController_1.default.index);
routes.post('/users/paginate/search', UserController_1.default.indexSearch);
// Resource de modos de jogo
routes.post('/modes', ModeController_1.default.store);
routes.get('/modes', ModeController_1.default.index);
routes.get('/modes/:id', ModeController_1.default.searchById);
routes.put('/modes/:id', ModeController_1.default.update);
routes.delete('/modes/:id', ModeController_1.default.delete);
// Resource de times
routes.post('/teams', TeamController_1.default.store);
routes.get('/teams', TeamController_1.default.index);
routes.patch('/teams/check/:id', TeamController_1.default.updateCheck);
routes.get('/teams/user/checked/:id', TeamController_1.default.findCheckedByUser);
routes.get('/teams/user/:id', TeamController_1.default.findByUser);
routes.get('/teams/:id', TeamController_1.default.searchById);
routes.put('/teams/:id', TeamController_1.default.update);
routes.delete('/teams/:id', TeamController_1.default.delete);
// Resource de perfis
routes.get('/profiles', ProfileController_1.default.index);
routes.get('/profiles/users/:id', ProfileController_1.default.searchUsersForId);
routes.get('/profiles/:id', ProfileController_1.default.searchById);
routes.delete('/profiles/:id', ProfileController_1.default.delete);
// Resources de Campeonatos
routes.get('/championships', ChampionshipController_1.default.index);
routes.post('/championships', ChampionshipController_1.default.store);
routes.post('/championships/forCheck', ChampionshipController_1.default.forCheck);
routes.get('/championships/:id', ChampionshipController_1.default.searchById);
routes.put('/championships/:id', ChampionshipController_1.default.update);
routes.delete('/championships/:id', ChampionshipController_1.default.delete);
routes.get('/championships/check/:user_id', ChampionshipController_1.default.participateCheck);
routes.patch('/championships/:id', ChampionshipController_1.default.participate);
// Resource de Resultados
routes.get('/results', ResultController_1.default.index);
routes.post('/results', ResultController_1.default.store);
routes.patch('/results/check', ResultController_1.default.updateCheck);
routes.patch('/results/decline', ResultController_1.default.declineResult);
routes.get('/results/user/:user_id', ResultController_1.default.loadResultUser);
routes.get('/results/:id', ResultController_1.default.searchById);
routes.delete('/results/:id', ResultController_1.default.delete);
// Resources de classificações
routes.get('/classifications', ClassificationController_1.default.index);
routes.patch('/classification/team/check', ClassificationController_1.default.checkChange);
routes.get('/classifications/result/listHomeTeams/:user_id/:championship_id', ClassificationController_1.default.teamsHomeForResult);
routes.get('/classifications/result/listAwayTeams/:user_id/:championship_id', ClassificationController_1.default.teamsAwayForResult);
routes.post('/classifications/championship/forTeams', ClassificationController_1.default.classificationForTeams);
routes.get('/classifications/championship/:championship_id', ClassificationController_1.default.classificationForChamp);
exports.default = routes;
