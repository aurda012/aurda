import { z } from 'zod';

export const CreateBoardValidator = z.object({
  name: z.string().min(1),
});

export type CreateBoardSchema = z.infer<typeof CreateBoardValidator>;
