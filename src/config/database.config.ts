import { registerAs } from '@nestjs/config';
import { z } from 'zod';
import * as dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  DB_HOST: z.string().min(1),
  DB_PORT: z.string().min(1).default('5432'),
  DB_USERNAME: z.string().min(1).default('postgres'),
  DB_PASSWORD: z.string().min(1).default('password'),
  DB_DATABASE: z.string().min(1).default('mydatabase'),
});

const env = envSchema.parse(process.env);

export default registerAs('database', () => ({
  type: 'postgres',
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT, 10),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  synchronize: true,
  autoLoadEntities: true,
}));
