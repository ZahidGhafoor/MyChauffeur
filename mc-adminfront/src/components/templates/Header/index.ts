export { default } from "./Header";

export interface ILink {
	to: string;
	text: string;
	active: string;
}

export const links: ILink[] = [
	{ to: "/bookings", text: "Bookings", active: "booking" },
	{ to: "/users", text: "Users", active: "user" },
	{ to: "/chauffeurs", text: "Chauffeurs", active: "chauffeur" },
	{ to: "/vehicles", text: "Vehicles", active: "vehicle" },
	{ to: "/models", text: "Models", active: "model" },
	{ to: "/partners", text: "Partners", active: "partners" },
	// { to: "/companies", text: "Companies", active: "company" },
	{ to: "/class", text: "Class", active: "class" },
	{ to: "/city", text: "City", active: "city" },
	{ to: "/pricing", text: "Pricing", active: "pricing" },
	{ to: "/campaigns", text: "Campaigns", active: "campaigns" },
	{ to: "/invoices", text: "Invoices", active: "invoices" },
];
