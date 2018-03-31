import { Collection, Range, Seq } from "immutable";

import { JoinManyToOne, NamedEntity } from "data/common";
import { Directory } from "data/Directory";

const bindIdFromPath = (
  entities: Collection<string, NamedEntity>,
  entityParents: JoinManyToOne,
) => (path: Iterable<string>): string | undefined =>
  Seq(path).reduce((parent, segment) => {
    const child = entities.find(
      entity =>
        entityParents.get(entity.id) === parent && entity.name === segment,
    );
    return child && child.id;
  }, undefined);

const chainIds = (
  entityParents: JoinManyToOne,
  childId: string | undefined,
) => {
  let currentId: string | undefined = childId;
  return Seq.Indexed({
    [Symbol.iterator]: () => {
      return {
        next: () => {
          const resultId = currentId;
          currentId = currentId && entityParents.get(currentId);
          return { done: resultId === undefined, value: resultId as string };
        },
      };
    },
  });
};

const bindPathFromId = (
  entities: Collection<string | undefined, NamedEntity>,
  entityParents: JoinManyToOne,
) => (id: string | undefined): Iterable<string> | undefined => {
  if (!entities.has(id)) {
    return undefined;
  }
  return chainIds(entityParents, id)
    .map(parentId => entities.get(parentId, new Directory()).name)
    .reverse();
};

export { bindIdFromPath, bindPathFromId };
