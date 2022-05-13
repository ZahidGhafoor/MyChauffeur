import styles from "../PartnerDetails.module.css";
import DocsTable from "components/templates/DocsTable";

export default function PartnerDocuments({ partner }: any) {
	const {
		id_card,
		profile_pic,
		VAT_registration,
		business_registration,
		certificate_of_approval,
		public_liability_insurance,
	} = partner;
	const docs = [
		{ var_name: "VAT_registration", ...VAT_registration },
		{ var_name: "business_registration", ...business_registration },
		{
			var_name: "public_liability_insurance",
			...public_liability_insurance,
		},
		{ var_name: "id_card", ...id_card },
		{ var_name: "certificate_of_approval", ...certificate_of_approval },
		{ var_name: "profile_pic", ...profile_pic },
	];

	return (
		<>
			<h3 className={styles.heading}>Documents</h3>
			<DocsTable docs={docs} type="partner" />
		</>
	);
}
