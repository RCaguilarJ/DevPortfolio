"use client";

import { useState } from "react";
import { Icons } from "@/lib/icons";
import { MatrixRain } from "@/sections/matrix-rain/matrix-rain";
import { works } from "@/sections/works/_constants/works";

export default function TodosProyectosPage() {
	const [selectedProject, setSelectedProject] = useState<
		(typeof works)[0] | null
	>(null);

	return (
		<div className="relative min-h-screen w-full overflow-hidden bg-black">
			<div className="absolute inset-0 z-0">
				<MatrixRain />
			</div>

			<div className="relative z-10 min-h-screen">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12">
					<h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-3 sm:mb-4 text-white">
						Todos los Proyectos
					</h1>
					<p className="text-center text-muted-foreground mb-8 sm:mb-12 text-sm sm:text-base">
						Una coleccion completa de mis trabajos y proyectos
					</p>

					<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
						{works.map((project) => (
							<button
								key={project.title}
								type="button"
								className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-card/50 border border-border cursor-pointer text-left"
								onClick={() => setSelectedProject(project)}
							>
								<img
									src={project.image}
									alt={project.title}
									className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
									<div className="flex items-center gap-2 text-white text-sm sm:text-base">
										<Icons.ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
										<span>Ver proyecto</span>
									</div>
								</div>
								<div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
									<h3 className="text-white text-sm font-medium truncate">
										{project.title}
									</h3>
								</div>
							</button>
						))}
					</div>
				</div>
			</div>

			{selectedProject && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
					onClick={() => setSelectedProject(null)}
					onKeyDown={(e) => e.key === "Escape" && setSelectedProject(null)}
					role="dialog"
					aria-modal="true"
					aria-labelledby="project-title"
					tabIndex={-1}
				>
					<article
						className="relative max-w-4xl w-full mx-4 bg-card rounded-lg overflow-hidden shadow-2xl"
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => e.stopPropagation()}
					>
						<button
							type="button"
							className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
							onClick={() => setSelectedProject(null)}
							aria-label="Cerrar modal"
						>
							<Icons.X className="w-6 h-6" />
						</button>
						<img
							src={selectedProject.image}
							alt={selectedProject.title}
							className="w-full aspect-video object-cover"
						/>
						<div className="p-6">
							<h2
								id="project-title"
								className="text-2xl font-bold text-foreground mb-2"
							>
								{selectedProject.title}
							</h2>
							<p className="text-muted-foreground">
								{selectedProject.description}
							</p>
							{selectedProject.link && (
								<a
									href={selectedProject.link}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
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
