"use client";

import { DownloadIcon, FileTextIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Icons } from "@/lib/icons";

export default function Resume() {
	return (
		<Section
			id="resume"
			title="CV listo para revisar en un clic"
			description="Lo coloqué justo después de la portada para que sea visible desde el primer scroll. Puedes previsualizarlo aquí, abrirlo en otra pestaña o descargarlo."
			badgeText="Curriculum destacado"
			badgeIcon={<FileTextIcon aria-hidden="true" className="size-3.5" />}
			className="grid gap-5 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.15fr)]"
		>
			<div className="flex h-full flex-col justify-between rounded-[1.75rem] border border-border/80 bg-[linear-gradient(180deg,rgba(15,23,32,0.98)_0%,rgba(9,14,21,0.98)_100%)] p-5 shadow-[0_24px_80px_-36px_rgba(0,0,0,0.85)] card-highlight sm:p-6">
				<div>
					<Badge
						variant="success"
						size="lg"
						className="border-[#D9FF6B]/30 bg-[#D9FF6B]/10 text-[#D9FF6B]"
					>
						Disponible ahora
					</Badge>

					<h3 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
						Perfil profesional de {siteConfig.name}
					</h3>
					<p className="mt-3 text-sm leading-relaxed text-white/68 sm:text-base">
						Esta sección mantiene el documento dentro del flujo del portfolio en
						lugar de esconderlo en un botón secundario. La intención es que
						quien entre al sitio vea tu trabajo, y enseguida tenga acceso al
						resumen profesional completo.
					</p>
				</div>

				<div className="mt-6 grid gap-3 text-sm text-white/70 sm:grid-cols-2 lg:grid-cols-1">
					<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
						<p className="text-[11px] uppercase tracking-[0.18em] text-white/40">
							Formato
						</p>
						<p className="mt-2 font-medium text-white">
							PDF optimizado para lectura y descarga
						</p>
					</div>
					<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
						<p className="text-[11px] uppercase tracking-[0.18em] text-white/40">
							Uso ideal
						</p>
						<p className="mt-2 font-medium text-white">
							Reclutadores, clientes y contactos directos
						</p>
					</div>
				</div>

				<div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
					<a
						href={siteConfig.resumeUrl}
						target="_blank"
						rel="noreferrer"
						className="inline-flex"
					>
						<Button
							variant="default"
							size="lg"
							className="w-full rounded-full bg-[linear-gradient(135deg,#D9FF6B_0%,#B6F036_100%)] text-slate-950 hover:brightness-95 sm:w-auto"
						>
							Abrir CV
							<Icons.ArrowRight className="size-4" />
						</Button>
					</a>
					<a href={siteConfig.resumeUrl} download className="inline-flex">
						<Button
							variant="secondary"
							size="lg"
							className="w-full rounded-full border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08] sm:w-auto"
						>
							Descargar PDF
							<DownloadIcon className="size-4" />
						</Button>
					</a>
				</div>
			</div>

			<div className="overflow-hidden rounded-[1.75rem] border border-border/80 bg-[linear-gradient(180deg,rgba(17,22,30,0.98)_0%,rgba(10,14,20,0.98)_100%)] p-3 shadow-[0_24px_80px_-36px_rgba(0,0,0,0.85)] card-highlight sm:p-4">
				<div className="rounded-[1.35rem] border border-white/10 bg-neutral-950">
					<div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
						<div className="flex items-center gap-2">
							<span className="size-2.5 rounded-full bg-rose-400" />
							<span className="size-2.5 rounded-full bg-amber-300" />
							<span className="size-2.5 rounded-full bg-emerald-400" />
						</div>
						<p className="text-[11px] uppercase tracking-[0.2em] text-white/42">
							Vista previa
						</p>
					</div>

					<div className="bg-white p-2 sm:p-3">
						<iframe
							src={`${siteConfig.resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
							title="Vista previa del curriculum vitae"
							className="h-[58vh] w-full rounded-[1rem] border border-slate-200 bg-white sm:h-[70vh] lg:h-[76vh]"
						/>
					</div>
				</div>
			</div>
		</Section>
	);
}
