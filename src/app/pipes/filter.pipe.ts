import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any{
    if(arg =='' || arg.length<3) return value;
    const resultadoProductos=[];
    for(const producto of value){
      if(producto.nombreProducto.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultadoProductos.push(producto);
      }
    }
    return resultadoProductos;
  }

}
