import { Connector } from './Connector';


export interface Connection {
	from: Connector;
	to: Connector;
}


export { Connector };
export default Connector;
