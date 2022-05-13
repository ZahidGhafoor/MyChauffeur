import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PartnerService from "services/partner.service";
import { partnerActions } from "redux/slices/partner";
import SelectRedux from "components/molecules/SelectRedux";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function SelectPartner(props: any) {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const partnerOptions = useAppSelector(
		(state) => state.partner.partnerOptions
	);

	useEffect(() => {
		PartnerService.getAllPartners(dispatch);

		return () => {
			dispatch(partnerActions.clear());
		};
	}, [dispatch]);

	return (
		<SelectRedux
			{...props}
			options={partnerOptions}
			disabled={id ? true : false}
		/>
	);
}
