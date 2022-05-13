import CircleLoader from "components/atoms/CircleLoader";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { change } from "redux-form";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import UserService from "services/user.service";
import UpdateProfileForm from "./UpdateUserProfileForm";

export default function UpdateUserProfile() {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const form = "UpdateUserProfileForm";
	const [loading, setLoading] = useState(false);
	const user = useAppSelector((state) => state.user.user);

	useEffect(() => {
		if (!user) return;

		const { title, first_name, last_name, email, phone, billing_address } =
			user;

		dispatch(change(form, "title", title));
		dispatch(change(form, "first_name", first_name));
		dispatch(change(form, "last_name", last_name));
		dispatch(change(form, "email", email));
		dispatch(change(form, "phone", { value: phone }));

		if (billing_address?.name) {
			const { name, city, country, postal_number, street_address } =
				billing_address;

			dispatch(change("BillingAddressForm", "name", name));
			dispatch(change("BillingAddressForm", "city", city));
			dispatch(change("BillingAddressForm", "country", country));
			dispatch(
				change("BillingAddressForm", "postal_number", postal_number)
			);
			dispatch(
				change("BillingAddressForm", "street_address", street_address)
			);
		}
	}, [dispatch, user]);

	const handleSubmit = async (values: any) => {
		let data = { ...values };

		if (data.phone?.data) {
			data.phone = `+${values.phone.value}`;
			data.country = values.phone.data.countryCode;
			data.country_code = `+${values.phone.data.dialCode}`;
		} else {
			data.country = "false";
			data.phone = values.phone.value;
			data.country_code = user.country_code;
		}

		setLoading(true);
		await UserService.updateUser(`${id}`, data, dispatch);
		setLoading(false);
	};

	return (
		<div style={{ position: "relative" }}>
			{loading && <CircleLoader />}
			<UpdateProfileForm onSubmit={handleSubmit} />
		</div>
	);
}
