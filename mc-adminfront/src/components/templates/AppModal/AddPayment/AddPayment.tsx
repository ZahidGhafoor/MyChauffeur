import Tabs from "../../Tabs";
import { useState } from "react";
import AddPaypal from "./AddPaypal";
import AddPaymentForm from "./AddPaymentForm";

export default function AddPayment() {
	const [tab, setTab] = useState(0);

	const handleSubmit = (values: any) => {};

	return (
		<div>
			<h3>Payment method</h3>
			<Tabs
				value={tab}
				onChange={setTab}
				tabs={[
					{
						label: "Card",
						element: <AddPaymentForm onSubmit={handleSubmit} />,
					},
					{ label: "Paypal", element: <AddPaypal /> },
				]}
			/>
		</div>
	);
}
