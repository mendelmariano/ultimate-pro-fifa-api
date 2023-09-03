// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';
import Team from '../models/Team';

class TeamController {
    async index(req, res) {
        const teams = await Team.findAll();

        return res.json(teams);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            team: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'falha na validação' });
        }

        const { team } = req.body;

        const teams = await Team.create({
            user_id: req.userId,
            team,
        });

        return res.json(teams);
    }

    async update(req, res) {
        const { id } = req.params;

        const team = await Team.findByPk(id);

        if (!team) {
            return res.status(400).json({ error: 'Time não existe. ' });
        }

        await team.update(req.body);

        return res.json(team);
    }

    async searchById(req, res) {
        const { id } = req.params;

        const team = await Team.findByPk(id);

        if (!team) {
            return res.status(400).json({ error: 'Time não existe. ' });
        }

        return res.json(team);
    }

    async delete(req, res) {
        const { id } = req.params;

        const team = await Team.findByPk(id);

        if (!team) {
            return res.status(400).json({ error: 'Tarefa não existe. ' });
        }

        await team.destroy();
        return res.status(200).send();
    }
}

export default new TeamController();
