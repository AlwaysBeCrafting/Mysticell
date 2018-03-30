import { Map } from "immutable";

interface Entity {
  readonly id: string;
}

interface NamedEntity extends Entity {
  readonly name: string;
}

type EntityTable<T extends Entity> = Map<string, T>;

type JoinManyToOne = Map<string, string>;

export { Entity, NamedEntity, EntityTable, JoinManyToOne };
