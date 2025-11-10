import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/data-source.js';
import User from '../models/User.js';
export default class UserService {
    repo() {
        return AppDataSource.getRepository(User);
    }
    async createUser({ email, name, password, }) {
        const repository = this.repo();
        const existing = await repository.findOneBy({ email });
        if (existing)
            throw new Error('Email is already in use!');
        const hashed = await bcrypt.hash(password, 10);
        const user = repository.create({
            name,
            email,
            password: hashed,
        });
        await repository.save(user);
        const { password: _password, ...safeUser } = user;
        return safeUser;
    }
    async deleteUser({ id }) {
        const repository = this.repo();
        const existing = await repository.findOneBy({ id });
        if (!existing)
            throw new Error('User not found!');
        await repository.remove(existing);
    }
}
