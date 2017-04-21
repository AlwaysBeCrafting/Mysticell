import { InputConnector, OutputConnector } from './Connector';


interface Connection {
	from: OutputConnector;
	to: InputConnector;
}


export { Connection };
export default Connection;
