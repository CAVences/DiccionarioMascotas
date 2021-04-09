import { Imagen } from "./Imagen";

export class Animal {
    constructor(
       public id: string,
       public name: string,
       public origin: string,
       public temperament: string,
       public description: string,
       public wikipedia_url: string,
       public reference_image_id: string,
       public image: Imagen,
    ){}
}
