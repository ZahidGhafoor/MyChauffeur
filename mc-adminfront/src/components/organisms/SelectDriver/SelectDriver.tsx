import { useEffect } from "react";
import SelectRedux from "components/molecules/SelectRedux";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import DriverService from "services/driver.service";
import { driverActions } from "redux/slices/driver";

export default function SelectDriver(props: any) {
	const dispatch = useAppDispatch();
	const driverOptions = useAppSelector(
		(state) => state.driver.driverOptions
	);
	const partner_id = useAppSelector(
		(state) => state.form?.AssignBooking?.values?.partner
	);

	useEffect(() => {
		if (!partner_id) return;
		DriverService.getPartnerDrivers(partner_id, dispatch);

		return () => {
			dispatch(driverActions.clear());
		};
	}, [dispatch, partner_id]);

	return (
		<SelectRedux
			{...props}
			options={driverOptions}
			disabled={partner_id ? false : true}
		/>
	);
}
