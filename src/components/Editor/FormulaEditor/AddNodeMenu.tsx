import * as React from 'react';
import { connect as reduxConnect } from 'react-redux';

import { Fxn, fxnList } from 'data/fxn';

import { NodeState } from 'state';
import Action from 'state/action';
import addNode from 'state/action/addNode';
import { createNode } from 'state/generator';

import './AddNodeMenu.less';

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
						const node = createNode( fxn );
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
