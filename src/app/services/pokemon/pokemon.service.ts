import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { PokemonModel } from 'src/app/model/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl = "http://localhost:3000/pokemons"
  constructor(private http: HttpClient) { }

  getPokemon(): Observable<PokemonModel[]> {
    return this.http.get<PokemonModel[]>(this.baseUrl);
  }

  savePokemon(pokemonToSave: PokemonModel): Observable<PokemonModel> {
    return this.http.post<PokemonModel>(this.baseUrl, pokemonToSave);
  }
}
