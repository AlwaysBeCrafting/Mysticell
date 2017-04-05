import * as React from "react";
import * as ReactDOM from "react-dom";

import { Editor } from "components/pages";

import 'common/styles/normalize.less';


ReactDOM.render(
	<Editor path={ [] }/>,
	document.getElementById( "root" ),
);
