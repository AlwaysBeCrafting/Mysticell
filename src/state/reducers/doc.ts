import loadFromJSON from 'data/doc';
import DocJSON from 'data/docJson';

import AppState from 'state';
import Action from 'state/action';

import reduceFields from 'state/reducers/fields';
import reduceNodes from 'state/reducers/nodes';

const exampleDoc = require<DocJSON>( 'data/exampleDoc.json' );

//------------------------------------------------------------------------------

export default ( docState: AppState = loadFromJSON( exampleDoc ), action: Action ) => ({
	...docState,
	fields: reduceFields( docState.fields, action ),
	nodes: reduceNodes( docState.nodes, action ),
});
