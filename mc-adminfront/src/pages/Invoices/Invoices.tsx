import { Container } from "@mui/material";
import InvoicesList from "./InvoicesList";
import Tabs from "components/templates/Tabs";
import Banner from "components/templates/Banner";
import { invoiceActions } from "redux/slices/invoice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import Button from "components/atoms/Button";
import { MODAL, modalActions } from "redux/slices/modal";

export default function Invoices() {
	const dispatch = useAppDispatch();
	const tab = useAppSelector((state) => state.invoice.tab);

	return (
		<div>
			<Container maxWidth="lg">
				<Banner heading="Invoices">
					{tab === 0 && (
						<Button
							variant="contained"
							onClick={() => {
								dispatch(
									modalActions.openModal({
										width: "500px",
										type: MODAL.CONFIRMATION_FORM,
										data: {
											type: MODAL.GENERATE_ALL_INVOICES,
											heading: "Generate All Invoices",
											message:
												"Do you really want to generate all invoices?",
										},
									})
								);
							}}
						>
							Generate All
						</Button>
					)}
				</Banner>
				<Tabs
					value={tab}
					onChange={(tab) => dispatch(invoiceActions.setTab(tab))}
					tabs={[
						{
							label: "New",
							element: <InvoicesList type="latest" />,
						},
						{
							label: "Processed",
							element: <InvoicesList type="processed" />,
						},
						{
							label: "Completed",
							element: <InvoicesList type="completed" />,
						},
					]}
				/>
			</Container>
		</div>
	);
}
