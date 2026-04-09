"use client";

import { DownloadIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Icons } from "@/lib/icons";

export default function Resume() {
	return (
		<Section id="resume" className="max-w-4xl mx-auto">
			<div className="overflow-hidden rounded-[1.75rem] border border-border/80 bg-[linear-gradient(180deg,rgba(17,22,30,0.98)_0%,rgba(10,14,20,0.98)_100%)] shadow-[0_24px_80px_-36px_rgba(0,0,0,0.85)] card-highlight">
				<div className="rounded-[1.35rem] border border-white/10 bg-neutral-950 m-3 sm:m-4">
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
							className="h-[50vh] sm:h-[60vh] lg:h-[70vh] w-full rounded-[1rem] border border-slate-200 bg-white"
						/>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row items-center justify-center gap-3 p-5 sm:p-6 border-t border-white/5">
					<a
						href={siteConfig.resumeUrl}
						target="_blank"
						rel="noreferrer"
						className="w-full sm:w-auto"
					>
						<Button
							variant="default"
							size="lg"
							className="w-full sm:w-auto rounded-full bg-[linear-gradient(135deg,#D9FF6B_0%,#B6F036_100%)] text-slate-950 hover:brightness-95"
						>
							Abrir CV
							<Icons.ArrowRight className="size-4" />
						</Button>
					</a>
					<a href={siteConfig.resumeUrl} download className="w-full sm:w-auto">
						<Button
							variant="secondary"
							size="lg"
							className="w-full sm:w-auto rounded-full border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08]"
						>
							Descargar PDF
							<DownloadIcon className="size-4" />
						</Button>
					</a>
				</div>
			</div>
		</Section>
	);
}
