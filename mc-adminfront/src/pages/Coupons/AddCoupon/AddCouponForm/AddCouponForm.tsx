import { fields } from ".";
import { reduxForm } from "redux-form";
import Button from "components/atoms/Button";
import ReduxFormFields from "components/molecules/ReduxFormFields";

function AddCouponForm({ handleSubmit }: any) {
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="coupon-form">
					<ReduxFormFields fields={fields} />
					<Button
						color="primary"
						variant="contained"
						type="submit"
						sx={{
							marginLeft: "-4px",
							boxShadow: "none",
							padding: "8px 16px",
							borderTopLeftRadius: 0,
							borderBottomLeftRadius: 0,
						}}
					>
						Add
					</Button>
				</div>
			</form>
		</div>
	);
}

export default reduxForm({ form: "AddCouponForm" })(AddCouponForm);
