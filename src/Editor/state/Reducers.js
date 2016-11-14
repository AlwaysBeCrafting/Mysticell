import { combineReducers } from 'redux';

import Actions from './Actions';

//==============================================================================

const EXAMPLE_DOC = {
	_id: 0,
	title: 'Open Legend Character Template',
	sheets: [ { title: 'Sheet 1', _id: 1, cells: [] } ],
	cards: [ { title: 'Card 1', _id: 2, cells: [] } ],
	fields: [
		{ name: 'Stats', _id: 3, children: [
			{ name: 'Attributes', _id: 4, children: [
				{ name: 'Strength', _id: 5, children: [
					{ name: 'Modifier', _id: 6, children: [] }
				] },
				{ name: 'Dexterity', _id: 7, children: [
					{ name: 'Modifier', _id: 8, children: [] }
				] },
				{ name: 'Constitution', _id: 9, children: [
					{ name: 'Modifier', _id: 10, children: [] }
				] },
				{ name: 'Intelligence', _id: 11, children: [
					{ name: 'Modifier', _id: 12, children: [] }
				] },
				{ name: 'Wisdom', _id: 13, children: [
					{ name: 'Modifier', _id: 14, children: [] }
				] },
				{ name: 'Charisma', _id: 15, children: [
					{ name: 'Modifier', _id: 16, children: [] }
				] },
			] },
			{ name: 'Saves', _id: 17, children: [
				{ name: 'Fortitude', _id: 18, children: [] },
				{ name: 'Reflex',    _id: 19, children: [] },
				{ name: 'Will',      _id: 20, children: [] },
			] },
			{ name: 'Skills', _id: 21, children: [
				{ name: 'Acrobatics',     _id: 22, children: [] },
				{ name: 'Appraise',       _id: 23, children: [] },
				{ name: 'Bluff',          _id: 24, children: [] },
				{ name: 'Climb',          _id: 25, children: [] },
				{ name: 'Craft',          _id: 26, children: [] },
				{ name: 'Diplomacy',      _id: 27, children: [] },
				{ name: 'Disable Device', _id: 28, children: [] },
				{ name: 'Disguise',       _id: 29, children: [] },
				{ name: 'Escape Artist',  _id: 30, children: [] },
				{ name: 'Fly',            _id: 31, children: [] },
				{ name: 'Handle Animal',  _id: 32, children: [] },
				{ name: 'Heal',           _id: 33, children: [] },
				{ name: 'Intimidate',     _id: 34, children: [] },
				{ name: 'Knowledge',      _id: 35, children: [
					{ name: 'Arcana',        _id: 36, children: [] },
					{ name: 'Dungeoneering', _id: 37, children: [] },
					{ name: 'Engineering',   _id: 38, children: [] },
					{ name: 'Geography',     _id: 39, children: [] },
					{ name: 'History',       _id: 41, children: [] },
					{ name: 'Local',         _id: 42, children: [] },
					{ name: 'Nature',        _id: 43, children: [] },
					{ name: 'Nobility',      _id: 44, children: [] },
					{ name: 'Planes',        _id: 45, children: [] },
					{ name: 'Religion',      _id: 46, children: [] },
				] },
				{ name: 'Linguistics',      _id: 47, children: [] },
				{ name: 'Perception',       _id: 48, children: [] },
				{ name: 'Perform',          _id: 49, children: [] },
				{ name: 'Profession',       _id: 51, children: [] },
				{ name: 'Ride',             _id: 52, children: [] },
				{ name: 'Sense Motive',     _id: 53, children: [] },
				{ name: 'Sleight of Hand',  _id: 54, children: [] },
				{ name: 'Spellcraft',       _id: 55, children: [] },
				{ name: 'Stealth',          _id: 56, children: [] },
				{ name: 'Survival',         _id: 57, children: [] },
				{ name: 'Swim',             _id: 58, children: [] },
				{ name: 'Use Magic Device', _id: 59, children: [] },
			] },
		] },
	]
};

//------------------------------------------------------------------------------

const path = ( state = [], action ) => ( action === Actions.SET_PATH ? action.path : state );

//------------------------------------------------------------------------------

const doc = ( state = EXAMPLE_DOC, action ) => state;

//------------------------------------------------------------------------------

const expandedFields = ( state = {}, action ) => {
	switch ( action.type ) {
		case Actions.EXPAND_FIELD:
			return { ...state, [action.id]: true };
		
		case Actions.COLLAPSE_FIELD:
			const newState = { ...state };
			delete newState[action.id];
			return newState;
			
		default: return state;
	}
};

const ui = combineReducers( {
	expandedFields
} );

//------------------------------------------------------------------------------

export default combineReducers( { path, doc, ui } );
