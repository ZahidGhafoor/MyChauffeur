import { Grid } from "@mui/material";
import StatusUpdateChip from "components/atoms/StatusUpdateChip";
import profileStyles from "./VehicleProfile.module.css";

export default function VehicleProfile({ vehicle }: any) {
  const {
    _id,
    year,
    model,
    color,
    status,
    license_plate,
    class_id,
    partner_id,
  } = vehicle;
  return (
    <>
      <StatusUpdateChip
        label={status}
        menu={["Approved", "Rejected"]}
        data={{ id: _id, type: "vehicle" }}
      />
      <div className={profileStyles.information}>
        <div className={profileStyles.fieldBox}>
          <h3>{license_plate}</h3>
        </div>
        <Grid container>
          <Grid item md={4}>
            <div className={profileStyles.fieldBox}>
              <label htmlFor="">Model</label>
              <p>{model}</p>
            </div>
            <div className={profileStyles.fieldBox}>
              <label htmlFor="">Color</label>
              <p>{color}</p>
            </div>
          </Grid>
          <Grid item md={4}>
            <div className={profileStyles.fieldBox}>
              <label htmlFor="">Produced in</label>
              <p>{year}</p>
            </div>
            <div className={profileStyles.fieldBox}>
              <label htmlFor="">Service Class</label>
              <p>{class_id?.name}</p>
            </div>
          </Grid>
          <Grid item md={4}>
            <div className={profileStyles.fieldBox}>
              <label htmlFor="">Partner</label>
              <p>{partner_id.company_name}</p>
              <p>
                {partner_id.title}{" "}
                {partner_id.first_name}{" "}
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
