import classnames from "classnames";
import React from "react";

import {Dict, Tree} from "common/types";

import {TreeView} from "components/molecules";

import {Formula} from "data/Formula";
import {NavItem} from "data/Nav";

import functionIcon from "./assets/icon-function.svg";
import "./NavView.scss";


interface Props {
	className?: string;
	formulas: Dict<Formula>;
	nav: Tree<NavItem>;
}

const NavView = (props: Props) => (
	<TreeView
		className={classnames("navView", props.className)}
		tree={props.nav}
		getKey={item => item.type === "dir" ? item.name : item.id}
		getName={item => item.type === "dir" ? item.name : props.formulas[item.id].name}
		getIcon={item => item.type === "end" ? functionIcon : undefined}
		isExpanded={_ => true}
	/>
);


export {NavView};
