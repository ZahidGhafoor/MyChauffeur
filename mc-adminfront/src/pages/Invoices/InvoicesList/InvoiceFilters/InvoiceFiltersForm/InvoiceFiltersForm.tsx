import { fields } from ".";
import { Grid } from "@mui/material";
import { useAppDispatch } from "redux/hooks";
import Button from "components/atoms/Button";
import useEffectOnce from "hooks/useEffectOnce";
import { invoiceActions } from "redux/slices/invoice";
import { change, reduxForm, reset } from "redux-form";
import ReduxFormFields from "components/molecules/ReduxFormFields";

const InvoiceFiltersForm = ({ form, handleSubmit }: any) => {
	const dispatch = useAppDispatch();

	useEffectOnce(() => {
		dispatch(
			change(form, "invoice_month", {
				date: new Date().toString(),
				error: false,
			})
		);
	});

	return (
		<form onSubmit={handleSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={7} md={9}>
					<ReduxFormFields fields={fields} />
				</Grid>
				<Grid item xs={4} sm={2} md={1}>
					<Button
						color="primary"
						variant="outlined"
						type="reset"
						fullWidth
						sx={{ height: "100%" }}
						onClick={() => {
							dispatch(invoiceActions.resetFilters());
							dispatch(reset(form));
							dispatch(
								change(form, "invoice_month", {
									date: new Date().toString(),
									error: false,
								})
							);
						}}
					>
						Reset
					</Button>
				</Grid>
				<Grid item xs={5} sm={3} md={2}>
					<Button
						color="primary"
						variant="contained"
						type="submit"
						fullWidth
						sx={{ height: "100%" }}
					>
						Submit
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default reduxForm({ form: "InvoiceFiltersForm" })(
	InvoiceFiltersForm
);
