import classNames from "classnames";
import React, { Component } from "react";
import { Link } from "react-router-dom";

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
    const { className, documents } = this.props;

    return (
      <div className={classNames(className, "HomePage")}>
        <h1 className="HomePage-heading">Home</h1>
        <ul className="HomePage-documentList">
          {documents
            .toEntitySeq()
            .map(document => (
              <li className="HomePage-documentList-item" key={document.id}>
                <Link to={`/d/${document.id}`}>{document.name}</Link>
              </li>
            ))
            .toList()}
        </ul>
      </div>
    );
  }
}

export { HomePage, Props };
