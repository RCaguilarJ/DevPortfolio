"use client";

import {
	cloneElement,
	createContext,
	isValidElement,
	type ReactElement,
	type ReactNode,
	useContext,
	useId,
} from "react";
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
	children: ReactNode;
	className?: string;
	onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface FormFieldProps {
	children: ReactNode;
	name: string;
	error?: string;
	description?: string;
	className?: string;
}

export interface FormLabelProps
	extends React.LabelHTMLAttributes<HTMLLabelElement> {
	children: ReactNode;
	className?: string;
	required?: boolean;
}

export interface FormControlProps {
	children: ReactNode;
	className?: string;
}

export interface FormActionsProps {
	children: ReactNode;
	align?: "left" | "center" | "right";
	className?: string;
}

export interface FormDescriptionProps
	extends React.HTMLAttributes<HTMLParagraphElement> {
	children: ReactNode;
	className?: string;
}

export interface FormMessageProps
	extends React.HTMLAttributes<HTMLParagraphElement> {
	children: ReactNode;
	className?: string;
}

export const Form = ({
	children,
	className,
	onSubmit,
	...props
}: FormProps) => {
	return (
		<form className={cn("space-y-4", className)} onSubmit={onSubmit} {...props}>
			{children}
		</form>
	);
};

export const FormField = ({
	children,
	name,
	error,
	description,
	className,
}: FormFieldProps) => {
	const id = useId();
	const describedById = `${id}-description`;
	const errorId = `${id}-error`;

	return (
		<FormFieldContext.Provider value={{ id, name, error, description }}>
			<div className={cn("space-y-2", className)}>
				{children}
				{description ? (
					<p id={describedById} className="text-[0.8rem] text-muted-foreground">
						{description}
					</p>
				) : null}
				{error ? (
					<p
						id={errorId}
						className="text-[0.8rem] font-medium text-destructive"
					>
						{error}
					</p>
				) : null}
			</div>
		</FormFieldContext.Provider>
	);
};

export const FormLabel = ({
	children,
	className,
	required,
	...props
}: FormLabelProps) => {
	const { id, error } = useFormField();

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
			{required ? <span className="ml-1 text-destructive">*</span> : null}
		</label>
	);
};

export const FormControl = ({ children, className }: FormControlProps) => {
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
			{isValidElement(children)
				? cloneFormControl(children, {
						id,
						name,
						"aria-describedby": ariaDescribedBy || undefined,
						"aria-invalid": error ? true : undefined,
					})
				: children}
		</div>
	);
};

type FormControlElementProps = {
	id?: string;
	name?: string;
	"aria-describedby"?: string;
	"aria-invalid"?: boolean;
};

const cloneFormControl = (
	element: ReactElement<FormControlElementProps>,
	props: FormControlElementProps,
) => {
	return cloneElement(element, props);
};

export const FormActions = ({
	children,
	align = "right",
	className,
}: FormActionsProps) => {
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

export const FormDescription = ({
	children,
	className,
}: FormDescriptionProps) => {
	const { id } = useFormField();

	return (
		<p
			id={`${id}-description`}
			className={cn("text-[0.8rem] text-muted-foreground", className)}
		>
			{children}
		</p>
	);
};

export const FormMessage = ({ children, className }: FormMessageProps) => {
	const { id, error } = useFormField();

	if (!children && !error) return null;

	return (
		<p
			id={`${id}-error`}
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
