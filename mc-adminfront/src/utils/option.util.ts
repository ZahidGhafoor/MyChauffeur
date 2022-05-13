import { SelectOption } from "components/atoms/Select";

const OptionService = {
	getOptions: (range: number, start: number = 0) => {
		let options: SelectOption[] = [];
		for (let i = start; i < range + start; i++) {
			options.push({ value: `${i}`, label: `${i}` });
		}

		return options;
	},
	getLanguageOptions: () => {
		return [
			{ value: "Deutsch", label: "Deutsch" },
			{ value: "English", label: "English" },
			{ value: "French", label: "French" },
			{ value: "Spanish", label: "Spanish" },
			{ value: "Russian", label: "Russian" },
			{ value: "Turkish", label: "Turkish" },
			{ value: "Greek", label: "Greek" },
			{ value: "Croatian", label: "Croatian" },
			{ value: "Arabic", label: "Arabic" },
			{ value: "Portuguese", label: "Portuguese" },
			{ value: "Italian", label: "Italian" },
			{ value: "Chineese", label: "Chineese" },
			{ value: "Japanese", label: "Japanese" },
			{ value: "Polish", label: "Polish" },
			{ value: "Hebrew", label: "Hebrew" },
			{ value: "Finnish", label: "Finnish" },
		];
	},
};

export default OptionService;
