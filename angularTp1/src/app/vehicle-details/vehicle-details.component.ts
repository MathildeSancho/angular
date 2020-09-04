import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiculesServiceService } from '../vehicules-service.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private firebaseService: VehiculesServiceService) { }


  private sub: any;

  private id;

  private vehicleDatas;

  objectkeys = Object.keys;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.firebaseService.getVehicleByDocumentId(params.id).then(vehicle => {
        this.vehicleDatas = vehicle;
      });
    });
  }

}
