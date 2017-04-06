import * as React from 'react';

import { Card } from 'components/atoms';

import './NodeCard.scss';


interface Props {}


export default ( props: Props ) => (
	<Card { ...props } />
);

export const createNodeCard = () => {};