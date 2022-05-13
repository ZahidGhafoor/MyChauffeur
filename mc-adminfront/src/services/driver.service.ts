import http from "./http.service";
import { AppDispatch } from "redux/store";
import Promisable from "./promisable.service";
import { modalActions } from "redux/slices/modal";
import { NavigateFunction } from "react-router-dom";
import { loaderActions } from "redux/slices/loader";
import { driverActions } from "redux/slices/driver";
import { formLoaderActions } from "redux/slices/formLoader";

const url = "/driver";

const DriverService = {
	addDriver: async (
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
			const { driver } = success.data.data;
			dispatch?.(driverActions.addDriver(driver));
			navigate?.("/chauffeurs");
		}
		dispatch?.(formLoaderActions.setLoading(false));
		return [success, error];
	},

	updateDriver: async (
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
			const { driver } = success.data.data;
			dispatch?.(driverActions.updateDriver({ id, driver }));
			navigate?.(`/chauffeur-details/${id}`);
		}
		dispatch?.(formLoaderActions.setLoading(false));
		return [success, error];
	},

	enableDriver: async (id: string, dispatch?: AppDispatch) => {
		dispatch?.(modalActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/is_enabled/${id}`)
		);

		if (success) {
			const { driver } = success.data.data;
			dispatch?.(driverActions.setDriver(driver));
			dispatch?.(modalActions.closeModal());
		}

		dispatch?.(modalActions.setLoading(false));

		return [success, error];
	},

	getDriver: async (id: string, dispatch?: AppDispatch) => {
		dispatch?.(loaderActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/${id}`)
		);
		if (success) {
			const { driver } = success.data.data;
			dispatch?.(driverActions.setDriver(driver));
		} else dispatch?.(driverActions.setDriver({ data: "Not Found" }));
		dispatch?.(loaderActions.setLoading(false));
		return [success, error];
	},

	getAllDrivers: async (dispatch?: AppDispatch) => {
		dispatch?.(driverActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}`)
		);
		if (success) {
			const { drivers } = success.data.data;
			dispatch?.(driverActions.setDrivers(drivers));
		}
		dispatch?.(driverActions.setLoading(false));
		return [success, error];
	},

	getPartnerDrivers: async (id: string, dispatch?: AppDispatch) => {
		dispatch?.(driverActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/partner/${id}`)
		);
		if (success) {
			const { drivers } = success.data.data;
			dispatch?.(driverActions.setPartnerDrivers(drivers));
		}
		dispatch?.(driverActions.setLoading(false));
		return [success, error];
	},

	uploadDriverDocs: async (
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
			const { driver } = success.data.data;
			dispatch?.(driverActions.setDriver(driver));
			dispatch?.(modalActions.closeModal());
		}
		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},

	updateDriverStatus: async (
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
			const { driver } = success.data.data;
			dispatch?.(driverActions.setDriver(driver));
			dispatch?.(modalActions.closeModal());
		}
		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},

	updateDriverDocsStatus: async (
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
			const { driver } = success.data.data;
			dispatch?.(driverActions.setDriver(driver));
			dispatch?.(modalActions.closeModal());
		}
		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},
};

export default DriverService;
