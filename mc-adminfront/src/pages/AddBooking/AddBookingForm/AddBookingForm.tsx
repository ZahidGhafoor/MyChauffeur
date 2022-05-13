import { Grid } from "@mui/material";
import Calculations from "./Calculations";
import Button from "components/atoms/Button";
import { change, Field, reduxForm } from "redux-form";
import { MODAL, modalActions } from "redux/slices/modal";
import ReduxFormFields from "components/molecules/ReduxFormFields";
import {
	additional_fields_left,
	additional_fields_right,
	fields,
	fieldsAfter,
} from ".";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { required, requiredAutoComplete } from "utils/validate.util";
import AutoCompleteRedux from "components/molecules/AutoCompleteRedux";
import InputRedux from "components/molecules/InputRedux";
import OptionService from "utils/option.util";
import SelectRedux from "components/molecules/SelectRedux";

function AddBookingForm({ handleSubmit }: any) {
	const dispatch = useAppDispatch();
	const form = "AddBookingForm";
	const hourly = useAppSelector(
		(state) => state.form?.[form]?.values?.hourly
	);
	const child_seats = useAppSelector(
		(state) => state.form?.[form]?.values?.child_seats
	);

	const onClickSeats = () => {
		dispatch(
			modalActions.openModal({
				type: MODAL.CHILDREN_SEATS,
				data: "",
				width: "500px",
			})
		);
		if (child_seats) {
			dispatch(
				change(
					"ChildrenSeatsForm",
					"one_to_three_years",
					child_seats.one_to_three_years
				)
			);
			dispatch(
				change(
					"ChildrenSeatsForm",
					"three_to_six_years",
					child_seats.three_to_six_years
				)
			);
			dispatch(
				change(
					"ChildrenSeatsForm",
					"six_to_twelve_years",
					child_seats.six_to_twelve_years
				)
			);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<ReduxFormFields fields={fields} />
				<Grid container spacing={2}>
					<Grid item md={5} lg={5}>
						<Field
							name={"pickup"}
							label={"Pickup"}
							validate={[requiredAutoComplete]}
							component={AutoCompleteRedux}
						/>
					</Grid>
					{!hourly ? (
						<>
							<Grid item md={5} lg={5}>
								<Field
									name={"destination"}
									label={"Destination"}
									validate={[requiredAutoComplete]}
									component={AutoCompleteRedux}
								/>
							</Grid>
							<Grid item md={2} lg={2}>
								<Field
									disabled={true}
									name={"distance"}
									label={"Distance"}
									validate={[required]}
									component={InputRedux}
								/>
							</Grid>
						</>
					) : (
						<>
							<Grid item md={5} lg={5}>
								<Field
									name={"duration"}
									label={"Duration"}
									validate={[required]}
									component={SelectRedux}
									options={OptionService.getOptions(23, 2)}
								/>
							</Grid>
							<Grid item md={2} lg={2}>
								<Field
									disabled={true}
									name={"max_km"}
									label={"Max KM"}
									component={InputRedux}
								/>
							</Grid>
						</>
					)}
				</Grid>
				<br />
				<ReduxFormFields fields={fieldsAfter} />
				<h3>Customer Information</h3>
				<Grid container spacing={2}>
					<Grid item md={6}>
						<ReduxFormFields fields={additional_fields_left} />
					</Grid>
					<Grid item md={6}>
						<ReduxFormFields fields={additional_fields_right} />
						<p>
							{child_seats && Object.keys(child_seats).length > 0 && (
								<>
									{child_seats?.one_to_three_years > 0 && (
										<>
											<span>
												1-3 years (9-18kg):{" "}
												<b>{child_seats?.one_to_three_years}</b>
											</span>
											<br />
										</>
									)}
									{child_seats?.three_to_six_years > 0 && (
										<>
											<span>
												3-6 years (15-25kg):{" "}
												<b>{child_seats?.three_to_six_years}</b>
											</span>
											<br />
										</>
									)}
									{child_seats?.six_to_twelve_years > 0 && (
										<span>
											6-12 years (22-36kg):{" "}
											<b>{child_seats?.six_to_twelve_years}</b>
										</span>
									)}
								</>
							)}
						</p>
						<Button color="primary" variant="text" onClick={onClickSeats}>
							{child_seats && Object.keys(child_seats).length > 0
								? "Update "
								: "+ Add "}
							children seats?
						</Button>
					</Grid>
				</Grid>
				<br />
				<Button color="primary" variant="contained" type="submit">
					Submit
				</Button>
				<Calculations />
			</form>
		</div>
	);
}

export default reduxForm({ form: "AddBookingForm" })(AddBookingForm);
