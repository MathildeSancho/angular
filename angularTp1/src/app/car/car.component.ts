import { Component, OnInit, Input } from '@angular/core';
import {PanierServiceService} from '../panier-service.service';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  @Input() vehicle;

  private count;

  constructor(private panierService: PanierServiceService ) { }
   numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  ngOnInit() {
    this.count = this.panierService.getCountByIdVehicle(this.vehicle.id);
    console.log('LA VALEUR', this.count);
  }

  addToPanier(id: string, n: number ) {
    if (n !== 0) {
      this.panierService.addToPanier(id, n);
    }

  }

}
