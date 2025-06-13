import * as z from 'zod';

export const signupSchema = z.object({
    email: z.string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),

    password: z.string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(64, { message: 'Password must be at most 64 characters long' }),

  passwordConfirmation: z
  .string()
  .min(8, { message: 'Password confirmation must be at least 8 characters long' })
    .max(64, { message: 'Password confirmation must be at most 64 characters long' })
})

.refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });