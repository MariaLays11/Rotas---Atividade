import 'reflect-metadata';
import 'dotenv/config';
import { AppDataSource } from './config/data-source.js';
import server from './config/server.js';
import { Router } from 'express'

const PORT = parseInt(process.env.PORT ?? '3000', 10);

AppDataSource.initialize()
  .then(() => {
    console.log('Data source initialized!');

    server.listen(PORT, () =>
      console.log(`Server listening at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
    process.exit(1);
  });
