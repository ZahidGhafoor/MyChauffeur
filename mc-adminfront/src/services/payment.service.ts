import http from "./http.service";
import { AppDispatch } from "redux/store";
import Promisable from "./promisable.service";
import { modalActions } from "redux/slices/modal";
import ToasterService from "../utils/toaster.util";
import { loaderActions } from "redux/slices/loader";
import { paymentActions } from "redux/slices/payment";

const url = "/payments";

const PaymentService = {
	getClientSecret: async (dispatch?: AppDispatch) => {
		dispatch?.(loaderActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/setupCard`)
		);

		dispatch?.(loaderActions.setLoading(false));
		return [success, error];
	},

	addPayPal: async (data: any, dispatch?: AppDispatch) => {
		dispatch?.(loaderActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/p/add`, data)
		);

		if (success) {
			await PaymentService.getAllMethods(dispatch);
			ToasterService.showSuccess("Paypal Added Successfully");
			dispatch?.(modalActions.closeModal());
		}

		dispatch?.(loaderActions.setLoading(false));
		return [success, error];
	},

	deletePayPal: async (id: string, dispatch?: AppDispatch) => {
		dispatch?.(modalActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.delete(`${url}/p/delete/${id}`)
		);

		if (success) {
			await PaymentService.getAllMethods(dispatch);
			dispatch?.(modalActions.closeModal());
		}

		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},

	deleteCreditCard: async (id: string, dispatch?: AppDispatch) => {
		dispatch?.(modalActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.delete(`${url}/s/deleteCreditCard/${id}`)
		);

		if (success) {
			await PaymentService.getAllMethods(dispatch);
			dispatch?.(modalActions.closeModal());
		}

		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},

	getAllMethods: async (dispatch?: AppDispatch) => {
		dispatch?.(paymentActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/getAllMethods`)
		);

		if (success) {
			const { credit_cards, payment_methods } = success.data.data;
			dispatch?.(
				paymentActions.setMethods({ credit_cards, payment_methods })
			);
		}

		dispatch?.(paymentActions.setLoading(false));
		return [success, error];
	},

	setDefaultMethod: async (data: any, dispatch?: AppDispatch) => {
		dispatch?.(modalActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/setdefaultMethod`, data)
		);

		if (success) {
			const { credit_cards, payment_methods } = success.data.data;
			dispatch?.(
				paymentActions.setMethods({ credit_cards, payment_methods })
			);
			dispatch?.(modalActions.closeModal());
		}

		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},
};

export default PaymentService;
