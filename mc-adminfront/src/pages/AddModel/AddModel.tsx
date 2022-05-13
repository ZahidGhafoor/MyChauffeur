import AddModelForm from "./AddModelForm";
import GoBack from "components/atoms/GoBack";
import Container from "@mui/material/Container";
import UpdateModelForm from "./UpdateModelForm";
import Banner from "components/templates/Banner";
import ModelService from "services/model.service";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import CircleLoader from "components/atoms/CircleLoader";

export default function AddModel() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const model = useAppSelector((state) => state.model.model);
	const loading = useAppSelector((state) => state.formLoader.loading);

	const handleSubmit = async (values: any) => {
		let data = { ...values };
		data.is_active = data.is_active ? data.is_active : false;
		delete data.city_id;

		if (id) {
			delete data.class_id;
			ModelService.updateModel(`${id}`, data, dispatch, navigate);
		} else ModelService.addModel(data, dispatch, navigate);
	};

	return (
		<div>
			<Container>
				<GoBack path="/models" title="Back to Models" />
				<Banner heading={`${id ? "Update" : "Add"} Model`} />
				<div className="form">
					{loading && <CircleLoader />}
					{model?.data === "Not Found" ? (
						<p>Model Not Found</p>
					) : (
						<AddModelForm onSubmit={handleSubmit} />
					)}
					{id && <UpdateModelForm id={id} />}
				</div>
			</Container>
		</div>
	);
}
