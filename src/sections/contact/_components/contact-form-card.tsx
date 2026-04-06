import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormActions } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import {
	type ContactFormValues,
	contactSchema,
} from "@/sections/contact/_constants/contact-schema";

type ContactErrors = Partial<Record<keyof ContactFormValues, string>>;

export default function ContactFormCard() {
	const [errors, setErrors] = useState<ContactErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);
		const values: ContactFormValues = {
			firstName: formData.get("firstName")?.toString().trim() ?? "",
			lastName: formData.get("lastName")?.toString().trim() ?? "",
			email: formData.get("email")?.toString().trim() ?? "",
			subject: formData.get("subject")?.toString().trim() ?? "",
			message: formData.get("message")?.toString().trim() ?? "",
		};

		const parsed = contactSchema.safeParse(values);

		if (!parsed.success) {
			const nextErrors: ContactErrors = {};
			for (const issue of parsed.error.issues) {
				const field = issue.path[0];
				if (
					typeof field === "string" &&
					!nextErrors[field as keyof ContactErrors]
				) {
					nextErrors[field as keyof ContactErrors] = issue.message;
				}
			}

			setErrors(nextErrors);
			const firstIssue = parsed.error.issues[0];
			toast.warning({
				title: "Revisa el formulario",
				description: firstIssue?.message ?? "Revisa los campos resaltados.",
			});
			return;
		}

		setIsSubmitting(true);
		setErrors({});

		try {
			// In a real app, you would call an API endpoint here.
			await new Promise((resolve) => setTimeout(resolve, 1000));
			form.reset();
			toast.success({
				title: "Mensaje enviado",
				description: "Gracias. Recibiras respuesta en dos dias habiles.",
			});
		} catch (error) {
			console.error(error);
			toast.error({
				title: "No se pudo enviar",
				description: "Algo salio mal al enviar tu mensaje.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card className="relative w-full max-w-xl z-10">
			<CardContent>
				<Form noValidate onSubmit={handleSubmit} className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<Input
							label="Nombre"
							name="firstName"
							placeholder="Juan"
							required
							errorMessage={errors.firstName}
							wrapperClassName="w-full bg-[color-mix(in_oklch,var(--color-background)_60%,var(--color-card)_40%)]"
							variant={errors.firstName ? "error" : "default"}
						/>
						<Input
							label="Apellido"
							name="lastName"
							placeholder="Perez"
							required
							errorMessage={errors.lastName}
							wrapperClassName="w-full bg-[color-mix(in_oklch,var(--color-background)_60%,var(--color-card)_40%)]"
							variant={errors.lastName ? "error" : "default"}
						/>
					</div>
					<Input
						type="email"
						label="Correo"
						name="email"
						placeholder="tu@correo.com"
						required
						errorMessage={errors.email}
						wrapperClassName="w-full bg-[color-mix(in_oklch,var(--color-background)_60%,var(--color-card)_40%)]"
						variant={errors.email ? "error" : "default"}
					/>
					<Input
						label="Proyecto o empresa"
						name="subject"
						placeholder="Cuentame que estas construyendo"
						errorMessage={errors.subject}
						wrapperClassName="w-full bg-[color-mix(in_oklch,var(--color-background)_60%,var(--color-card)_40%)]"
						variant={errors.subject ? "error" : "default"}
					/>
					<Textarea
						label="En que puedo ayudar?"
						name="message"
						placeholder="Que problema vamos a resolver juntos?"
						rows={5}
						required
						errorMessage={errors.message}
						wrapperClassName="w-full bg-[color-mix(in_oklch,var(--color-background)_60%,var(--color-card)_40%)]"
						variant={errors.message ? "error" : "default"}
					/>
					<FormActions align="right">
						<Button type="submit" size="md" disabled={isSubmitting}>
							{isSubmitting ? "Enviando..." : "Enviar mensaje"}
						</Button>
					</FormActions>
				</Form>
			</CardContent>
		</Card>
	);
}
