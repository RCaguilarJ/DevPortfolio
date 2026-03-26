"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

const checkboxVariants = cva(
	[
		"relative inline-flex items-center justify-center rounded border border-transparent cursor-pointer",
		"transition-[background-color,border-color,box-shadow] duration-100 ease-out-quad",
		"has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-offset-1 has-[:focus-visible]:outline-none",
		"has-[:focus-visible]:ring-offset-ring-offset/50 has-[:focus-visible]:ring-ring/50",
		"shadow-sm card-highlight",
	],
	{
		variants: {
			size: {
				sm: "h-4 w-4",
				md: "h-5 w-5",
				lg: "h-6 w-6",
			},
			checked: {
				true: "",
				false: "",
			},
			disabled: {
				true: "cursor-not-allowed opacity-50",
				false: "",
			},
		},
		compoundVariants: [
			{
				checked: true,
				class: "bg-foreground border-transparent",
			},
			{
				checked: false,
				class: "bg-card border-border",
			},
		],
		defaultVariants: {
			size: "md",
			checked: false,
			disabled: false,
		},
	},
);

const iconVariants = cva(
	["text-card transition-opacity ease-out-quad duration-100 "],
	{
		variants: {
			size: {
				sm: "h-3 w-3",
				md: "h-4 w-4",
				lg: "h-4.5 w-4.5",
			},
			checked: {
				true: "opacity-100",
				false: "opacity-0",
			},
		},
		defaultVariants: {
			size: "md",
			checked: false,
		},
	},
);

export interface CheckboxProps
	extends Omit<
			React.InputHTMLAttributes<HTMLInputElement>,
			"size" | "disabled"
		>,
		Omit<VariantProps<typeof checkboxVariants>, "checked"> {
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
	className?: string;
	id?: string;
	defaultChecked?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
	checked: controlledChecked,
	onCheckedChange,
	defaultChecked,
	size = "md",
	disabled = false,
	className = "",
	id,
	...props
}) => {
	const [internalChecked, setInternalChecked] = React.useState(
		defaultChecked ?? false,
	);

	const isControlled = controlledChecked !== undefined;
	const isChecked = isControlled ? controlledChecked : internalChecked;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (disabled) return;
		const newValue = event.target.checked;
		if (!isControlled) {
			setInternalChecked(newValue);
		}
		onCheckedChange?.(newValue);
	};

	return (
		<label
			className={cn(
				checkboxVariants({ size, checked: isChecked, disabled }),
				className,
			)}
			htmlFor={id}
		>
			<input
				type="checkbox"
				className="sr-only"
				disabled={disabled}
				id={id}
				checked={isChecked}
				onChange={handleChange}
				{...props}
			/>
			<Icons.Check
				aria-hidden="true"
				className={iconVariants({ size, checked: isChecked })}
			/>
		</label>
	);
};
