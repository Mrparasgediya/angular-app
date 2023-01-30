import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { PokemonModel } from '../model/pokemon.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl = "http://localhost:3000/pokemons"
  constructor(private http: HttpClient) { }

  getPokemon(): Observable<PokemonModel[]> {
    return this.http.get<PokemonModel[]>(this.baseUrl);
  }
}
