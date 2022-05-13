import CircleLoader from "components/atoms/CircleLoader";
import format from "date-fns/format";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { change } from "redux-form";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import CampaignService from "services/campaign.service";
import UpdateCampaignForm from "./UpdateCampaignForm";

export default function UpdateCampaign() {
	const { id } = useParams();
	const isSet = useRef(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const form = "UpdateCampaignForm";
	const campaign = useAppSelector((state) => state.campaign.campaign);
	const loading = useAppSelector((state) => state.formLoader.loading);
	const cityOptions = useAppSelector((state) => state.city.cityOptions);

	useEffect(() => {
		if (
			isSet.current ||
			cityOptions.length === 0 ||
			!campaign ||
			campaign?.data === "Not Found"
		)
			return;

		const {
			title,
			city,
			usage_type,
			status,
			minimum_price,
			discount,
			end_date,
			start_date,
		} = campaign;

		dispatch(change(form, "city", city));
		dispatch(change(form, "title", title));
		dispatch(change(form, "title", title));
		dispatch(change(form, "usage_type", usage_type));
		dispatch(
			change(form, "date", {
				error: ["", ""],
				date: [start_date, end_date],
			})
		);
		dispatch(change(form, "minimum_price", minimum_price));
		dispatch(change(form, "discount_type", discount.type));
		dispatch(change(form, "discount_value", discount.value));
		dispatch(change(form, "status", status === "active" ? true : false));

		isSet.current = true;
	}, [campaign, navigate, dispatch, cityOptions]);

	const handleSubmit = async (values: any) => {
		let data = { ...values };

		data.status = data.status ? "active" : "inactive";
		data.start_date = format(
			new Date(data.date.date[0]),
			"yyyy-MM-dd HH:mm:ss.SSSSSS"
		);
		data.end_date = format(
			new Date(data.date.date[1]),
			"yyyy-MM-dd HH:mm:ss.SSSSSS"
		);

		delete data.date;

		CampaignService.updateCampaign(`${id}`, data, dispatch);
	};

	return (
		<div>
			<div style={{ position: "relative" }}>
				{loading && <CircleLoader />}
				<h3 style={{ marginTop: "0" }}>Update Campaign</h3>
				<UpdateCampaignForm onSubmit={handleSubmit} />
			</div>
		</div>
	);
}
