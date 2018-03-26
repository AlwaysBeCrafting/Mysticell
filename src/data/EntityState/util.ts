import { List, Map } from "immutable";

import { NamedEntity } from "data/common";

const idFromName = (
  entities: Map<string, NamedEntity>,
  childrenMap: Map<string, List<string>>,
  name: string,
  parentId: string,
): string | undefined =>
  childrenMap.get(parentId, List<string>()).find(child => {
    const entity = entities.get(child);
    return !!entity && entity.name === name;
  });

const idFromPath = (
  sources: Map<string, NamedEntity>,
  childrenMap: Map<string, List<string>>,
  [pathHead, ...pathTail]: string[],
  root: string = "",
): string | undefined => {
  return !pathHead
    ? root || undefined
    : idFromPath(
        sources,
        childrenMap,
        pathTail,
        idFromName(sources, childrenMap, pathHead, root),
      );
};

export { idFromPath };
