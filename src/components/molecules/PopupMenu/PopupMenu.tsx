import * as React from 'react';

import { Anchor, Position } from 'common/types/layout';

import { MenuItem } from 'components/atoms';

import { createItem } from './Item';
import './PopupMenu.less';


interface Props {
	position: Position;
	anchor?: Anchor;
	items: MenuItem[];
}


export default ( props: Props ) => {
	const style = {
		left: props.position.x,
		top: props.position.y,
	};

	const classList = [ 'popup' ];
	if ( props.anchor ) {
		classList.push(
			`anchor-${ props.anchor.horizontal }`,
			`anchor-${ props.anchor.vertical }`,
		);
	}

	return (
		<div className={ classList.join( ' ' ) } style={ style }>
			{ props.items.map( createItem ) }
		</div>
	);
};
