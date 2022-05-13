import AddClassForm from "./AddClassForm";
import GoBack from "components/atoms/GoBack";
import Container from "@mui/material/Container";
import UpdateClassForm from "./UpdateClassForm";
import Banner from "components/templates/Banner";
import ClassService from "services/class.service";
import ImageService from "services/image.service";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import CircleLoader from "components/atoms/CircleLoader";
export default function AddClass() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const classs = useAppSelector((state) => state.class.classs);
	const loading = useAppSelector((state) => state.formLoader.loading);

	const handleSubmit = async (values: any) => {
		const {
			name,
			text,
			rank,
			image,
			city_id,
			max_bags,
			is_active,
			max_persons,
		} = values;
		let formData = new FormData();
		let active = is_active ? true : false;
		if (!image?.image) {
			let img = await ImageService.getImageFileFromBlob(image);
			formData.append("image", img);
		}
		formData.append("name", name);
		formData.append("text", text);
		formData.append("rank", rank);
		formData.append("city_id", city_id);
		formData.append("max_bags", max_bags);
		formData.append("is_active", `${active}`);
		formData.append("max_persons", max_persons);
		if (id)
			ClassService.updateClass(`${id}`, formData, dispatch, navigate);
		else ClassService.addClass(formData, dispatch, navigate);
	};
	return (
		<div>
			<Container>
				<GoBack path="/class" title="Back to Class" />
				<Banner heading={`${id ? "Update" : "Add"} Class `} />
				<div className="form">
					{loading && <CircleLoader />}
					{classs?.data === "Not Found" ? (
						<p>Class Not Found</p>
					) : (
						<AddClassForm onSubmit={handleSubmit} />
					)}
					{id && <UpdateClassForm id={id} />}
				</div>
			</Container>
		</div>
	);
}
