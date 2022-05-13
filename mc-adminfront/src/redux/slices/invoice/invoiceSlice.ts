import {
	InvoiceState,
	SetInvoicesPayload,
	InvoiceLoadingPayload,
	SetFiltersPayload,
	InvoiceType,
	SetInvoicePayload,
} from ".";
import DateService from "utils/date.util";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const arr: InvoiceType[] = ["latest", "processed", "completed"];
const initialInvoice = {
	invoices: [],
	loading: true,
	current_filters: {},
	filters: {
		invoice_month: DateService.getMonthString(new Date().toISOString()),
	},
};
const initialState: InvoiceState = {
	tab: 0,
	refresh: 0,
	invoice: null,
	loading: false,
	refreshLoader: false,
	latest: initialInvoice,
	processed: initialInvoice,
	completed: initialInvoice,
};

export const invoiceSlice = createSlice({
	name: "invoice",
	initialState,
	reducers: {
		setTab: (state, action: PayloadAction<number>) => {
			state.tab = action.payload;
		},
		setLoader: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setLoading: (state, action: PayloadAction<InvoiceLoadingPayload>) => {
			const { type, loading } = action.payload;
			state[type].loading = loading;
		},
		setInvoices: (state, action: PayloadAction<SetInvoicesPayload>) => {
			const { type, invoices } = action.payload;

			state.refreshLoader = false;
			state[type].invoices = invoices;
		},
		updateInvoice: (state, action: PayloadAction<SetInvoicePayload>) => {
			const { type, invoice } = action.payload;

			if (!invoice?._id) return;

			state[type].invoices.every(({ _id }, i) => {
				if (_id === invoice._id) {
					state[type].invoices[i] = invoice;
					return false;
				}
				return true;
			});
		},
		addInvoiceNotes: (state, action: PayloadAction<SetInvoicePayload>) => {
			const { type, invoice } = action.payload;

			if (!invoice?._id) return;

			state[type].invoices.every(({ _id }, i) => {
				if (_id === invoice._id) {
					state[type].invoices[i].admin_notes = invoice.admin_notes;
					return false;
				}
				return true;
			});
		},
		filterInvoices: (state, action: PayloadAction<SetInvoicePayload>) => {
			const { type, invoice } = action.payload;

			state[type].invoices = state[type].invoices.filter(
				({ _id }) => _id !== invoice._id
			);
		},
		setFilters: (state, action: PayloadAction<SetFiltersPayload>) => {
			const { type, data } = action.payload;
			state[type].filters = data;
			state.refreshLoader = true;
		},
		resetFilters: (state) => {
			state.refresh += 1;
			state.refreshLoader = true;
			state[arr[state.tab]].filters = initialInvoice.filters;
			state[arr[state.tab]].current_filters =
				initialInvoice.current_filters;
		},
		setCurrentFilters: (
			state,
			action: PayloadAction<SetFiltersPayload>
		) => {
			const { type, data } = action.payload;
			state[type].current_filters = data;
		},
	},
});

const invoiceReducer = invoiceSlice.reducer;

export const invoiceActions = invoiceSlice.actions;
export default invoiceReducer;
