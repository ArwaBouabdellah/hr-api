import { registerAs } from '@nestjs/config';
import { z } from 'zod';
import * as dotenv from 'dotenv';

dotenv.config();

const serverSchema = z.object({
  PORT: z.string().min(1).default('3000'),
});

const serverEnv = serverSchema.parse(process.env);

export default registerAs('server', () => ({
  port: parseInt(serverEnv.PORT, 10),
}));
