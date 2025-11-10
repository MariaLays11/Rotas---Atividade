import { DataSource } from 'typeorm';
import User from '../models/User.js';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST ?? '0.0.0.0',
	port: parseInt(process.env.DB_PORT ?? '5432', 10),
	username: process.env.DB_USER ?? 'docker',
	password: process.env.DB_PASS ?? 'docker',
	database: process.env.DB_NAME ?? 'intro_api',

	synchronize: true,
	logging: false,

	entities: [User],
	migrations: [],
	subscribers: [],
});
