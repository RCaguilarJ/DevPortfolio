"use client";

import { useEffect, useState } from "react";
import { Icons } from "@/lib/icons";
import { MatrixRain } from "@/sections/matrix-rain/matrix-rain";
import { works } from "@/sections/works/_constants/works";

export default function TodosProyectosPage() {
	const [selectedProject, setSelectedProject] = useState<
		(typeof works)[0] | null
	>(null);

	useEffect(() => {
		if (!selectedProject) {
			return;
		}

		const htmlOverflow = document.documentElement.style.overflow;
		const bodyOverflow = document.body.style.overflow;

		document.documentElement.style.overflow = "hidden";
		document.body.style.overflow = "hidden";

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setSelectedProject(null);
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.documentElement.style.overflow = htmlOverflow;
			document.body.style.overflow = bodyOverflow;
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [selectedProject]);

	return (
		<div className="relative min-h-screen w-full overflow-x-hidden bg-black">
			<div className="absolute inset-0 z-0">
				<MatrixRain />
			</div>

			<div className="relative z-10 min-h-screen">
				<div className="container mx-auto px-4 pt-20 pb-12 sm:px-6 sm:pt-24 lg:px-8 lg:pb-16">
					<div className="grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
						{works.map((project) => (
							<button
								key={project.title}
								type="button"
								className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:aspect-[4/3]"
								onClick={() => setSelectedProject(project)}
							>
								<img
									src={project.image}
									alt={project.title}
									className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/34 to-transparent" />
								<div className="absolute inset-x-0 top-0 flex justify-end p-3">
									<span className="rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
										Preview
									</span>
								</div>
								<div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
									<div className="flex items-center gap-2 text-sm text-white sm:text-base">
										<Icons.ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
										<span>Ver proyecto</span>
									</div>
								</div>
								<div className="absolute inset-x-0 bottom-0 p-4">
									<h3 className="truncate text-base font-semibold text-white sm:text-lg">
										{project.title}
									</h3>
									<p className="mt-1 line-clamp-2 text-sm text-white/68">
										{project.description}
									</p>
								</div>
							</button>
						))}
					</div>
				</div>
			</div>

			{selectedProject && (
				<div
					className="fixed inset-0 z-50 flex items-end overflow-y-auto bg-black/85 px-3 py-3 backdrop-blur-md sm:items-center sm:px-6 sm:py-8"
					onClick={() => setSelectedProject(null)}
					onKeyDown={(event) => {
						if (event.key === "Escape") {
							setSelectedProject(null);
						}
					}}
					role="dialog"
					aria-modal="true"
					aria-labelledby="project-title"
					tabIndex={-1}
				>
					<article
						className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-950/95 shadow-[0_32px_120px_-36px_rgba(0,0,0,1)] lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]"
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => e.stopPropagation()}
					>
						<button
							type="button"
							className="absolute top-3 right-3 z-10 rounded-full border border-white/10 bg-black/55 p-2 text-white transition-colors hover:bg-black/80 sm:top-4 sm:right-4"
							onClick={() => setSelectedProject(null)}
							aria-label="Cerrar modal"
						>
							<Icons.X className="w-6 h-6" />
						</button>

						<div className="relative min-h-[240px] bg-black lg:min-h-full">
							<img
								src={selectedProject.image}
								alt={selectedProject.title}
								className="h-full max-h-[42vh] w-full object-cover sm:max-h-[52vh] lg:max-h-none"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
						</div>

						<div className="flex flex-col justify-between p-5 sm:p-7 lg:p-8">
							<div>
								<span className="inline-flex rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300">
									Proyecto seleccionado
								</span>
								<h2
									id="project-title"
									className="mt-4 text-2xl font-bold text-white sm:text-3xl"
								>
									{selectedProject.title}
								</h2>
								<p className="mt-3 text-sm leading-relaxed text-white/72 sm:text-base">
									{selectedProject.description}
								</p>
							</div>
							{selectedProject.link && (
								<a
									href={selectedProject.link}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D9FF6B] px-5 py-3 text-sm font-semibold text-slate-950 transition-[transform,filter] duration-200 hover:brightness-95 sm:w-fit"
								>
									Visitar proyecto
									<Icons.ArrowRight className="w-4 h-4" />
								</a>
							)}
						</div>
					</article>
				</div>
			)}
		</div>
	);
}
