import * as React from "react";

import "./index.less";


// TODO: w/ TS 2.1 this shouldn't be needed any more
interface ToolbarProps { children?: any; }


export default ( props: ToolbarProps ) => <menu type="toolbar">{ props.children }</menu>;
