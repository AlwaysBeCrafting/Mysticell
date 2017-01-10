import * as React from 'react';
import { connect as reduxConnect } from 'react-redux';

import { Fxn, fxnList } from 'data/fxn';

import { NodeState } from 'state';
import Action from 'state/action';

interface AddNodeMenuDispatch {
	dispatch: ( action: Action ) => void;
}

const AddNodeMenu = ( props: AddNodeMenuDispatch ) => <ul> {
	fxnList.map( fxn =>
		<li>{ fxn.name }</li>,
	)
} </ul>;

export default reduxConnect(
	() => ({}),
	dispatch => ({ dispatch }),
)( AddNodeMenu );
