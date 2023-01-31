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

    const getAllPokemonApiResponseHandler = (allPokemons: PokemonModel[]) => {
      this.allPokemon = allPokemons;
    }

    this.pokemonService.getPokemon().subscribe({
      next: getAllPokemonApiResponseHandler.bind(this),
      error: this.pokemonApiErrorHandler.bind(this)
    });

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

  pokemonApiErrorHandler = (error: any) => {
    this.showAlert('error', error.message || "Can't add pokemon")
  }


  addPokemon() {
    const pokemon: PokemonModel = {
      name: this.Name.value,
      speciality: this.Speciality.value,
      imageUrl: this.ImageUrl.value
    }

    const addPokemonApiResponseHandler = (addedPokemon: PokemonModel) => {
      this.allPokemon = this.allPokemon.concat([addedPokemon]);
      this.clearForm();
      this.showAlert('success', `Pokemon ${addedPokemon.name} is added successfully!`)
    }


    this.pokemonService.savePokemon(pokemon).subscribe({
      next: addPokemonApiResponseHandler.bind(this),
      error: this.pokemonApiErrorHandler.bind(this)
    });
  }

  showAlert(notificationType: Notification['type'], notificationMessage: Notification['message']) {
    this.notification = new Notification(notificationType, notificationMessage);
    this.isAlertOn = true;
    setTimeout(() => {
      this.hideAlert()
    }, 3000);
  }

  hideAlert() {
    this.isAlertOn = false;
    this.notification = null;
  }
}
