import { Component, OnInit } from '@angular/core';
import { VehiculesServiceService } from '../vehicules-service.service';
import { listenToElementOutputs } from '@angular/core/src/view/element';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public commands = [];
  public vehicles: any;

  constructor(private vehicleService: VehiculesServiceService) { }

  ngOnInit() {

    this.vehicleService.getOrdersFormUser().then((commands: any) => {
      this.commands = commands;

      console.log(this.commands);
      console.log('pouet', this.commands[0]);
    });
    this.vehicleService.getVehicles().then((vehicles: any) => {
      this.vehicles = vehicles;
    });
  }

  getDetails(commandsTmp) {
    const tmpDetails = [];
    // commandsTmp.array.forEach(command => {
    Object.keys(commandsTmp).forEach(vehicleId => {
      console.log('idCommand =' + vehicleId);
      const vehicle = this.vehicles.find(v => v.id === vehicleId);
      if (vehicle) {
        tmpDetails.push({
          quantity: commandsTmp[vehicleId],
          name: `${vehicle.brand} - ${vehicle.model}`,
          link: '/vehicle/' + vehicleId,
          base64: vehicle.img
        });
        console.log('DETAILS ======== ' + tmpDetails);
      }
    });
    //  });

    return tmpDetails;
  }

}
