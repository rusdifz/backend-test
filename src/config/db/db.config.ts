import { DbConfigInterface } from './db.interface';

import { UsersEntity } from 'src/modules/users/entities/users.entity';

export const dbConfig = (): DbConfigInterface => ({
  db: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize:
      process.env.NODE_ENV.toLowerCase() !== 'production' ? true : false, // disabled for auto migration syncronize
    logging: false,
    entities: [UsersEntity],
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
