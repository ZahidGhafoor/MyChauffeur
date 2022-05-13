import { change } from "redux-form";
import YearService from "utils/year.util";
import { useEffect, useState } from "react";
import { SelectOption } from "components/atoms/Select";
import SelectRedux from "components/molecules/SelectRedux";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function SelectProductionYear(props: any) {
	const form = "AddVehicleForm";
	const dispatch = useAppDispatch();
	const [options, setOptions] = useState<SelectOption[]>([]);
	const modelsDetails = useAppSelector(
		(state) => state.class.modelsDetails
	);
	const model_id = useAppSelector(
		(state) => state.form?.[form]?.values?.model_id
	);

	useEffect(() => {
		dispatch(change(form, "year", ""));

		if (!model_id || !modelsDetails[model_id]) return;

		let year = new Date().getFullYear();
		const { max_age, class_name } = modelsDetails[model_id];

		setTimeout(() => {
			setOptions(YearService.getMaxYearsOptions(max_age));

			dispatch(change(form, "year", year));
			dispatch(change(form, "class", class_name));
		}, 0);
	}, [model_id, dispatch, modelsDetails]);

	return <SelectRedux {...props} options={options} disabled={!model_id} />;
}
