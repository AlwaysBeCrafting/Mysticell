import { Map, Record, Set } from "immutable";

interface Relation {
  relate(from: string, to: string): this;
  unrelate(from: string, to: string): this;
  areRelated(from: string, to: string): boolean;
  getRelated(from: string): string | Set<string>;
}

interface HasOneProps {
  relations: Map<string, string>;
}

interface HasManyProps {
  relations: Map<string, Set<string>>;
}

namespace Relation {
  export class HasOne
    extends Record<HasOneProps>({
      relations: Map(),
    })
    implements Relation {
    relate(from: string, to: string): this {
      return this.setIn(["relations", from], to);
    }

    unrelate(from: string, to: string): this {
      return this.areRelated(from, to)
        ? this.removeIn(["relations", from])
        : this;
    }

    areRelated(from: string, to: string): boolean {
      return this.getIn(["relations", from]) === to;
    }

    getRelated(from: string): string {
      return this.getIn(["relations", from]);
    }
  }

  export class HasMany extends Record<HasManyProps>({ relations: Map() })
    implements Relation {
    relate(from: string, to: string): this {
      return this.updateIn(
        ["relations", from],
        (related: Set<string> = Set()) => related.add(to),
      );
    }

    unrelate(from: string, to: string): this {
      return this.updateIn(
        ["relations", from],
        (related: Set<string> = Set()) => related.remove(to),
      );
    }

    areRelated(from: string, to: string): boolean {
      return this.hasIn(["relations", from, to]);
    }

    getRelated(from: string): Set<string> {
      return this.getIn(["relations", from]);
    }
  }
}

export { Relation };
