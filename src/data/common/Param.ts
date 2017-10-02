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
	value: string;
	message: string;
}

type Param =
	| NumberParam
	| StringParam
	| EmptyParam
	| ArrayParam
	| ErrorParam;

const PARAMS = {
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
	array: (value: Param[]): ArrayParam => ({
		type: "array",
		value,
	}),
	error: (value: string, message: string): ErrorParam => ({
		type: "error",
		value,
		message,
	}),
};

type ParamFunction = (...params: Param[]) => Param[];


export { Param, ErrorParam, PARAMS, ParamFunction };
export { NumberParam };
