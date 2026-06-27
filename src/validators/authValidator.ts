import { z } from "zod";

export const validatorRegisterSchema = z.object({
  username: z.string().min(3, "El usuario debe tener al menos 3 caracteres").max(10, "Debe tener como máximo 10 caracteres"),
  email: z.email("Email inválido"),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,"La contraseña debe tener entre 8 y 20 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
    ),
});

export const validatorLoginSchema = z.object({

    email: z.email("Email inválido"),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
    "La contraseña debe tener entre 8 y 20 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
  )

});

export type RegisterInput = z.infer<typeof validatorRegisterSchema>;

export type LoginInput = z.infer<typeof validatorLoginSchema>;