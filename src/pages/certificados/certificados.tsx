import { Link } from "react-router";
import { EyeLogoIcon } from "@/components/icons/eye-logo-icon";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { MatrixRain } from "@/sections/matrix-rain/matrix-rain";

const CERTIFICATES = [
	{ id: 1, title: "Certificado 1", image: "/placeholder-1.jpg" },
	{ id: 2, title: "Certificado 2", image: "/placeholder-2.jpg" },
	{ id: 3, title: "Certificado 3", image: "/placeholder-1.jpg" },
	{ id: 4, title: "Certificado 4", image: "/placeholder-2.jpg" },
	{ id: 5, title: "Certificado 5", image: "/placeholder-1.jpg" },
	{ id: 6, title: "Certificado 6", image: "/placeholder-2.jpg" },
];

export default function CertificadosPage() {
	return (
		<div className="relative min-h-screen w-full overflow-hidden bg-black">
			<div className="absolute inset-0 z-0">
				<MatrixRain />
			</div>

			<div className="relative z-10 min-h-screen">
				<nav className="fixed top-2 inset-x-0 z-50 flex justify-center px-2 md:px-4">
					<div className="relative flex w-full items-center justify-between rounded-lg py-1.5 px-4 bg-card/75 border border-border backdrop-blur-16">
						<Link
							to="/"
							className="flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors"
						>
							<EyeLogoIcon className="size-4" />
							<span className="text-base font-semibold">Carlos Aguilar</span>
						</Link>

						<Link
							to="/"
							className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
						>
							Volver al inicio
						</Link>
					</div>
				</nav>

				<div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12">
					<h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-3 sm:mb-4 text-white">
						Certificados
					</h1>
					<p className="text-center text-muted-foreground mb-8 sm:mb-12 text-sm sm:text-base">
						Una coleccion de mis certificaciones y logros profesionales
					</p>

					<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
						{CERTIFICATES.map((cert) => (
							<div
								key={cert.id}
								className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-card/50 border border-border cursor-pointer"
							>
								<img
									src={cert.image}
									alt={cert.title}
									className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
									<div className="flex items-center gap-2 text-white text-sm sm:text-base">
										<Icons.ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
										<span>Ver certificado</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
