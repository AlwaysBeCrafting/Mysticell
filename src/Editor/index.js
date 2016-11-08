import React from 'react';

import Dropdown from '../common/Dropdown';

import Fields from './Fields';
import Playmat from './Playmat';

// import './Editor.css';



class Editor extends React.Component {
	constructor() {
		super();
		this.state = {
			docIndex: 0
		};
	}
	
	render() {
		let doc = this.props.docs[ this.state.docIndex ];
		return (
			<main id="editor">
				<menu type="toolbar">
					<Dropdown
						onChange={ (item) => { this.setDoc( item.value ) } }
						items={ this.props.docs.map( doc => { return { text: doc.title, value: doc._id }; } )}
					/>
				</menu>
				<div id="document-area">
					<Fields fields={ doc.fields }/>
					<Playmat cards={ doc.cards } sheets={ doc.sheets } />
				</div>
			</main>
		);
	}
	
	setDoc( id ) {
		this.setState( {
			docIndex: this.props.docs.findIndex( (i) => i._id === id )
		} );
	}
}



export default Editor;
