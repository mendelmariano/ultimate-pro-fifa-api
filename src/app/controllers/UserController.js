// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';

import { Op } from 'sequelize';
import User from '../models/User';
import Profile from '../models/Profile';

class UserController {
    async index(req, res) {
        const { page, pageSize = 10 } = req.params;

        const offset = (page - 1) * pageSize;

        const users = await User.findAndCountAll({
            include: [
                {
                    model: Profile,
                    as: 'profile',
                    attributes: ['name', 'id'],
                },
            ],
            attributes: [
                'id',
                'name',
                'email',
                'profile_id',
                'createdAt',
                'updatedAt',
            ],
            limit: pageSize,
            offset,
        });

        const totalPages = Math.ceil(users.count / pageSize);

        return res.json({
            currentPage: parseInt(page, 10),
            totalPages,
            totalCount: users.count,
            users: users.rows,
        });
    }

    async indexSearch(req, res) {
        const { page, pageSize = 10, search } = req.body;

        const offset = (page - 1) * pageSize;

        const whereClause = search
            ? {
                  [Op.or]: [
                      { name: { [Op.like]: `%${search}%` } },

                      { email: { [Op.like]: `%${search}%` } },
                  ],
              }
            : {};

        try {
            const users = await User.findAndCountAll({
                include: [
                    {
                        model: Profile,
                        as: 'profile',
                        attributes: ['name'],
                    },
                ],
                attributes: [
                    'id',
                    'name',
                    'email',
                    'profile_id',
                    'createdAt',
                    'updatedAt',
                ],
                where: whereClause, // Aplica a lógica de busca dinâmica
                limit: pageSize,
                offset,
            });

            const totalPages = Math.ceil(users.count / pageSize);

            return res.json({
                currentPage: parseInt(page, 10),
                totalPages,
                totalCount: users.count,
                users: users.rows,
            });
        } catch (error) {
            // Trate qualquer erro que possa ocorrer durante a consulta ao banco de dados.
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            profile_id: Yup.number().required(),
        });

        const userExist = await User.findOne({
            where: { email: req.body.email },
        });

        const profileExist = await Profile.findOne({
            where: { id: req.body.profile_id },
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'falha na validação' });
        }

        if (userExist) {
            return res.status(400).json({ error: 'Usuário já existe. ' });
        }

        if (!profileExist) {
            return res.status(400).json({ error: 'Perfil inválido. ' });
        }

        const { id, name, email, profile_id } = await User.create(req.body);

        return res.json({
            id,
            name,
            email,
            profile_id,
        });
    }

    async searchById(req, res) {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(400).json({ error: 'Usuário não existe. ' });
        }

        return res.json(user);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'falha na validação' });
        }

        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        // Verifica se o email já existe na base de dados
        if (email !== user.email) {
            const userExist = await User.findOne({
                where: { email: req.body.email },
            });

            if (userExist) {
                return res.status(400).json({ error: 'Email já existe. ' });
            }
        }

        // Verifica se a propriedade oldPassword existe na requisição e se ela confere com a senha do usuário

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(400).json({ error: 'Senha incorreta. ' });
        }

        const { id, name } = await user.update(req.body);
        return res.json({
            id,
            name,
            email,
        });
    }

    async updateSomeone(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            password: Yup.string().min(6),
            profile_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'falha na validação' });
        }

        const { email } = req.body;

        const user = await User.findByPk(req.params.id);

        // Verifica se o email já existe na base de dados
        if (email !== user.email) {
            const userExist = await User.findOne({
                where: { email: req.body.email },
            });

            if (userExist) {
                return res.status(400).json({ error: 'Email já existe. ' });
            }
        }

        const { id, name, profile_id } = await user.update(req.body);
        return res.json({
            id,
            name,
            email,
            profile_id,
        });
    }

    async delete(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'Usuário não existe. ' });
        }

        await user.destroy();
        return res.status(200).send();
    }
}

export default new UserController();
