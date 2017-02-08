import * as React from "react";
import { connect as reduxConnect } from "react-redux";

import { Fxn, fxnList } from "common/types/fxn";
import { createNode } from "common/types/generator";

import { Action } from "data";
import { addNode } from "data/document/nodes/collection";

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
				<li
					key={ i }
					onClick={ ev => {
						const node = createNode( props.fieldId, fxn );
						props.dispatch( addNode( props.fieldId, node ));
					}}
				>
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
