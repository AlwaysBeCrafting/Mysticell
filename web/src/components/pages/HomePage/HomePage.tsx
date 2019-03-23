import React, { Component } from "react";

import { CommonAttributes } from "common/types";
import { EntityTable } from "data/common";
import { Document } from "data/Document";

interface Props extends CommonAttributes {
  documents: EntityTable<Document>;
  listDocuments: () => void;
}

class HomePage extends Component<Props> {
  componentDidMount() {
    const { listDocuments } = this.props;
    listDocuments();
  }

  render() {
    return (
      <div>
        <h1>Home page</h1>
        <p>Coming soon</p>
      </div>
    );
  }
}

export { HomePage, Props };
