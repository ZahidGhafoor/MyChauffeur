import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";
import UserService from "services/user.service";
import BillingAddressForm from "./BillingAddressForm";
import CircleLoader from "components/atoms/CircleLoader";

export default function BillingAddress() {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (values: any) => {
		setLoading(true);
		await UserService.updateBillingAddress(`${id}`, values, dispatch);
		setLoading(false);
	};

	return (
		<div style={{ position: "relative" }}>
			{loading && <CircleLoader />}
			<BillingAddressForm onSubmit={handleSubmit} />
		</div>
	);
}
