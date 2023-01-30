import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms"
import { PokemonService } from "./services/pokemon.service"
import { PokemonModel } from './model/pokemon.model'
import { Notification } from './model/notification.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myApp';
  addPokemonForm: FormGroup;
  isAlertOn: boolean;
  notification: Notification | null;
  allPokemon: PokemonModel[];
  pokemonToDisplay: PokemonModel[];

  constructor(private fb: FormBuilder, private pokemonService: PokemonService) {
    this.addPokemonForm = fb.group({});
    this.allPokemon = [];
    this.pokemonToDisplay = this.allPokemon;
    this.isAlertOn = true;
    this.notification = null
  }

  ngOnInit() {
    this.addPokemonForm = this.fb.group({
      name: this.fb.control(''),
      speciality: this.fb.control(''),
      imageUrl: this.fb.control(''),
    })

    this.pokemonService.getPokemon().subscribe(response => { this.allPokemon = (response) });

  }

  public get Name(): FormControl {
    return this.addPokemonForm.get("name") as FormControl;
  }

  public get Speciality(): FormControl {
    return this.addPokemonForm.get("speciality") as FormControl;
  }

  public get ImageUrl(): FormControl {
    return this.addPokemonForm.get("imageUrl") as FormControl;
  }

  clearForm() {
    this.Name.setValue("");
    this.Speciality.setValue("");
    this.ImageUrl.setValue("");
  }

  addPokemon() {
    const pokemon: PokemonModel = {
      name: this.Name.value,
      speciality: this.Speciality.value,
      imageUrl: this.ImageUrl.value
    }

    this.pokemonService.savePokemon(pokemon).subscribe(response => {
      this.allPokemon = this.allPokemon.concat([response]);
      this.clearForm();
      this.showAlert()
      setTimeout(() => {
        this.hideAlert()
      }, 3000);
    }, (error) => {
      console.log(error)
    });
  }

  showAlert() {
    this.isAlertOn = true;
  }

  hideAlert() {
    this.isAlertOn = false;
  }
}
