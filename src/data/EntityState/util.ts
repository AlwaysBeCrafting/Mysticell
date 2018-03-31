import { Collection, Seq } from "immutable";

import { JoinManyToOne, NamedEntity } from "data/common";

const bindIdFromPath = (
  entities: Collection<string, NamedEntity>,
  entityParents: JoinManyToOne,
) => {
  const idFromPath = (path: Iterable<string>): string | undefined =>
    Seq(path).reduce((parent, segment) => {
      const child = entities.find(
        entity =>
          entityParents.get(entity.id) === parent && entity.name === segment,
      );
      return child && child.id;
    }, undefined);
  return idFromPath;
};

export { bindIdFromPath };
