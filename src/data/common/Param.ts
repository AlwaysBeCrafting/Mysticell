interface NumberParam {
	type: "number";
	value: number;
}

interface StringParam {
	type: "string";
	value: string;
}

interface EmptyParam {
	type: "empty";
	value: undefined;
}

interface ArrayParam {
	type: "array";
	value: Param[];
}

interface ErrorParam {
	type: "error";
	value: "ERR";
	message: string;
}

type Param =
	| NumberParam
	| StringParam
	| EmptyParam
	| ArrayParam
	| ErrorParam;

const params = {
	number: (value: number): NumberParam => ({
		type: "number",
		value,
	}),
	string: (value: string): StringParam => ({
		type: "string",
		value,
	}),
	empty: (): EmptyParam => ({
		type: "empty",
		value: undefined,
	}),
	array: (value: Param[]) => ({
		type: "array",
		value,
	}),
	error: (message: string): ErrorParam => ({
		type: "error",
		value: "ERR",
		message,
	}),
};


export { Param, ErrorParam, params };
