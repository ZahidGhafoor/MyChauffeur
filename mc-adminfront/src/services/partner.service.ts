import http from "./http.service";
import { AppDispatch } from "redux/store";
import Promisable from "./promisable.service";
import { modalActions } from "redux/slices/modal";
import { NavigateFunction } from "react-router-dom";
import { loaderActions } from "redux/slices/loader";
import { partnerActions } from "redux/slices/partner";
import { formLoaderActions } from "redux/slices/formLoader";

const url = "/partner";

const PartnerService = {
	addPartner: async (
		data: any,
		dispatch?: AppDispatch,
		navigate?: NavigateFunction
	) => {
		dispatch?.(formLoaderActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}`, data)
		);
		if (success) {
			const { partner } = success.data.data;
			dispatch?.(partnerActions.addPartner(partner));
			navigate?.("/partners");
		}
		dispatch?.(formLoaderActions.setLoading(false));
		return [success, error];
	},
	updatePartner: async (
		id: string,
		data: any,
		dispatch?: AppDispatch,
		navigate?: NavigateFunction
	) => {
		dispatch?.(formLoaderActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.patch(`${url}/${id}`, data)
		);
		if (success) {
			const { partner } = success.data.data;
			dispatch?.(partnerActions.updatePartner({ id, partner }));
			navigate?.(`/partner-details/${id}`);
		}
		dispatch?.(formLoaderActions.setLoading(false));
		return [success, error];
	},
	getPartner: async (id: string, dispatch?: AppDispatch) => {
		dispatch?.(loaderActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/${id}`)
		);
		if (success) {
			const { partner } = success.data.data;
			dispatch?.(partnerActions.setPartner(partner));
		} else dispatch?.(partnerActions.setPartner({ data: "Not Found" }));
		dispatch?.(loaderActions.setLoading(false));
		return [success, error];
	},
	getAllPartners: async (dispatch?: AppDispatch) => {
		dispatch?.(partnerActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}`)
		);
		if (success) {
			const { partners } = success.data.data;
			dispatch?.(partnerActions.setPartners(partners));
		}
		dispatch?.(partnerActions.setLoading(false));
		return [success, error];
	},
	updatePartnerStatus: async (
		id: string,
		data: any,
		dispatch?: AppDispatch
	) => {
		dispatch?.(modalActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/status/${id}`, data)
		);

		if (success) {
			const { partner } = success.data.data;
			dispatch?.(partnerActions.setPartner(partner));
			dispatch?.(modalActions.closeModal());
		}

		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},
	uploadPartnerDocs: async (
		id: string,
		data: any,
		dispatch?: AppDispatch
	) => {
		dispatch?.(modalActions.setLoading(true));
		http.setJWT();
		http.setMultiPart();
		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/upload/${id}`, data)
		);
		if (success) {
			const { partner } = success.data.data;
			dispatch?.(partnerActions.setPartner(partner));
			dispatch?.(modalActions.closeModal());
		}
		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},
	updatePartnerDocsStatus: async (
		id: string,
		data: any,
		dispatch?: AppDispatch
	) => {
		dispatch?.(modalActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/document/status/${id}`, data)
		);

		if (success) {
			const { partner } = success.data.data;
			dispatch?.(partnerActions.setPartner(partner));
			dispatch?.(modalActions.closeModal());
		}

		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},
};
export default PartnerService;
