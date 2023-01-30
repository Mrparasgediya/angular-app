import { Component, Input } from '@angular/core';
import { PokemonModel } from "../model/pokemon.model"

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],

})
export class PokemonComponent {
  @Input() pokemon: PokemonModel;

  constructor() {
    this.pokemon = {
      name: "",
      speciality: "",
      imageUrl: ""
    }
  }
}
