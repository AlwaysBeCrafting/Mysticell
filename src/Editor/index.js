import React from 'react';

import Fields from './Fields';
import Playmat from './Playmat';

import './index.less';



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
				<div id="document-area">
					<Fields fields={ doc.fields }/>
					<Playmat doc={ doc } docs={ this.props.docs } setDoc={ this.setDoc.bind( this ) } />
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
