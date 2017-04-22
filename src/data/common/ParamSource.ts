// All sources have a userValue so it can be persisted between connection changes

interface NodeParamSource {
	type: 'node';
	id: string;
	index: number;
	userValue: string;
}


interface GraphParamSource {
	type: 'graph';
	index: number;
	userValue: string;
}


interface ValueParamSource {
	type: 'value';
	userValue: string;
}

type ConnectedParamSource = NodeParamSource | GraphParamSource;
type ParamSource = ConnectedParamSource | ValueParamSource;


export { ConnectedParamSource, ValueParamSource, ParamSource };
export default ParamSource;
