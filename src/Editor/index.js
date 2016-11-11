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
			formulaPath: []
		};
	}
	
	render() {
		let doc = this.props.docs[ this.state.docIndex ];
		
		let modeView = '';
		if ( this.state.formulaPath.length ) {
			modeView = <FormulaEditor
				path={ this.state.formulaPath }
				setPath={ path => this.setState( { ...this.state, formulaPath: path } ) }
			/>
		} else {
			modeView = <Playmat
				doc={ doc }
				docs={ this.props.docs }
				setDoc={ this.setDoc.bind( this ) }
			/>
		}
		
		return <main id="editor">
			<div id="document-area">
				<Fields
					fields={ doc.fields }
					setPath={ path => this.setState( { ...this.state, formulaPath: path } ) }
				/>
				{ modeView }
			</div>
		</main>
	}
	
	setDoc( id ) {
		this.setState( {
			docIndex: this.props.docs.findIndex( i => i._id === id )
		} );
	}
}



export default Editor;
