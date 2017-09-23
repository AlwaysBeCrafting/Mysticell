import {Dict, isBranch, isLeaf} from "common/types";
import {resolvePath} from "common/utils";

import {Formula} from "data/Formula";
import {Nav} from "data/Nav";


const pathToFormula = (formulas: Dict<Formula>, nav: Nav, path: string[]) => {
	const formulaBranch = resolvePath(nav, path.slice(0, -1));
	const [formulaName] = path.slice(-1);

	if (!isBranch(formulaBranch)) { return undefined; }
	const formulaLeaf = formulaBranch.children
		.find(child => formulas[child.value].name === formulaName);

	if (!isLeaf(formulaLeaf)) { return undefined; }

	return formulas[formulaLeaf.value];
};


export {pathToFormula};
