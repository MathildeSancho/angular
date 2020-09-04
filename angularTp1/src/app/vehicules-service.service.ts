import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculesServiceService {

  private vehicles = [];
  private orders = [];
  public userId = "userId";
  public userRight = "right";

  public userIdInStorage = new Subject();

  constructor(private db: AngularFirestore) { }

  subscribeToVehicles(): Observable<any> {
    return this.db.collection('vehicule')
      .snapshotChanges()
      .pipe(map(docs => {
        const vehicles = [];
        console.log(docs);
        docs.forEach(doc => {
          // const datas = this.transformDatas(
          //   doc.payload.doc.data(),
          //   doc.payload.doc.id
          // );
          const datas = doc.payload.doc.data();
          datas['id'] = doc.payload.doc.id;
          vehicles.push(datas);
        });
        this.vehicles = vehicles;
        return vehicles;
      })
      );
  }

  getVehicles(): any {
    return new Promise(resolve => {
      if (this.vehicles.length === 0) {
        const docRef = this.db.collection('vehicule');
        docRef.get().subscribe(docs => {
          const vehicles = [];
          docs.forEach(doc => {
            // const datas = this.transformDatas(doc.data(), doc.id);
            const datas = doc.data();
            datas['id'] = doc.id;
            vehicles.push(datas);
          });
          this.vehicles = vehicles;
          resolve(this.vehicles);
        });
      } else {
        resolve(this.vehicles);
      }
    });
  }

  getVehicleByDocumentId(id: string) {
    return new Promise(resolve => {
      this.getVehicles().then(vehicles => {
        const vehicleDatas = vehicles.filter(v => v.id === id)[0];
        resolve(vehicleDatas);
      });
    });
  }

  addOrder(datas) {
    const userId = sessionStorage.getItem(this.userId);
    if (userId != null) {
      return this.db.collection('user').doc(userId).collection('commands').add(datas);
    }
  }

  getOrdersFormUser(): any {
    const userId = sessionStorage.getItem(this.userId);
    return new Promise(resolve => {
      if (this.orders.length === 0 && userId != null) {
        const docRef = this.db.collection('user').doc(userId).collection('commands');
        docRef.get().subscribe(docs => {
          const orders = [];
          docs.forEach(doc => {
            // const datas = this.transformDatas(doc.data(), doc.id);
            const datas = doc.data();
            datas['id'] = doc.id;
            orders.push(datas);
          });
          this.orders = orders;
          resolve(this.orders);
        });
      } else if (userId != null) {
        resolve(this.orders);
      }
    });
  }

  setUserInformationConnexion(userId, right) {
    this.userIdInStorage.next(userId);
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('right', right);
    console.log('USER CONNECTED :', this.userId, right);
  }
}
