import { useEffect } from "react";
import { classActions } from "redux/slices/class";
import ClassService from "services/class.service";
import SelectRedux from "components/molecules/SelectRedux";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function SelectClass(props: any) {
	const dispatch = useAppDispatch();
	const classesOptions = useAppSelector(
		(state) => state.class.classesOptions
	);

	useEffect(() => {
		ClassService.getAllClasses(dispatch);

		return () => {
			dispatch(classActions.clear());
		};
	}, [dispatch]);

	return <SelectRedux {...props} options={classesOptions} />;
}
