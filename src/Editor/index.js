import React from 'react';

import Fields from './Fields';
import Playmat from './Playmat';
import FormulaEditor from './FormulaEditor';

import './index.less';



class Editor extends React.Component {
	constructor() {
		super();
		this.state = {
			docIndex: 0,
			formulaPath: null
		};
	}
	
	render() {
		let doc = this.props.docs[ this.state.docIndex ];
		
		let modeView = '';
		if ( this.state.formulaPath == null ) {
			modeView = <Playmat
				doc={ doc }
				docs={ this.props.docs }
				setDoc={ this.setDoc.bind( this ) }
			/>
		
		} else {
			modeView = <FormulaEditor
				onCloseClick={ () => this.setState( { ...this.state, mode: "Playmat" } ) }
			/>
		}
		
		return (
			<main id="editor">
				<div id="document-area">
					<Fields
						fields={ doc.fields }
						onNodesClick={ () => this.setState( { ...this.state, mode: "FormulaEditor" } ) }
					/>
					{ modeView }
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
