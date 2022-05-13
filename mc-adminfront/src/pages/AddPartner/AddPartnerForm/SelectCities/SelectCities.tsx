import { useEffect } from "react";
import CityService from "services/city.service";
import { cityActions } from "redux/slices/city";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import ComboBoxRedux from "components/molecules/ComboBoxRedux";

export default function SelectCities(props: any) {
	const dispatch = useAppDispatch();
	const cityOptions = useAppSelector((state) => state.city.cityOptions);

	useEffect(() => {
		CityService.getAllCities(dispatch);
		return () => {
			dispatch(cityActions.clear());
		};
	}, [dispatch]);

	return <ComboBoxRedux {...props} options={cityOptions} />;
}
