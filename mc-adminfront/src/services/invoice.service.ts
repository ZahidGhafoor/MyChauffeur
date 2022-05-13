import http from "./http.service";
import { AppDispatch } from "redux/store";
import Promisable from "./promisable.service";
import { modalActions } from "redux/slices/modal";
import { invoiceActions, InvoiceType } from "redux/slices/invoice";

const url = "/invoices";

const InvoiceService = {
	getInvoices: async (
		type: InvoiceType,
		data: any,
		dispatch?: AppDispatch
	) => {
		dispatch?.(invoiceActions.setLoading({ type, loading: true }));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/${type}`, data)
		);

		if (success) {
			const { invoices } = success.data.data;
			dispatch?.(invoiceActions.setInvoices({ type, invoices }));
		}

		dispatch?.(invoiceActions.setLoading({ type, loading: false }));

		return [success, error];
	},

	generateInvoice: async (id: any, dispatch?: AppDispatch) => {
		dispatch?.(modalActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/generateOne/${id}`)
		);

		if (success) {
			const { invoice } = success.data.data;

			dispatch?.(modalActions.closeModal());
			dispatch?.(
				invoiceActions.updateInvoice({ type: "latest", invoice })
			);
		}

		dispatch?.(modalActions.setLoading(false));

		return [success, error];
	},

	generateAllInvoices: async (dispatch?: AppDispatch) => {
		dispatch?.(modalActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/generateAll`)
		);

		if (success) {
			const { invoices } = success.data.data;

			dispatch?.(modalActions.closeModal());
			dispatch?.(invoiceActions.setInvoices({ type: "latest", invoices }));
		}

		dispatch?.(modalActions.setLoading(false));

		return [success, error];
	},

	payInvoice: async (
		id: string,
		type: InvoiceType,
		data: any,
		dispatch?: AppDispatch
	) => {
		dispatch?.(modalActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/payment/${id}`, data)
		);

		if (success) {
			const { invoice } = success.data.data;

			dispatch?.(modalActions.closeModal());
			dispatch?.(invoiceActions.filterInvoices({ type, invoice }));
		}

		dispatch?.(modalActions.setLoading(false));

		return [success, error];
	},

	verifyInvoice: async (
		id: string,
		type: InvoiceType,
		dispatch?: AppDispatch
	) => {
		dispatch?.(modalActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/verify/${id}`)
		);

		if (success) {
			const { invoice } = success.data.data;

			dispatch?.(modalActions.closeModal());
			dispatch?.(invoiceActions.filterInvoices({ type, invoice }));
		}

		dispatch?.(modalActions.setLoading(false));

		return [success, error];
	},

	addInvoiceNotes: async (
		id: string,
		type: InvoiceType,
		data: any,
		dispatch?: AppDispatch
	) => {
		dispatch?.(modalActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/notes/${id}`, data)
		);

		if (success) {
			const { invoice } = success.data.data;

			dispatch?.(
				modalActions.updateData({ admin_notes: invoice.admin_notes })
			);
			dispatch?.(invoiceActions.addInvoiceNotes({ type, invoice }));
		}

		dispatch?.(modalActions.setLoading(false));

		return [success, error];
	},
};

export default InvoiceService;
