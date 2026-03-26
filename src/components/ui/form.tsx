"use client";

import React, { createContext, useContext, useId } from "react";
import { cn } from "@/lib/utils";

interface FormFieldContextValue {
	id: string;
	name: string;
	error?: string;
	description?: string;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

const useFormField = () => {
	const context = useContext(FormFieldContext);
	if (!context) {
		throw new Error("useFormField must be used within a FormField");
	}
	return context;
};

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
	children: React.ReactNode;
	className?: string;
	onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface FormFieldProps {
	children: React.ReactNode;
	name: string;
	error?: string;
	description?: string;
	className?: string;
}

export interface FormLabelProps
	extends React.LabelHTMLAttributes<HTMLLabelElement> {
	children: React.ReactNode;
	className?: string;
	required?: boolean;
}

export interface FormControlProps {
	children: React.ReactNode;
	className?: string;
}

export interface FormActionsProps {
	children: React.ReactNode;
	align?: "left" | "center" | "right";
	className?: string;
}

export interface FormDescriptionProps
	extends React.HTMLAttributes<HTMLParagraphElement> {
	children: React.ReactNode;
	className?: string;
}

export interface FormMessageProps
	extends React.HTMLAttributes<HTMLParagraphElement> {
	children: React.ReactNode;
	className?: string;
}

export const Form: React.FC<FormProps> = ({
	children,
	className,
	onSubmit,
	...props
}) => {
	return (
		<form
			className={cn("space-y-4", className)}
			onSubmit={onSubmit}
			{...props}
		>
			{children}
		</form>
	);
};

export const FormField: React.FC<FormFieldProps> = ({
	children,
	name,
	error,
	description,
	className,
}) => {
	const reactId = useId();
	const id = reactId;
	const describedById = `${id}-description`;
	const errorId = `${id}-error`;

	return (
		<FormFieldContext.Provider
			value={{ id, name, error, description }}
		>
			<div className={cn("space-y-2", className)}>
				{children}
				{description && (
					<p
						id={describedById}
						className="text-[0.8rem] text-muted-foreground"
					>
						{description}
					</p>
				)}
				{error && (
					<p id={errorId} className="text-[0.8rem] font-medium text-destructive">
						{error}
					</p>
				)}
			</div>
		</FormFieldContext.Provider>
	);

export const FormLabel: React.FC<FormLabelProps> = ({
	children,
	className,
	required,
	...props
}) => {
	const { id, name, error } = useFormField();

	return (
		<label
			htmlFor={id}
			className={cn(
				"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				error && "text-destructive",
				className,
			)}
			{...props}
		>
			{children}
			{required && <span className="text-destructive ml-1">*</span>}
		</label>
	);
};

export const FormControl: React.FC<FormControlProps> = ({
	children,
	className,
}) => {
	const { id, name, error, description } = useFormField();
	const describedById = `${id}-description`;
	const errorId = `${id}-error`;
	const ariaDescribedBy = [
		description ? describedById : "",
		error ? errorId : "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={className}>
			{React.isValidElement(children)
				? React.cloneElement(children as React.ReactElement<{
						id?: string;
						name?: string;
						"aria-describedby"?: string;
						"aria-invalid"?: boolean;
				  }>, {
						id,
						name,
						"aria-describedby": ariaDescribedBy || undefined,
						"aria-invalid": error ? true : undefined,
				  })
				: children}
		</div>
	);
};

export const FormActions: React.FC<FormActionsProps> = ({
	children,
	align = "right",
	className,
}) => {
	return (
		<div
			className={cn(
				"flex",
				align === "left" && "justify-start",
				align === "center" && "justify-center",
				align === "right" && "justify-end",
				className,
			)}
		>
			{children}
		</div>
	);
};

export const FormDescription: React.FC<FormDescriptionProps> = ({
	children,
	className,
}) => {
	const { id } = useFormField();
	const describedById = `${id}-description`;

	return (
		<p
			id={describedById}
			className={cn("text-[0.8rem] text-muted-foreground", className)}
		>
			{children}
		</p>
	);
};

export const FormMessage: React.FC<FormMessageProps> = ({
	children,
	className,
}) => {
	const { id, error } = useFormField();
	const errorId = `${id}-error`;

	if (!children && !error) return null;

	return (
		<p
			id={errorId}
			className={cn(
				"text-[0.8rem] font-medium",
				error ? "text-destructive" : "text-muted-foreground",
				className,
			)}
		>
			{children || error}
		</p>
	);
};
