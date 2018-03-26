interface Entity {
  readonly id: string;
}

interface NamedEntity extends Entity {
  readonly name: string;
}

export { Entity, NamedEntity };
