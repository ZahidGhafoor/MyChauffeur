import { useEffect } from "react";
import ClassService from "services/class.service";
import SelectRedux from "components/molecules/SelectRedux";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { classActions } from "redux/slices/class";

export default function SelectModel(props: any) {
	const dispatch = useAppDispatch();
	const modelOptions = useAppSelector((state) => state.class.modelOptions);

	useEffect(() => {
		ClassService.getAllClasses(dispatch);

		return () => {
			dispatch(classActions.clear());
		};
	}, [dispatch]);

	return <SelectRedux {...props} options={modelOptions} />;
}
