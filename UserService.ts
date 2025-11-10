import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/data-source.js';
import User from '../models/User.js';

interface CreateUserInput {
	name: string;
	email: string;
	password: string;
}
type CreateUserOutput = Omit<CreateUserInput, 'password'> & {
	id: string;
	createdAt: Date;
};

interface DeleteUserInput {
	id: string;
}

export default class UserService {
	private repo() {
		return AppDataSource.getRepository(User);
	}

	async createUser({
		email,
		name,
		password,
	}: CreateUserInput): Promise<CreateUserOutput> {
		const repository = this.repo();

		const existing = await repository.findOneBy({ email });

		if (existing) throw new Error('Email is already in use!');

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

	async deleteUser({ id }: DeleteUserInput): Promise<void> {
		const repository = this.repo();

		const existing = await repository.findOneBy({ id });

		if (!existing) throw new Error('User not found!');

		await repository.remove(existing);
	}
}
