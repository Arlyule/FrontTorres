import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clientes } from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

   clienteURL='http://localhost:8080/cliente/';
  
  constructor(private httpClient:HttpClient) { }

  public lista():Observable<Clientes[]>{
    return this.httpClient.get<Clientes[]>(this.clienteURL + 'lista');
  }

  public detail(id: number):Observable<Clientes>{
    return this.httpClient.get<Clientes>(this.clienteURL + `detail/${id}`);
  }

  public detailName(nombre: String):Observable<Clientes>{
    return this.httpClient.get<Clientes>(this.clienteURL + `detailname/${nombre}`);
  }

  public save(cliente:Clientes):Observable<any>{
    return this.httpClient.post<any>(this.clienteURL+'create', cliente);
  }

  public update(id: number,cliente:Clientes):Observable<any>{
    return this.httpClient.put<any>(this.clienteURL+`update/${id}`,cliente);
  }

  public delete(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.clienteURL+`delete/${id}`);
  }
  
}
