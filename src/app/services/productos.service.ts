import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise((resolve, reject) => {

      this.http.get('https://angular-html-e1a03.firebaseio.com/productos_idx.json').subscribe((resp: Producto[]) => {
        this.productos = resp;
        setTimeout(() => {
          this.cargando = false;
          resolve();
        }, 1000);
        // console.log(resp);
      });
    });

  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-e1a03.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string) {

    if( this.productos.length === 0){
      //Cargar productos
      this.cargarProductos().then( () => {
        //ejecutar después de tener los productos
        //Aplicar filtro
        this.filtrarProductos( termino );
      });
    }else{
      //aplicar el filtro
      this.filtrarProductos( termino );
    }

  }

  private filtrarProductos (termino: string){
    // console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    //búcle para cargar los productos que coinciden con el término de búsqueda
    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();
      //condicional para encontrar el producto y adicionarlo al arreglo filtrado
      if(prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0){
        this.productosFiltrado.push( prod );
      }
    });
  }
}
