"use client";

import { cva, type VariantProps } from "class-variance-authority";
import React, {
	createContext,
	useCallback,
	useContext,
	useId,
	useMemo,
	useState,
} from "react";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

const accordionVariants = cva("w-full", {
	variants: {
		variant: {
			default: "",
			card: "space-y-2",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

const accordionItemVariants = cva(
	"transition-[box-shadow] ease-out-quad duration-100",
	{
		variants: {
			variant: {
				default: "border-b border-border/80 last:border-b-0",
				card: "rounded-lg",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const accordionTriggerVariants = cva(
	"flex w-full items-center justify-between rounded-lg text-left text-foreground hover:text-foreground/70 transition-[color,box-shadow] ease-out-quad duration-100",
	{
		variants: {
			variant: {
				default: "px-0",
				card: "px-4 py-3",
			},
			size: {
				sm: "text-xs",
				md: "text-sm",
				lg: "text-base",
			},
			disabled: {
				true: "cursor-not-allowed opacity-50",
				false: "cursor-pointer",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
			disabled: false,
		},
	},
);

const accordionContentVariants = cva(
	"overflow-hidden transition-[height,opacity] duration-300 ease-smooth will-change-[height,opacity]",
	{
		variants: {
			size: {
				sm: "text-xs",
				md: "text-sm",
				lg: "text-base",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

const accordionContentInnerVariants = cva("leading-snug text-foreground/70", {
	variants: {
		variant: {
			default: "",
			card: "border-t border-border/80",
		},
	},
	compoundVariants: [
		{
			variant: "card",
			class: "px-4 py-3",
		},
	],
	defaultVariants: {
		variant: "default",
	},
});

export interface AccordionProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof accordionVariants> {
	children: React.ReactNode;
	size?: "sm" | "md" | "lg";
	className?: string;
	type?: "single" | "multiple";
	defaultValue?: string | string[];
	onValueChange?: (value: string | string[]) => void;
}

export interface AccordionItemProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof accordionItemVariants> {
	children: React.ReactNode;
	value?: string;
	className?: string;
	disabled?: boolean;
}

export interface AccordionTriggerProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof accordionTriggerVariants> {
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
}

export interface AccordionContentProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof accordionContentVariants> {
	children: React.ReactNode;
	className?: string;
}

type AccordionStyleContextType = {
	variant: "default" | "card";
	size: "sm" | "md" | "lg";
};

const AccordionStyleContext = createContext<
	AccordionStyleContextType | undefined
>(undefined);

const useAccordionStyle = () => {
	const context = useContext(AccordionStyleContext);
	if (!context) {
		throw new Error("Accordion components must be used within an Accordion");
	}
	return context;
};

type AccordionBehaviorContextType = {
	openItems: Set<string>;
	toggleItem: (value: string) => void;
	type: "single" | "multiple";
};

const AccordionBehaviorContext = createContext<
	AccordionBehaviorContextType | undefined
>(undefined);

const useAccordionBehavior = () => {
	const context = useContext(AccordionBehaviorContext);
	if (!context) {
		throw new Error("Accordion components must be used within an Accordion");
	}
	return context;
};

type AccordionItemContextType = {
	value: string;
	isOpen: boolean;
	disabled: boolean;
	triggerId: string;
	contentId: string;
};

const AccordionItemContext = createContext<
	AccordionItemContextType | undefined
>(undefined);

const useAccordionItem = () => {
	const context = useContext(AccordionItemContext);
	if (!context) {
		throw new Error(
			"AccordionTrigger and AccordionContent must be used within an AccordionItem",
		);
	}
	return context;
};

export const Accordion: React.FC<AccordionProps> = React.memo(
	({
		children,
		variant = "default",
		size = "md",
		className,
		type = "single",
		defaultValue,
		onValueChange,
		...props
	}) => {
		const resolvedVariant: "default" | "card" = variant ?? "default";
		const resolvedSize: "sm" | "md" | "lg" = size ?? "md";

		const initialSet = useMemo(() => {
			if (defaultValue) {
				if (Array.isArray(defaultValue)) {
					return new Set(defaultValue);
				}
				return new Set([defaultValue]);
			}
			return new Set<string>();
		}, [defaultValue]);

		const [openItems, setOpenItems] = useState<Set<string>>(initialSet);

		const toggleItem = useCallback(
			(value: string) => {
				setOpenItems((prev) => {
					const next = new Set(prev);
					if (next.has(value)) {
						next.delete(value);
					} else {
						next.add(value);
					}
					if (type === "single") {
						next.forEach((v) => {
							if (v !== value) next.delete(v);
						});
					}
					if (onValueChange) {
						const arr = Array.from(next);
						onValueChange(type === "single" ? arr[0] || "" : arr);
					}
					return next;
				});
			},
			[type, onValueChange],
		);

		const styleValue = useMemo(
			() => ({ variant: resolvedVariant, size: resolvedSize }),
			[resolvedVariant, resolvedSize],
		);

		const behaviorValue = useMemo<AccordionBehaviorContextType>(
			() => ({
				openItems,
				toggleItem,
				type,
			}),
			[openItems, toggleItem, type],
		);

		return (
			<AccordionStyleContext.Provider value={styleValue}>
				<AccordionBehaviorContext.Provider value={behaviorValue}>
					<div
						data-accordion-root
						className={cn(
							accordionVariants({ variant: resolvedVariant }),
							className,
						)}
						{...props}
					>
						{children}
					</div>
				</AccordionBehaviorContext.Provider>
			</AccordionStyleContext.Provider>
		);
	},
);

Accordion.displayName = "Accordion";

export const AccordionItem: React.FC<AccordionItemProps> = React.memo(
	({ children, value, className, disabled = false, ...props }) => {
		const { variant } = useAccordionStyle();
		const {
			openItems,
			toggleItem: _toggleItem,
			type: _type,
		} = useAccordionBehavior();
		const reactId = useId();
		const itemValue = value || reactId;
		const isOpen = openItems.has(itemValue);

		const triggerId = `${itemValue}-trigger`;
		const contentId = `${itemValue}-content`;

		const contextValue = useMemo<AccordionItemContextType>(
			() => ({
				value: itemValue,
				isOpen,
				disabled: !!disabled,
				triggerId,
				contentId,
			}),
			[itemValue, isOpen, disabled, triggerId, contentId],
		);

		if (variant === "card") {
			return (
				<AccordionItemContext.Provider value={contextValue}>
					<div
						className={cn(accordionItemVariants({ variant }), className)}
						{...props}
					>
						<div className="relative rounded-lg border border-border bg-card shadow-md card-highlight">
							{children}
						</div>
					</div>
				</AccordionItemContext.Provider>
			);
		}

		return (
			<AccordionItemContext.Provider value={contextValue}>
				<div
					className={cn(accordionItemVariants({ variant }), className)}
					{...props}
				>
					{children}
				</div>
			</AccordionItemContext.Provider>
		);
	},
);

AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger: React.FC<AccordionTriggerProps> = React.memo(
	({
		children,
		className,
		disabled: disabledProp,
		variant: _variantProp,
		size: _sizeProp,
		...props
	}) => {
		const { variant, size } = useAccordionStyle();
		const { isOpen, disabled, triggerId, contentId, value } =
			useAccordionItem();
		const { toggleItem } = useAccordionBehavior();
		const mergedDisabled = Boolean(disabled || disabledProp);

		const iconSize = useMemo(() => {
			return size === "sm" ? 14 : size === "md" ? 16 : 20;
		}, [size]);

		const handleClick = () => {
			if (!mergedDisabled) {
				toggleItem(value);
			}
		};

		return (
			<h3>
				<button
					id={triggerId}
					data-accordion-trigger
					type="button"
					className={cn(
						accordionTriggerVariants({
							variant,
							size,
							disabled: mergedDisabled,
						}),
						className,
					)}
					aria-controls={contentId}
					aria-disabled={mergedDisabled || undefined}
					aria-expanded={isOpen}
					disabled={mergedDisabled}
					onClick={handleClick}
					{...props}
				>
					<span className="font-medium">{children}</span>
					<Icons.ChevronDown
						aria-hidden="true"
						className={cn(
							"ml-2 shrink-0 text-foreground/70 transition-[rotate] duration-300 ease-smooth will-change-transform",
							isOpen ? "rotate-180" : "rotate-0",
						)}
						style={{ width: iconSize, height: iconSize }}
					/>
				</button>
			</h3>
		);
	},
);

AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent: React.FC<AccordionContentProps> = React.memo(
	({ children, className, size: _sizeProp, ...props }) => {
		const { variant, size } = useAccordionStyle();
		const { isOpen, triggerId, contentId } = useAccordionItem();

		const contentRef = React.useRef<HTMLDivElement>(null);
		const innerRef = React.useRef<HTMLDivElement>(null);
		const [height, setHeight] = useState<number>(0);
		const rafRef = React.useRef<number | undefined>(undefined);

		const updateHeight = React.useCallback(() => {
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}

			rafRef.current = requestAnimationFrame(() => {
				if (innerRef.current) {
					const newHeight = innerRef.current.scrollHeight;
					setHeight(newHeight);
				}
			});
		}, []);

		React.useEffect(() => {
			if (!innerRef.current) return;

			const resizeObserver = new ResizeObserver(() => {
				updateHeight();
			});

			resizeObserver.observe(innerRef.current);
			updateHeight();

			return () => {
				resizeObserver.disconnect();
				if (rafRef.current) {
					cancelAnimationFrame(rafRef.current);
				}
			};
		}, [updateHeight]);

		React.useEffect(() => {
			updateHeight();
		}, [updateHeight]);

		const contentStyle = useMemo(
			() => ({
				height: isOpen ? `${height}px` : "0px",
				opacity: isOpen ? 1 : 0,
			}),
			[isOpen, height],
		);

		return (
			<div
				ref={contentRef}
				className={cn(accordionContentVariants({ size }), className)}
				style={contentStyle}
				{...props}
			>
				<section
					id={contentId}
					aria-labelledby={triggerId}
					aria-hidden={!isOpen}
					inert={!isOpen}
					ref={innerRef}
					className={cn(accordionContentInnerVariants({ variant }))}
				>
					{children}
				</section>
			</div>
		);
	},
);

AccordionContent.displayName = "AccordionContent";
