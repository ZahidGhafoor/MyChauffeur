import { useEffect } from "react";
import CityService from "services/city.service";
import { cityActions } from "redux/slices/city";
import SelectRedux from "components/molecules/SelectRedux";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function SelectCity(props: any) {
	const dispatch = useAppDispatch();
	const cityOptions = useAppSelector((state) => state.city.cityOptions);

	useEffect(() => {
		CityService.getAllCities(dispatch);

		return () => {
			dispatch(cityActions.clear());
		};
	}, [dispatch]);

	return <SelectRedux {...props} options={cityOptions} />;
}
