const ObjectService = {
	getObjectPropertiesSum: (values: any) => {
		let sum = 0;

		for (const key in values) {
			if (Object.prototype.hasOwnProperty.call(values, key)) {
				const element = values[key];
				sum += Number(element);
			}
		}

		return sum;
	},
};

export default ObjectService;
