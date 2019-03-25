import { Map, Record, Seq } from "immutable";

const makeEntityKeyPath = (id: string, subPath: Iterable<any>) =>
  Seq(["entities", id]).concat(subPath);

interface Entity {
  readonly id: string;
}

interface EntityTableProps<T extends Entity> {
  entities: Map<string, T>;
}

class EntityTable<T extends Entity> extends Record<EntityTableProps<any>>({
  entities: Map(),
}) {
  getEntity(id: string, notSetValue?: T): typeof notSetValue {
    return this.getIn(["entities", id]) || notSetValue;
  }

  putEntity(entity: T): this {
    return this.setIn(["entities", entity.id], entity);
  }

  setInEntity(id: string, keyPath: Iterable<any>, value: any): this {
    return this.setIn(makeEntityKeyPath(id, keyPath), value);
  }

  hasEntity(id: string): boolean {
    return this.hasIn(["entities", id]);
  }

  removeEntity(id: string): this {
    return this.removeIn(["entities", id]);
  }

  removeInEntity(id: string, keyPath: Iterable<any>): this {
    return this.removeIn(makeEntityKeyPath(id, keyPath));
  }

  toEntitySeq(): Seq.Keyed<string, T> {
    return this.entities.toSeq();
  }
}

export { Entity, EntityTable };
