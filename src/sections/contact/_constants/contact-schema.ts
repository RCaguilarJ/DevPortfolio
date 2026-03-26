import { z } from "zod";

export const contactSchema = z.object({
	firstName: z
		.string()
		.min(2, "Agrega al menos dos caracteres para tu nombre.")
		.max(60, "Es muy largo; acorta tu nombre."),
	lastName: z
		.string()
		.min(2, "Agrega al menos dos caracteres para tu apellido.")
		.max(60, "Es muy largo; acorta tu apellido."),
	email: z.email("Usa un correo valido para poder responderte."),
	subject: z
		.string()
		.min(2, "Agrega una breve pista sobre el proyecto.")
		.max(120, "Manten el asunto breve."),
	message: z
		.string()
		.min(10, "Comparte un poco mas sobre el reto.")
		.max(2_000, "Manten el primer mensaje conciso."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
