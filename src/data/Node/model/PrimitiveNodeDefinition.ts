import { Param } from './Param';


interface PrimitiveNodeDefinition {
	name: string;
		inputNames: string[];
		outputNames: string[];
	exec: ( ...params: Param[] ) => Param[];
}


export { PrimitiveNodeDefinition };
export default PrimitiveNodeDefinition;
