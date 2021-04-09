import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router'
import { Observable, throwError } from 'rxjs';
import { Animal } from '../models/animal';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  private END_POINT = 'https://api.thecatapi.com/v1/breeds'
  private DETAILS = '/search?'
  private KEY_API = '9175620e-2341-47d3-8d0f- 1fdf098fe229'
  private HEADERS = new HttpHeaders({ 'x-api-key': this.KEY_API })

  constructor(private http: HttpClient,
    private router: Router,) { }


  getAnimalsList(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.END_POINT, { headers: this.HEADERS })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getAnimalById(id: string): Observable<Animal[]> {
    let param = new HttpParams().set('q', id)
    return this.http.get<Animal[]>(this.END_POINT + this.DETAILS + param.toString(), { headers: this.HEADERS })

      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    Swal.fire('Hubo un error', errorMessage, 'warning');
    return throwError(errorMessage);
  }

}


