import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from '../models/animal';
import { Imagen } from '../models/Imagen';
import { AnimalsService } from '../services/animals.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  animal: Animal;

  constructor(private animalsService: AnimalsService,
    private router: Router,
    private activadteRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAnimalById();
  }

  getAnimalById() {
    this.activadteRoute.params.subscribe(params => {
      let id = params['id']
      if (id != null) {
        this.animalsService.getAnimalById(id).subscribe(data => {

          if (data.length > 0) {
            data.forEach(cat => {
              this.animal = new Animal(null, null, null, null, null, null, null, new Imagen(null, null));
              this.animal.id = cat.id
              this.animal.name = cat.name
              this.animal.origin = cat.origin
              this.animal.temperament = cat.temperament
              this.animal.wikipedia_url = cat.wikipedia_url
              this.animal.description = cat.description
              this.animal.reference_image_id = cat.reference_image_id
            })
          } else {
            this.router.navigate(['/listado'])
            Swal.fire('¡¡Upss!!', `Info: no hay informacion de esta mascota, prueba con otra`, 'info');
          }
        })
      }
    })
  }

}
