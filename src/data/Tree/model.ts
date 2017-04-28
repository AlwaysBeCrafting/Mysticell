import { Id } from 'common/types';


interface TreeItem extends Id {
	children: TreeItem[];
}


export { TreeItem };
export default TreeItem;
