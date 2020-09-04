import { Component, OnInit } from '@angular/core';
import { PanierServiceService } from '../panier-service.service';
import { VehiculesServiceService } from '../vehicules-service.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})


export class PanierComponent implements OnInit {

  public panier;
  private total = 0;
  public userId = 'ezYNT5zrfkSeroAXDr9N';
  constructor(private panierService: PanierServiceService, private vehicleService: VehiculesServiceService) { }

  ngOnInit() {
    const panierInit = this.panierService.getPanier();
    console.log('Contenu Panier init', panierInit);
    this.panierService.cartInStorage.subscribe(cart => {
      this.updatePanier();
      console.log('Je passe ici');
    });
    this.updatePanier();

  }

  delete(id: string) {
    this.panierService.deleteVehicleById(id);
  }

  updatePanier() {
    this.panier = [];
    this.total = 0;
    this.panierService.getPanier().forEach(vehiclePanier => {
      this.vehicleService.getVehicleByDocumentId(vehiclePanier.id).then((v: any) => {
        v.count = vehiclePanier.count;
        this.panier.push(v);
        this.total += (v.price * v.count);
        this.panierService.setPriceTotal(this.total);
      });
    });
  }

  addCommand() {
    this.panierService.addOrder();
  }
}
