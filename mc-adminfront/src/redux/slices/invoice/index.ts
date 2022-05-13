export { default, invoiceActions, invoiceSlice } from "./invoiceSlice";

export enum INVOICE {
	latest = "latest",
	processed = "processed",
	completed = "completed",
}

export type InvoiceType = keyof typeof INVOICE;

export interface InvoiceLoadingPayload {
	loading: boolean;
	type: InvoiceType;
}

export interface SetInvoicesPayload {
	invoices: any[];
	type: InvoiceType;
}

export interface SetFiltersPayload {
	data: any;
	type: InvoiceType;
}

export interface SetInvoicePayload {
	invoice: any;
	type: InvoiceType;
}

export interface IInvoices {
	filters: any;
	invoices: any[];
	loading: boolean;
	current_filters: any;
}

export interface BasicInvoiceState {
	tab: number;
	invoice: any;
	refresh: number;
	loading: boolean;
	refreshLoader: boolean;
}

export type InvoiceState = BasicInvoiceState & {
	[key in INVOICE]: IInvoices;
};
