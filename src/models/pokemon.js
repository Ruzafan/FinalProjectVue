export class Pokemon {
  id;
  name;
  description;
  species;
  types;
  abilities;
  height;
  weight;
  sprite;
  captured;

  constructor(id, name, species, types) {
    this.id = id;
    this.name = name;
    this.species = species;
    this.types = types;
  }
}
