import classNames from "classnames";
import React from "react";

import {Param} from "data/common";

import "./PinRow.scss";


interface AlwaysProps {
	name: string;
	className?: string;
}

interface SrcProps extends AlwaysProps {
	type: "src";
	computedValue: Param;
}

interface DstProps extends AlwaysProps {
	type: "dst";
	isConnected: boolean;
	param: Param;
	userValue: string;
	index: number;
	onChange?: (index: number, value: string) => void;
}

type Props = SrcProps | DstProps;

class PinRow extends React.PureComponent<Props> {
	public render() {
		const {name, type, className} = this.props;
		return (
			<div
				className={classNames(`pinRow ${type}PinRow`, className)}
				key={name}
			>
				<div className={`pinRow-pin ${type}PinRow-pin`} />
				<label className="pinRow-label">{name}</label>
				{
					this.props.type === "dst"
						&& !this.props.isConnected
						&& <input
							className="pinRow-value"
							value={this.props.userValue}
							onChange={this.onChange}
						/>
				}
			</div>
		);
	}

	private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (this.props.type === "dst" && this.props.onChange) {
			this.props.onChange(this.props.index, event.currentTarget.value);
		}
	}
}


export {PinRow};
