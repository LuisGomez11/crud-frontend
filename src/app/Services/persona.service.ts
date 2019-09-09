import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Persona } from '../Models/persona';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  selectedPersona: Persona;
  personas: Persona[];

  readonly url='http://localhost:8080/app/persona';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor( private http: HttpClient ) {
    console.log('Servicio Funcionando');
  }

  getPersonas(): Observable<Persona[]> {
    return this.http.get(this.url).pipe(
      map(data => data as Persona[])
    );
  }

  getPersona(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.url}/${id}`);
  }

  createPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.url, persona, {headers: this.httpHeaders});
  }

  updatePersona(persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(this.url, persona, {headers: this.httpHeaders});
  }

  deletePersona(id: number): Observable<Persona> {
    return this.http.delete<Persona>(`${this.url}/${id}`, {headers: this.httpHeaders});
  }

}
