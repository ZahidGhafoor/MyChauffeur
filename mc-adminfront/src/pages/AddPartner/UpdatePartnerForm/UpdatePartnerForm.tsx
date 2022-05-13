import { useEffect } from "react";
import { change } from "redux-form";
import { useNavigate } from "react-router-dom";
import { partnerActions } from "redux/slices/partner";
import PartnerService from "services/partner.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function UpdatePartnerForm({ id }: any) {
	const form = "AddPartnerForm";
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const partner = useAppSelector((state) => state.partner.partner);
	const cityOptions = useAppSelector((state) => state.city.cityOptions);

	useEffect(() => {
		PartnerService.getPartner(`${id}`, dispatch);
		return () => {
			dispatch(partnerActions.setPartner(null));
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (
			!partner ||
			partner?.data === "Not Found" ||
			cityOptions.length === 0
		)
			return;
		const {
			title,
			email,
			phone,
			mobile,
			address,
			city_ids,
			last_name,
			first_name,
			VAT_number,
			country_code,
			company_name,
			bank_details,
			billing_address,
			registration_number,
		} = partner;
		let options = cityOptions.filter((city) =>
			city_ids.includes(city.value)
		);
		dispatch(change(form, "city_ids", options));
		dispatch(change(form, "country_code", country_code));
		dispatch(change(form, "company_details.title", title));
		dispatch(change(form, "company_details.email", email));
		dispatch(change(form, "company_details.mobile", mobile));
		dispatch(change(form, "company_details.last_name", last_name));
		dispatch(change(form, "company_details.first_name", first_name));
		dispatch(change(form, "company_details.VAT_number", VAT_number));
		dispatch(change(form, "company_details.phone", { value: phone }));
		dispatch(change(form, "company_details.company_name", company_name));
		dispatch(
			change(
				form,
				"company_details.registration_number",
				registration_number
			)
		);
		if (address) {
			dispatch(change(form, "address.city", address.city));
			dispatch(change(form, "address.street", address.street));
			dispatch(change(form, "address.country", address.country));
			dispatch(change(form, "address.postal_code", address.postal_code));
		}
		if (billing_address) {
			dispatch(change(form, "billing_address.city", billing_address.city));
			dispatch(
				change(form, "billing_address.street", billing_address.street)
			);
			dispatch(
				change(form, "billing_address.country", billing_address.country)
			);
			dispatch(
				change(
					form,
					"billing_address.postal_code",
					billing_address.postal_code
				)
			);
		}
		if (bank_details) {
			dispatch(change(form, "bank_details.bic", bank_details.bic));
			dispatch(change(form, "bank_details.iban", bank_details.iban));
			dispatch(
				change(
					form,
					"bank_details.account_title",
					bank_details.account_title
				)
			);
		}
	}, [partner, cityOptions, navigate, dispatch]);

	return null;
}
