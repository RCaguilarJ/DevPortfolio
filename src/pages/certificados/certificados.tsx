import { Icons } from "@/lib/icons";
import { MatrixRain } from "@/sections/matrix-rain/matrix-rain";

const CERTIFICATES = [
	{ id: 1, title: "Certificado 1", image: "/certificados/1.jpg" },
	{ id: 2, title: "Certificado 2", image: "/certificados/2.jpg" },
	{ id: 3, title: "Certificado 3", image: "/certificados/3.jpg" },
	{ id: 4, title: "Certificado 4", image: "/certificados/4.jpg" },
	{ id: 5, title: "Certificado 5", image: "/certificados/5.jpg" },
	{ id: 6, title: "Certificado 6", image: "/certificados/6.jpg" },
	{ id: 7, title: "Certificado 7", image: "/certificados/7.jpg" },
	{ id: 8, title: "Animaciones", image: "/certificados/animaciones.jpg" },
	{ id: 9, title: "BJS", image: "/certificados/bjs.jpg" },
	{ id: 10, title: "Git y GitHub", image: "/certificados/gitYgithub.jpg" },
	{ id: 11, title: "HTML y CSS", image: "/certificados/htmlcss.jpg" },
	{ id: 12, title: "JavaScript", image: "/certificados/jsp.jpg" },
	{ id: 13, title: "React", image: "/certificados/react.jpg" },
	{
		id: 14,
		title: "Desarrollo con IA",
		image: "/certificados/desarrollo-con-ia.jpeg",
	},
];

export default function CertificadosPage() {
	return (
		<div className="relative min-h-screen w-full overflow-hidden bg-black">
			<div className="absolute inset-0 z-0">
				<MatrixRain />
			</div>

			<div className="relative z-10 min-h-screen">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12">
					<h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-3 sm:mb-4 text-white">
						Certificados
					</h1>
					<p className="text-center text-muted-foreground mb-8 sm:mb-12 text-sm sm:text-base">
						Una coleccion de mis certificaciones y logros profesionales
					</p>
					<p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.28em] text-white/60 sm:mb-10">
						{CERTIFICATES.length} certificados disponibles
					</p>

					<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
						{CERTIFICATES.map((cert) => (
							<a
								key={cert.id}
								href={cert.image}
								target="_blank"
								rel="noreferrer"
								className="group relative flex aspect-[4/3] flex-col overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.85)] transition-transform duration-300 hover:-translate-y-1"
							>
								<img
									src={cert.image}
									alt={cert.title}
									className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
									loading="lazy"
								/>

								<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/5 to-black/75" />

								<div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3 sm:p-4">
									<h2 className="line-clamp-1 text-sm font-semibold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] sm:text-base">
										{cert.title}
									</h2>
									<span className="shrink-0 rounded-full border border-white/25 bg-black/35 px-2 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
										JPG
									</span>
								</div>

								<div className="pointer-events-none absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-between rounded-lg border border-white/15 bg-black/55 px-3 py-2 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
									<span className="text-sm font-medium">Abrir certificado</span>
									<Icons.ChevronRight className="h-4 w-4" />
								</div>
							</a>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
