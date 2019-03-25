import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

import { CommonAttributes } from "common/types";
import { useDocumentList } from "data/Document";

interface Props extends CommonAttributes {
  listDocuments: () => void;
}

const HomePage = (props: Props) => {
  const { className } = props;

  const [documents] = useDocumentList();

  return (
    <div className={classNames(className, "HomePage")}>
      <h1 className="HomePage-heading">Home</h1>
      <ul className="HomePage-documentList">
        {documents.toIndexedSeq().map(document => (
          <li className="HomePage-documentList-item" key={document.id}>
            <Link to={`/d/${document.id}`}>{document.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { HomePage, Props };
