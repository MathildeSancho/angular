import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vehicleKeys'
})
export class VehicleKeysPipe implements PipeTransform {

  transform(keys){
    const forbiddenKeys= ['img', 'id','price'];
    return keys.filter(k => !forbiddenKeys.includes(k));
}

}
