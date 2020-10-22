import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from '../../services/info-pagina.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  // Crear propiedad para la fecha automatica en el año del footer
  anio: number = new Date().getFullYear();

  constructor(public _servicio: InfoPaginaService) { }

  ngOnInit(): void {
  }

}
