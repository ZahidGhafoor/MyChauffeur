import ProfilePicture from "assets/user.png";
import StatusUpdateChip from "components/atoms/StatusUpdateChip";
// import styles from "../PartnerDetails.module.css";
import profileStyles from "./PartnerProfile.module.css";

export default function PartnerProfile({ partner }: any) {
	const {
		_id,
		title = "",
		email,
		phone,
		status,
		last_name,
		first_name,
		profile_pic,
		company_name,
	} = partner;
	return (
		<>
			<StatusUpdateChip
				label={status}
				menu={["Approved", "Rejected"]}
				data={{ id: _id, type: "partner" }}
			/>
			{/* <h3 className={styles.heading}>Personal Information</h3> */}
			<div className={profileStyles.imageMain}>
				<div className={profileStyles.imageInner}>
					<img
						loading="lazy"
						src={profile_pic.url || ProfilePicture}
						alt={`${title} ${first_name} ${last_name}`}
					/>
				</div>
			</div>
			<div className={profileStyles.information}>
				<div className={profileStyles.fieldBox}>
					<h3>{`${title} ${first_name} ${last_name}`}</h3>
					<p>{company_name}</p>
				</div>
				<div className={profileStyles.fieldBox}>
					<label htmlFor="">Email</label>
					<p>{email}</p>
				</div>
				<div className={profileStyles.fieldBox}>
					<label htmlFor="">Phone</label>
					<p>{phone}</p>
				</div>
			</div>
		</>
	);
}
