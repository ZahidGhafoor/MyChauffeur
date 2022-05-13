import Button from "components/atoms/Button";
import { modalActions } from "redux/slices/modal";
import DriverService from "services/driver.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function DisableModal() {
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.modal.data);

	const onClickYes = async () =>
		DriverService.enableDriver(data._id, dispatch);

	return (
		<div>
			<h3>{data.is_enabled ? "Disable" : "Enable"} Chauffeur</h3>
			<p>
				Do you really want to {data.is_enabled ? "disable" : "enable"} this
				chauffeur?
			</p>
			<Button
				variant="outlined"
				sx={{ marginRight: "10px" }}
				onClick={() => dispatch(modalActions.closeModal())}
			>
				No
			</Button>
			<Button variant="contained" onClick={onClickYes}>
				Yes
			</Button>
		</div>
	);
}
