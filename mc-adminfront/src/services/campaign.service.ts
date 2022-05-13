import http from "./http.service";
import { AppDispatch } from "redux/store";
import Promisable from "./promisable.service";
import { NavigateFunction } from "react-router-dom";
import { campaignActions } from "redux/slices/campaign";
import { formLoaderActions } from "redux/slices/formLoader";

const url = "/campaign";

const CampaignService = {
	addCampaign: async (
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
			const { campaign } = success.data.data;
			dispatch?.(campaignActions.addCampaign(campaign));
			navigate?.("/campaigns");
		}

		dispatch?.(formLoaderActions.setLoading(false));
		return [success, error];
	},

	updateCampaign: async (
		id: string,
		data: any,
		dispatch?: AppDispatch
	) => {
		dispatch?.(formLoaderActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.patch(`${url}/${id}`, data)
		);

		if (success) {
			const { campaign } = success.data.data;
			dispatch?.(campaignActions.setCampaign(campaign));
			dispatch?.(campaignActions.updateCampaign({ id, campaign }));
		}

		dispatch?.(formLoaderActions.setLoading(false));
		return [success, error];
	},

	getCampaign: async (id: string, dispatch?: AppDispatch) => {
		dispatch?.(campaignActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/${id}`)
		);

		if (success) {
			const { campaign } = success.data.data;
			dispatch?.(campaignActions.setCampaign(campaign));
		} else dispatch?.(campaignActions.setCampaign({ data: "Not Found" }));

		dispatch?.(campaignActions.setLoading(false));
		return [success, error];
	},

	getCampaigns: async (dispatch?: AppDispatch) => {
		dispatch?.(campaignActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}`)
		);

		if (success) {
			const { campaigns } = success.data.data;
			dispatch?.(campaignActions.setCampaigns(campaigns));
		}

		dispatch?.(campaignActions.setLoading(false));
		return [success, error];
	},

	addCoupon: async (data: any, dispatch?: AppDispatch) => {
		dispatch?.(campaignActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/coupons/generate-single`, data)
		);

		if (success) {
			const { campaign } = success.data.data;
			dispatch?.(campaignActions.setCampaign(campaign));
			// dispatch?.(change("AddCouponForm", "coupon_code", ""));
		}

		dispatch?.(campaignActions.setLoading(false));
		return [success, error];
	},

	addCoupons: async (data: any, dispatch?: AppDispatch) => {
		dispatch?.(campaignActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/coupons/generate-multi`, data)
		);

		if (success) {
			const { campaign } = success.data.data;
			dispatch?.(campaignActions.setCampaign(campaign));
		}

		dispatch?.(campaignActions.setLoading(false));
		return [success, error];
	},
};

export default CampaignService;
