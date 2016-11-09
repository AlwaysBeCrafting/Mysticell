import React from 'react';

import Dropdown from '../common/Dropdown';

import CardArea from './CardArea';
import SheetArea from './SheetArea';

import './Playmat.less';



const Playmat = ( props ) => {
	return (
		<div id="playmat">
			<menu type="toolbar">
				<Dropdown
					onChange={ (item) => { props.setDoc( item.value ) } }
					items={ props.docs.map( doc => { return { text: doc.title, value: doc._id }; } )}
				/>
			</menu>
			<div id="display-area">
				<CardArea cards={ props.doc.cards } />
				<SheetArea sheets={ props.doc.sheets } />
			</div>
		</div>
	);
};



export default Playmat;
