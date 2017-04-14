import Node from './Node';
import Param from './Param';


export interface PrimitiveNode extends Node {
	exec: ( ...params: Param[] ) => Param[];
}

export default PrimitiveNode;
