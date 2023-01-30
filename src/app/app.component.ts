import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { PokemonService } from "./services/pokemon.service"
import { PokemonModel } from './model/pokemon.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myApp';
  addPokemonForm: FormGroup;

  allPokemon: PokemonModel[];
  pokemonToDisplay: PokemonModel[];

  constructor(private fb: FormBuilder, private pokemonService: PokemonService) {
    this.addPokemonForm = fb.group({});
    this.allPokemon = [];
    this.pokemonToDisplay = this.allPokemon;
  }

  ngOnInit() {
    this.addPokemonForm = this.fb.group({
      name: this.fb.control(''),
      speciality: this.fb.control(''),
      imageUrl: this.fb.control(''),
    })

    this.pokemonService.getPokemon().subscribe(response => { this.allPokemon = (response) });

  }
}
