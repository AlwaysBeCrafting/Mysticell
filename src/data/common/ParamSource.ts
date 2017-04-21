// All sources have a userValue so it can be persisted between connection changes

interface MemberParamSource {
	type: 'member';
	id: string;
	index: number;
	userValue: string;
}


interface ParentParamSource {
	type: 'parent';
	index: number;
	userValue: string;
}


interface ValueParamSource {
	type: 'value';
	userValue: string;
}

type ConnectedParamSource = MemberParamSource | ParentParamSource;
type ParamSource = ConnectedParamSource | ValueParamSource;


export { ConnectedParamSource, ValueParamSource, ParamSource };
export default ParamSource;
