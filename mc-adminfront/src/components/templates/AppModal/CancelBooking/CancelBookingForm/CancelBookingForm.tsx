import { fields } from ".";
import { Grid } from "@mui/material";
import Button from "components/atoms/Button";
import { Field, reduxForm } from "redux-form";
import { required } from "utils/validate.util";
import { decimal } from "utils/normalize.util";
import { modalActions } from "redux/slices/modal";
import InputRedux from "components/molecules/InputRedux";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import CheckboxRedux from "components/molecules/CheckboxRedux";
import ReduxFormFields from "components/molecules/ReduxFormFields";

function CancelBookingForm({ form, handleSubmit }: any) {
	const dispatch = useAppDispatch();
	const isPay_driver = useAppSelector(
		(state) => state.form?.[form]?.values?.isPay_driver
	);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<ReduxFormFields fields={fields} />
				<br />
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Field
							name="isPay_driver"
							label="Pay Driver"
							component={CheckboxRedux}
						/>
					</Grid>
					{isPay_driver && (
						<Grid item xs={12}>
							<Field
								name="driver_price"
								label="Price"
								normalize={decimal}
								validate={[required]}
								component={InputRedux}
								InputProps={{ InputProps: { endAdornment: "€" } }}
							/>
						</Grid>
					)}
				</Grid>
				<br />
				<Button
					variant="outlined"
					sx={{ marginRight: "10px" }}
					onClick={() => dispatch(modalActions.closeModal())}
				>
					Cancel
				</Button>
				<Button type="submit" variant="contained">
					Submit
				</Button>
			</form>
		</div>
	);
}

export default reduxForm({ form: "CancelBookingForm" })(CancelBookingForm);
