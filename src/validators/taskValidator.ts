import { z } from "zod"

export const createTaskSchema = z.object({
  name: z.string().min(3, "El usuario debe tener al menos 3 caracteres").max(10, "Debe tener como máximo 10 caracteres"),
  description: z.string().min(1, "La descripción debe tener al menos 3 caracteres").max(100, "Debe tener como máximo 10 caracteres"),
  complete: z.boolean().optional(),
 });

export const updateTaskSchema = z.object({
  name: z.string().min(3, "El usuario debe tener al menos 3 caracteres").max(10, "Debe tener como máximo 10 caracteres"),
  description: z.string().min(1, "La descripción debe tener al menos 3 caracteres").max(100, "Debe tener como máximo 10 caracteres"),
  complete: z.boolean().optional(),
}).refine(
  data => Object.keys(data).length > 0,
  { message: "Debe enviar al menos un campo para actualizar" }
);