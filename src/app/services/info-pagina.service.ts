import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';


@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any[] = [];

  constructor(private http: HttpClient) {
    //Llamar al metodo para cargasr la información desde el constructor
    this.cargarInfo();
    this.cargarEquipo();

  }

  private cargarInfo() {
    // console.log('Servicio de infoPagina listo');

    //Leer el Json con los datos globales de la aplicación
    this.http.get('assets/data/data-pagina.json').subscribe((resp: InfoPagina) => {

      this.cargada = true;
      this.info = resp;
      // console.log(resp);
    });
  }

  private cargarEquipo() {
    //Leer el Json con los datos globales de la aplicación
    this.http.get('https://angular-html-e1a03.firebaseio.com/equipo.json').subscribe((resp: any[]) => {
     
      this.equipo = resp;
      // console.log(resp);
    });
  }
}
