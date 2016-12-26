import * as React from 'react';

import './Toolbar.less';

// TODO: w/ TS 2.1 this shouldn't be needed any more
export interface ToolbarProps { children?: any; }

export default ( props: ToolbarProps ) => <menu type="toolbar">{ props.children }</menu>;
