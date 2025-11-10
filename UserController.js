import UserService from '../services/UserService.js';
const userService = new UserService();
export default class UserController {
    static async create(req, res) {
        try {
            const { name, email, password } = req.body;
            if (typeof name !== 'string' ||
                typeof email !== 'string' ||
                typeof password !== 'string')
                throw new Error('Missing user information.');
            const user = await userService.createUser({ name, email, password });
            return res.status(201).json(user);
        }
        catch (err) {
            if (err instanceof Error)
                return res.status(400).json({ error: err.message });
            return res.status(500).json({ error: 'An unknown error has occurred!' });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            if (typeof id !== 'string')
                throw new Error('Missing user information.');
            await userService.deleteUser({ id });
            return res.status(204).json();
        }
        catch (err) {
            if (err instanceof Error)
                return res.status(404).json({ error: err.message });
            return res.status(500).json({ error: 'An unknown error has occurred!' });
        }
    }
}
