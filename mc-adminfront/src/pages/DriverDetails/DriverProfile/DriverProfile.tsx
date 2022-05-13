import UserImg from "assets/user.png";
import profileStyles from "./DriverProfile.module.css";
import StatusUpdateChip from "components/atoms/StatusUpdateChip";
import { Chip, Grid } from "@mui/material";

export default function DriverProfile({ driver }: any) {
	const {
		_id,
		title,
		email,
		phone,
		status,
		last_name,
		first_name,
		profile_pic,
		languages,
		partner_id,
	} = driver;
	return (
		<>
			<StatusUpdateChip
				label={status}
				menu={["Approved", "Rejected"]}
				data={{ id: _id, type: "driver" }}
			/>
			<div className={profileStyles.imageMain}>
				<div className={profileStyles.imageInner}>
					<img
						loading="lazy"
						src={profile_pic.url || UserImg}
						alt={`${first_name} ${last_name}`}
					/>
					{/* <div className={profileStyles.status}>
						<i className="highlight positive-medium"></i>
					</div> */}
				</div>
			</div>
			<div className={profileStyles.information}>
				<div className={profileStyles.fieldBox}>
					<h3>{`${title} ${first_name} ${last_name}`}</h3>
				</div>
				<Grid container>
					<Grid item md={4}>
						<div className={profileStyles.fieldBox}>
							<label htmlFor="">Email</label>
							<p>{email}</p>
						</div>
						<div className={profileStyles.fieldBox}>
							<label htmlFor="">Phone</label>
							<p>{phone}</p>
						</div>
						<div className={profileStyles.fieldBox}>
							{languages.map((item: any, index: any) => (
								<Chip
									label={item}
									key={index}
									size="small"
									variant="filled"
									sx={{ marginRight: "4px" }}
								/>
							))}
						</div>
					</Grid>

					<Grid item md={4}>
						<div className={profileStyles.fieldBox}>
							<label htmlFor="">Partner</label>
							<p>{partner_id.company_name}</p>
							<p>
								{partner_id.title} {partner_id.first_name}{" "}
								{partner_id.last_name}
							</p>
							<p>{partner_id.phone}</p>
							<p>{partner_id.email}</p>
						</div>
					</Grid>
				</Grid>
			</div>
		</>
	);
}
