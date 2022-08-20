import {DataSource} from 'typeorm';

require('dotenv').config({
    path: '.env'
});
console.log('driver ', process.env.DB_DRIVER);

const dataSource = new DataSource({
    type: process.env.DB_DRIVER as any,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    migrationsRun: process.env.DB_MIGRATE === 'true',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: false,
    migrations: ['dist/migrations/*.js']
});
export default dataSource;
