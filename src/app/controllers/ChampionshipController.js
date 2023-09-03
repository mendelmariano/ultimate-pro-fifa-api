// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';
import Championship from '../models/Championship';

class ChampionshipController {
    async index(req, res) {
        const championships = await Championship.findAll();

        return res.json(championships);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'falha na validação' });
        }

        const { name } = req.body;

        const championships = await Championship.create({ name });

        return res.json(championships);
    }

    async update(req, res) {
        const { id } = req.params;

        const championship = await Championship.findByPk(id);

        if (!championship) {
            return res.status(400).json({ error: 'Time não existe. ' });
        }

        await championship.update(req.body);

        return res.json(championship);
    }

    async searchById(req, res) {
        const { id } = req.params;

        const championship = await Championship.findByPk(id);

        if (!championship) {
            return res.status(400).json({ error: 'Time não existe. ' });
        }

        return res.json(championship);
    }

    async delete(req, res) {
        const { id } = req.params;

        const championship = await Championship.findByPk(id);

        if (!championship) {
            return res.status(400).json({ error: 'Tarefa não existe. ' });
        }

        await championship.destroy();
        return res.status(200).send();
    }
}

export default new ChampionshipController();
