interface InputConnector {
	id: string;
	type: 'input';
	index: number;
}


interface OutputConnector {
	id: string;
	type: 'output';
	index: number;
}


type Connector = InputConnector | OutputConnector;


export { Connector, InputConnector, OutputConnector };
export default Connector;
