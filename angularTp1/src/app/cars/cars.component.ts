import { Component, OnInit, Input } from '@angular/core';
import { VehiculesServiceService } from '../vehicules-service.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  private vehicles = [];
  private subVehicles: any;

  constructor(private firebaseService: VehiculesServiceService) { }

  ngOnInit() {
    this.subVehicles = this.firebaseService.subscribeToVehicles().subscribe((vehicles: any) => {
      console.log(vehicles);
      this.vehicles = vehicles;
      // this.handleVehiclesSubscription(vehicles);

    });
  }

}
