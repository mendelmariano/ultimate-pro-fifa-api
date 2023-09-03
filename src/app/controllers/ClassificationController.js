// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';
import Classification from '../models/Classification';
import Team from '../models/Team';

class ClassificationController {
    async index(req, res) {
        const classifications = await Classification.findAll();

        return res.json(classifications);
    }

    async classificationForChamp(req, res) {
        const { championship_id } = req.params;
        const classifications = await Classification.findAll({
            where: { championship_id },
            include: [{ model: Team, attributes: ['team'] }],
        });

        return res.json(classifications);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            championship_id: Yup.number().required(),
            team_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'falha na validação' });
        }

        const existingTeams = await Classification.findOne({
            where: {
                championship_id: req.body.championship_id,
                team_id: req.body.team_id,
            },
        });

        if (existingTeams) {
            return res
                .status(400)
                .json({ error: 'Time já cadastrado neste campeonato. ' });
        }

        const team_championship = await Classification.create(req.body);
        return res.status(200).json(team_championship);
    }

    async update(req, res) {
        const { id } = req.params;

        const team = await Classification.findByPk(id);

        if (!team) {
            return res.status(400).json({ error: 'Time não existe. ' });
        }

        await team.update(req.body);

        return res.json(team);
    }

    async searchById(req, res) {
        const { id } = req.params;

        const classification = await Classification.findByPk(id);

        if (!classification) {
            return res
                .status(400)
                .json({ error: 'Classification não existe. ' });
        }

        return res.json(classification);
    }

    async delete(req, res) {
        const { id } = req.params;

        const classification = await Classification.findByPk(id);

        if (!classification) {
            return res.status(400).json({ error: 'Tarefa não existe. ' });
        }

        await classification.destroy();
        return res.status(200).send();
    }
}

export default new ClassificationController();
