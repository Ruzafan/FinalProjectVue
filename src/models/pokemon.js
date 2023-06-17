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


  constructor(obj){
    Object.assign(this, obj)
  }
}
