// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';
import Result from '../models/Result';
import Classification from '../models/Classification';
import Team from '../models/Team';

class ResultController {
    async index(req, res) {
        const results = await Result.findAll({
            include: [
                { model: Team, as: 'home', attributes: ['team'] },
                { model: Team, as: 'away', attributes: ['team'] },
            ],
        });

        return res.json(results);
    }

    async store(req, res) {
        try {
            const schema = Yup.object().shape({
                home_goals: Yup.number().required(),
                away_goals: Yup.number().required(),
                home_team: Yup.number().required(),
                away_team: Yup.number().required(),
                championship_id: Yup.number().required(),
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: 'falha na validação' });
            }

            const resultCadastrado = await Result.create(req.body);

            if (!resultCadastrado) {
                return res
                    .status(400)
                    .json({ error: 'falha no registro de resultado' });
            }

            const { home_team, away_team, championship_id } = resultCadastrado;

            const existingTeams = await Classification.findAll({
                where: {
                    championship_id,
                    team_id: [home_team, away_team],
                },
            });

            const teamsToCreate = [home_team, away_team].filter(
                (teamId) =>
                    !existingTeams.some((team) => team.team_id === teamId)
            );

            await Classification.bulkCreate(
                teamsToCreate.map((teamId) => ({
                    team_id: teamId,
                    championship_id,
                    check: true, // Defina como 'true' ou outro valor adequado
                }))
            );

            return res.json(resultCadastrado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Erro interno do servidor na criação do resultado',
            });
        }
    }

    async update(req, res) {
        const { id } = req.params;

        const result = await Result.findByPk(id);

        if (!result) {
            return res.status(400).json({ error: 'Resultado não existe. ' });
        }

        await result.update(req.body);

        return res.json(result);
    }

    async searchById(req, res) {
        const { id } = req.params;

        const result = await Result.findByPk(id);

        if (!result) {
            return res.status(400).json({ error: 'Resultado não existe. ' });
        }

        return res.json(result);
    }

    async delete(req, res) {
        const { id } = req.params;

        const result = await Result.findByPk(id);

        if (!result) {
            return res.status(400).json({ error: 'Resultado não existe. ' });
        }

        await result.destroy();
        return res.status(200).send();
    }
}

export default new ResultController();
