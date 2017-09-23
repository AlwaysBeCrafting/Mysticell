import {Tree} from "common/types";


interface NavBranch {
	id: string;
	name: string;
}
type Nav = Tree<NavBranch, string>;


export {Nav, NavBranch};
