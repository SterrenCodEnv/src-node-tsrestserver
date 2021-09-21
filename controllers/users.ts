import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();
    res.json(users);
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
        res.status(404).json({
            msg: `No existe usuario con id ${id}`
        });
    }
    res.json(user);
}

export const postUser = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const [user, created] = await User.findOrCreate({
            where: { email: body.email }
        });
        if (!created) {
            return res.status(400).json({
                msg: `Ya existe un usuario creado con el email ${body.email}`
            });
        } else {
            res.json(user);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'El usuario no pudo ser creado '
        });
    }
}

export const putUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: `No existe un usuario registrado con el id ${id}`
            });
        } else {
            await user.update(body);
            res.json(user);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'El usuario no pudo ser modificado'
        });
    }
}

export const deleteUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: `No existe un usuario registrado con el id ${id}`
            });
        } else {
            await user.update({status: false});
            res.json({
                msg: `El usuario con ${id} ha sido eliminado`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'El usuario no pudo ser dado de baja'
        });
    }
}

