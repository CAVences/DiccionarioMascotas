import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal';
import { Imagen } from '../models/Imagen';
import { AnimalsService } from '../services/animals.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  animal: Animal;
  listAnimals: Animal[] = [];
  animalModal: Animal;
  mostrar: boolean = false;

  constructor(private animalsService: AnimalsService) { }

  ngOnInit(): void {
    this.getListAnimals();
  }

  getListAnimals() {
    this.animalsService.getAnimalsList()
    .subscribe( data => {
      data.forEach( animals => {
        if(animals.image != undefined){
        this.animal = new Animal(null, null ,null, null, null, null, null, new Imagen(null, null));
        this.animal.id = animals.id;
        this.animal.name = animals.name;
        this.animal.origin = animals.origin
        this.animal.temperament = animals.temperament
        this.animal.wikipedia_url = animals.wikipedia_url
        this.animal.image.id = animals.image.id
        this.animal.image.url = animals.image.url
        this.listAnimals.push(this.animal);
        }
      })
    })
  }

  getAnimalById(id: string){
    this.mostrar = true;
    this.listAnimals.forEach( cat => {
      if(cat.id === id){
        this.animalModal = new Animal(null, null, null, null, null, null, null, new Imagen(null, null))
        this.animalModal.id = cat.id;
        this.animalModal.name = cat.name;
        this.animalModal.origin = cat.origin
        this.animalModal.temperament = cat.temperament
        this.animalModal.wikipedia_url = cat.wikipedia_url
        this.animalModal.image.id = cat.image.id
        this.animalModal.image.url = cat.image.url
      }
    })
  }

}
