import { useEffect } from "react";
import DriverService from "services/driver.service";
import SelectRedux from "components/molecules/SelectRedux";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function SelectDriver(props: any) {
	const dispatch = useAppDispatch();
	const driverOptions = useAppSelector(
		(state) => state.driver.driverOptions
	);

	useEffect(() => {
		DriverService.getAllDrivers(dispatch);
	}, [dispatch]);

	return <SelectRedux {...props} options={driverOptions} />;
}
