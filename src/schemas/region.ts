import { z } from 'zod';

export const RegionSchema = z.enum(['in', 'us', 'eu']);

export type Region = z.infer<typeof RegionSchema>;
