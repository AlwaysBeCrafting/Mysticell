import * as React from 'react';

import './NodePin.less';

//==============================================================================

interface InputPinProps {}

export const InputPin = ( props: InputPinProps ) => <span className="pin" />;

//------------------------------------------------------------------------------

interface OutputPinProps {}

export const OutputPin = ( props: OutputPinProps ) => <span className="pin" />;
