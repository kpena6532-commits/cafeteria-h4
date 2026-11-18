import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
export interface Product { id:number; categoria_id:number; nombre:string; descripcion:string; precio:number; imagen:string; disponible:number; orden:number }
export interface Service { id:number; titulo:string; descripcion:string; icono:string; activo:number }
export interface Specialty { id:number; producto_id:number; etiqueta:string }
export interface Gallery { id:number; titulo:string; imagen:string }
export interface Schedule { id:number; dias:string; horas:string }
export interface Storefront {
  configuracion: Record<string,string>; productos:Product[]; servicios:Service[];
  especialidades:Specialty[]; categorias:{id:number;nombre:string}[]; galeria:Gallery[];
  horarios: Schedule[]; preguntas:{id:number;pregunta:string;respuesta:string}[];
}
@Injectable({providedIn:'root'})
export class ApiService {
  private http = inject(HttpClient);
  load() { return this.http.get<Storefront>(`${environment.apiUrl}/tienda`); }
  contact(body:{nombre:string;email:string;asunto:string;mensaje:string}) { return this.http.post<{mensaje:string}>(`${environment.apiUrl}/contactos`,body); }
  chat(prompt:string) { return this.http.post<{response:string}>(`${environment.apiUrl}/chatbot`,{prompt}); }
}
