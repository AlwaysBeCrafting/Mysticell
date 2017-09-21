import classnames from "classnames";
import React from "react";
import {Link} from "react-router-dom";

import {Dict, Tree} from "common/types";

import {TreeView} from "components/molecules";

import {Formula} from "data/Formula";
import {NavItem} from "data/Nav";

import functionIcon from "./assets/icon-function.svg";
import "./NavView.scss";


interface Props {
	className?: string;
	formulas: Dict<Formula>;
	nav: Array<Tree<NavItem>>;
}

const NavView = (props: Props) => (
	<TreeView
		className={classnames("navView", props.className)}
		tree={props.nav}
		getKey={item => item.type === "dir" ? item.name : item.id}
		renderItem={renderItem(props.formulas)}
	/>
);

const renderItem = (formulas: Dict<Formula>) => (item: NavItem) => (
	item.type === "dir"
		? renderDirItem(item.name)
		: renderEndItem(formulas[item.id])
);

const renderDirItem = (name: string) => (
	<div className="navView-item">
		<span className="navView-item-icon icon">arrow_drop_down</span>
		<span className="navView-item-title">{name}</span>
	</div>
);

const renderEndItem = (formula: Formula) => (
	<div className="navView-item">
		<img className="navView-item-icon icon" src={functionIcon} />
		<Link className="navView-item-title" to={`/formula/${formula.id}`}>{formula.name}</Link>
	</div>
);


export {NavView};
