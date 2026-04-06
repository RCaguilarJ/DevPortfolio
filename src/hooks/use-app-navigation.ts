import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import type { NavigationTarget } from "@/config/site";
import { appRoutes } from "@/config/site";
import { useLenis } from "@/lib/lenis-context";

const isSectionTarget = (target: NavigationTarget): target is `#${string}` =>
	target.startsWith("#");

export function useAppNavigation() {
	const { scrollTo } = useLenis();
	const location = useLocation();
	const navigate = useNavigate();

	const goToTarget = useCallback(
		(target: NavigationTarget) => {
			if (isSectionTarget(target)) {
				if (location.pathname === appRoutes.home) {
					scrollTo(target);
					window.history.replaceState(null, "", target);
					return;
				}

				navigate(`/${target}`);
				return;
			}

			if (location.pathname !== target) {
				navigate(target);
			}
		},
		[location.pathname, navigate, scrollTo],
	);

	const isTargetActive = useCallback(
		(target: NavigationTarget) => {
			if (isSectionTarget(target)) {
				return location.pathname === appRoutes.home && location.hash === target;
			}

			return location.pathname === target;
		},
		[location.hash, location.pathname],
	);

	return {
		goToTarget,
		isTargetActive,
		location,
	};
}
