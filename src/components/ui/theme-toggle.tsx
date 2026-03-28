import { useTheme } from "@/components/layout/theme-provider";
import { cn } from "@/lib/utils";

const DAY_SKY =
	"linear-gradient(180deg, rgba(145,212,255,1) 0%, rgba(82,180,255,1) 52%, rgba(214,238,255,1) 100%)";

const NIGHT_SKY =
	"linear-gradient(180deg, rgba(12,22,49,1) 0%, rgba(24,36,70,1) 56%, rgba(54,64,96,1) 100%)";

const STARS = [
	{ top: "26%", left: "20%", size: "0.22rem" },
	{ top: "34%", left: "36%", size: "0.14rem" },
	{ top: "22%", left: "56%", size: "0.18rem" },
	{ top: "48%", left: "62%", size: "0.24rem" },
	{ top: "40%", left: "74%", size: "0.16rem" },
	{ top: "58%", left: "28%", size: "0.18rem" },
];

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const isDark = theme === "dark";

	return (
		<button
			type="button"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
			aria-pressed={isDark}
			className={cn(
				"group relative isolate flex h-11 w-20 shrink-0 items-center overflow-hidden rounded-full border p-1",
				"transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
				"shadow-[inset_0_1px_1px_rgba(255,255,255,0.62),inset_0_-1px_2px_rgba(15,23,42,0.18),0_10px_24px_-18px_rgba(15,23,42,0.55)]",
				isDark ? "border-slate-400/35" : "border-sky-200/90",
			)}
		>
			<span className="sr-only">
				{isDark ? "Activar tema claro" : "Activar tema oscuro"}
			</span>

			<span
				className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
				aria-hidden="true"
			>
				<span
					className={cn(
						"absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
						isDark ? "opacity-0" : "opacity-100",
					)}
					style={{ backgroundImage: DAY_SKY }}
				/>
				<span
					className={cn(
						"absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
						isDark ? "opacity-100" : "opacity-0",
					)}
					style={{ backgroundImage: NIGHT_SKY }}
				/>

				<span
					className={cn(
						"absolute inset-y-[18%] right-[14%] w-[34%] rounded-full bg-white/10 blur-sm transition-opacity duration-500 motion-reduce:transition-none",
						isDark ? "opacity-100" : "opacity-0",
					)}
				/>

				{STARS.map((star, index) => (
					<span
						key={`theme-star-${star.top}-${star.left}-${index}`}
						className={cn(
							"absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)] transition-opacity duration-500 motion-reduce:transition-none",
							isDark ? "opacity-100" : "opacity-0",
						)}
						style={{
							top: star.top,
							left: star.left,
							width: star.size,
							height: star.size,
						}}
					/>
				))}

				<span
					className={cn(
						"absolute -bottom-3 left-7 h-8 w-8 rounded-full bg-white/85 blur-[0.5px] transition-all duration-500 motion-reduce:transition-none",
						isDark ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100",
					)}
				/>
				<span
					className={cn(
						"absolute -bottom-4 left-12 h-10 w-10 rounded-full bg-white/80 blur-[0.5px] transition-all duration-500 motion-reduce:transition-none",
						isDark ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100",
					)}
				/>
				<span
					className={cn(
						"absolute -bottom-3 left-2 h-7 w-7 rounded-full bg-white/90 blur-[0.5px] transition-all duration-500 motion-reduce:transition-none",
						isDark ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100",
					)}
				/>
				<span
					className={cn(
						"absolute bottom-0 left-0 h-4 w-full bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.72)_100%)] transition-all duration-500 motion-reduce:transition-none",
						isDark ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100",
					)}
				/>
			</span>

			<span
				className={cn(
					"relative z-10 flex size-8 items-center justify-center rounded-full border transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
					isDark
						? "translate-x-10 border-slate-300/70"
						: "translate-x-0 border-amber-200/80",
				)}
				aria-hidden="true"
			>
				<span
					className={cn(
						"absolute inset-0 rounded-full transition-all duration-500 motion-reduce:transition-none",
						isDark
							? "bg-[radial-gradient(circle_at_32%_30%,#f8fbff_0%,#e7edf8_58%,#c9d3e4_100%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_10px_rgba(6,12,30,0.35)]"
							: "bg-[radial-gradient(circle_at_35%_30%,#fff8bf_0%,#ffd24f_50%,#ffae00_100%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_4px_10px_rgba(255,179,0,0.48)]",
					)}
				/>
				<span
					className={cn(
						"absolute -inset-1 rounded-full blur-md transition-opacity duration-500 motion-reduce:transition-none",
						isDark ? "bg-transparent opacity-0" : "bg-amber-300/70 opacity-60",
					)}
				/>

				<span
					className={cn(
						"absolute left-2 top-2 h-2 w-2 rounded-full bg-slate-400/35 transition-opacity duration-500 motion-reduce:transition-none",
						isDark ? "opacity-100" : "opacity-0",
					)}
				/>
				<span
					className={cn(
						"absolute right-1.5 top-[0.42rem] h-1.5 w-1.5 rounded-full bg-slate-400/30 transition-opacity duration-500 motion-reduce:transition-none",
						isDark ? "opacity-100" : "opacity-0",
					)}
				/>
				<span
					className={cn(
						"absolute bottom-1.5 right-2 h-2.5 w-2.5 rounded-full bg-slate-500/22 transition-opacity duration-500 motion-reduce:transition-none",
						isDark ? "opacity-100" : "opacity-0",
					)}
				/>
			</span>
		</button>
	);
}
