import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from "@angular/forms"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myApp';
  addPokemonForm : FormGroup;

  constructor(private fb: FormBuilder) {
    this.addPokemonForm = fb.group({});
  }

  ngOnInit() {
    this.addPokemonForm = this.fb.group({
      name: this.fb.control(''),
      speciality: this.fb.control(''),
      imageUrl: this.fb.control(''),
    })
    
  }


}
