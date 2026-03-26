import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Section,
	Text,
} from "@react-email/components";
import { render } from "@react-email/render";
import type { ContactFormValues } from "@/sections/contact/_constants/contact-schema";

type ContactMessageEmailProps = {
	data: ContactFormValues;
};

const styles = {
	body: {
		fontFamily:
			"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',sans-serif",
		backgroundColor: "#f7fafc",
		color: "#0f172a",
	},
	container: {
		backgroundColor: "#ffffff",
		borderRadius: "16px",
		border: "1px solid #e2e8f0",
		padding: "32px",
		margin: "24px auto",
		width: "100%",
		maxWidth: "640px",
		boxShadow: "0 10px 20px rgba(15, 23, 42, 0.08)",
	},
	tableCellLabel: {
		fontWeight: 600,
		fontSize: "14px",
		padding: "8px 0",
		color: "#1f2937",
		width: "140px",
	},
	tableCellValue: {
		fontSize: "14px",
		padding: "8px 0",
		color: "#334155",
	},
	divider: {
		borderBottom: "1px solid #e2e8f0",
		margin: "16px 0",
	},
} as const;

export function ContactMessageEmail({ data }: ContactMessageEmailProps) {
	const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");

	return (
		<Html>
			<Head />
			<Preview>Nueva consulta de contacto de {fullName || "tu sitio"}.</Preview>
			<Body style={styles.body}>
				<Container style={styles.container}>
					<Heading as="h2">
						Nueva consulta de {fullName || "tu portafolio"}
					</Heading>
					<Text style={{ color: "#475569", fontSize: "15px" }}>
						Tienes una nueva solicitud desde el formulario de contacto de tu
						portafolio. Aqui estan los detalles:
					</Text>
					<Section style={styles.divider} />
					<table
						width="100%"
						cellPadding={0}
						cellSpacing={0}
						style={{ borderCollapse: "collapse" }}
					>
						<tbody>
							<tr>
								<td style={styles.tableCellLabel}>Nombre</td>
								<td style={styles.tableCellValue}>{fullName}</td>
							</tr>
							<tr>
								<td style={styles.tableCellLabel}>Correo</td>
								<td style={styles.tableCellValue}>{data.email}</td>
							</tr>
							<tr>
								<td style={styles.tableCellLabel}>Asunto</td>
								<td style={styles.tableCellValue}>{data.subject}</td>
							</tr>
						</tbody>
					</table>
					<Section style={styles.divider} />
					<Heading as="h3" style={{ fontSize: "16px", marginBottom: "8px" }}>
						Mensaje
					</Heading>
					<Text
						style={{
							backgroundColor: "#f8fafc",
							border: "1px solid #e2e8f0",
							borderRadius: "12px",
							padding: "16px",
							fontSize: "14px",
							lineHeight: "20px",
							color: "#0f172a",
						}}
					>
						{data.message}
					</Text>
				</Container>
			</Body>
		</Html>
	);
}

export const renderContactMessageEmail = async (data: ContactFormValues) => {
	const email = <ContactMessageEmail data={data} />;
	const html = await render(email);
	const text = await render(email, { plainText: true });
	return { html, text };
};
