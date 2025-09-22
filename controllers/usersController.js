import { getUser, getUserById, updateUser, deleteUser } from "../utils/db";

export const teste = async (req, res) => {
    res.send('Deu bom');
}

export const mostrarUser = async (req, res) => {
    try {
        const users = getUser();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const mostrarUserPorId = async (req, res) => {
    try {
        const user = getUserById(req.params.id);
        if(!user) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }
        res.status(200).json(user);   
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const atualizarUser = async (req, res) => {
    try {
        const user = getUserById(req.params.id);
        if(!user) {
            return res.status(404).send({ error: 'Aluno não encontrado' });
        }

        const userAtualizado = updateUser(req.params.id, req.body);
        res.status(200).json(userAtualizado);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const deletarUser = async (req, res) => {
    try {
        const user = getUserById(req.params.id);
        if(!user) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }
        deleteUser(req.params.id);
        res.status(200).send({ message: 'User deletado com sucesso' });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}