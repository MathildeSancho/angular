import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { VehiculesServiceService } from './vehicules-service.service';



export class VehicleForPanier {
  id: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class PanierServiceService {
  private PANIER = 'Panier';

  private panier: Array<VehicleForPanier> = [];

  private priceTotal: number;

  public cartInStorage = new Subject();

  constructor(private vehicleService: VehiculesServiceService) { }

  addToPanier(id: string, count: number) {
    let add = false;
    this.panier.forEach(v => {
      if (v.id === id) {
        v.count = count;
        add = true;
      }
    });
    if (!add) {
      const v = new VehicleForPanier();
      v.id = id;
      v.count = count;
      this.panier.push(v);
    }
    this.cartInStorage.next(this.panier);
    console.log('JE PASSE DANS LE ADD : ', this.panier);
  }

  getPanier() {
    return this.panier;

  }

  getPriceTotal() {
    return this.priceTotal;
  }

  setPriceTotal(newPrice: number) {
    this.priceTotal = newPrice;
  }

  deleteVehicleById(id: string) {
    this.panier.forEach((v , i) => {
      if (v.id === id) {
        return this.panier.splice(i, 1);
      }
    });
    this.cartInStorage.next(this.panier);
  }

  getCountByIdVehicle(id: string) {
    let res = 0;
    this.panier.forEach(v => {
      if (v.id === id) {
        res = v.count;
      }
    });
    return res;
  }

  addOrder() {
    const panierToExport = {};

    this.panier.forEach( v => {
      panierToExport[v.id] = v.count;
   });

    const datas = {
      panier : panierToExport,
      price : this.priceTotal,
      date : new Date().toString()
    };
    this.vehicleService.addOrder(datas);
    this.panier = [];
    this.cartInStorage.next(this.panier);
  }
}
