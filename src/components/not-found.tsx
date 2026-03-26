import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ShinyBadge } from "@/components/ui/shiny-badge";
import { Background } from "@/sections/hero/_components/background";

export function NotFound() {
	return (
		<section className="relative flex h-svh w-full flex-col items-center justify-center overflow-hidden px-4 py-16 text-center md:px-16">
			<div className="relative z-10 flex max-w-2xl flex-col items-center gap-5">
				<div className="w-fit">
					<ShinyBadge>Se nos perdio</ShinyBadge>
				</div>
				<div className="space-y-3">
					<h1 className="text-4xl font-semibold text-balance text-foreground md:text-5xl">
						Pagina no encontrada
					</h1>
					<p className="text-base text-balance text-foreground/70 md:text-lg">
						No encontramos la pagina que buscabas, pero volver al inicio o ir a
						la seccion de proyectos esta a un clic.
					</p>
				</div>
				<div className="flex flex-wrap items-center justify-center gap-3">
					<Button asChild size="md">
						<Link to="/">Volver al inicio</Link>
					</Button>
					<Button asChild variant="secondary" size="md">
						<Link to="/#works">Ver proyectos</Link>
					</Button>
				</div>
			</div>
			<div className="pointer-events-none absolute inset-0">
				<Background />
			</div>
		</section>
	);
}
