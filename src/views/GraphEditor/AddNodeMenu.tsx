import * as React from "react";
import { connect as reduxConnect } from "react-redux";

import { Fxn, fxnList } from "common/types/fxn";

import { Action } from "data";

import "./AddNodeMenu.less";


interface AddNodeMenuAttributes {
	fieldId: number;
}

interface AddNodeMenuDispatch {
	dispatch: ( action: Action ) => void;
}

type AddNodeMenuProps = AddNodeMenuAttributes & AddNodeMenuDispatch;


const AddNodeMenu = ( props: AddNodeMenuProps ) => (
	<ul className="add-node-menu">
		{
			fxnList.map(( fxn, i ) => (
				<li key={ i }>
					{ fxn.name }
				</li>
			))
		}
	</ul>
);


export default reduxConnect<{}, {}, AddNodeMenuAttributes>(
	() => ({}),
	dispatch => ({ dispatch }),
)( AddNodeMenu );
