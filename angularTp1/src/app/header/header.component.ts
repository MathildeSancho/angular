import { VehiculesServiceService } from './../vehicules-service.service';
import { MatDialog } from '@angular/material';
import { PanierServiceService } from './../panier-service.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-first-content-dialog',
  templateUrl: './first-content-dialog.html',
})
export class FirstContentDialogComponent implements OnInit {

  constructor(private db: AngularFirestore, private vehiculeService: VehiculesServiceService) { }

  activeUser = null;
  private showLogin: boolean;
  private showFirst: boolean;
  username = '';
  password = '';
  cpass = '';
  errors: any;


  ngOnInit() {
    this.showLogin = false;
    this.showFirst = true;
  }

  showRegister() {
    this.showLogin = false;
    this.showFirst = false;
  }
  showloginInPage() {
    this.showLogin = true;
    this.showFirst = false;
  }

  login() {
    return new Promise(resolve => {
      const docRef = this.db.collection('user', ref =>
        ref.where('username', '==', this.username).where('password', '==', this.password)).get().subscribe(user => {
          if (user.size > 0) {
            // Enregistrer ces informations
            console.log("USER CONNEXION", true);
            this.vehiculeService.setUserInformationConnexion(user.docs[0].id, user.docs[0].data().role);
          }
          console.log("USER CONNEXION", false);
        });
    });
  }

  register() {

    if (this.password != this.cpass) {
      //TODO message d'erreur - don't register

    } else {
      const user = {
        username: this.username,
        role: 'user',
        password: this.password
      };

      console.log(user, 'cpass', this.cpass, this.password);

      this.db.collection('user').add(user);
    }
  }
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, private storageService: PanierServiceService, private vehiculeService: VehiculesServiceService) { }

  private cart;
  activeUser = null;
  count = 0;

  ngOnInit() {
    this.storageService.cartInStorage.subscribe(cart => {
      this.cart = cart;
      this.getNumberVehicles();
    });
    this.cart = this.storageService.getPanier();
    this.vehiculeService.userIdInStorage.subscribe( user => {
        this.activeUser = user;
    });
    this.getNumberVehicles();
    console.log('NUMBER OF VEHICLES:', this.count);
  }

  getNumberVehicles() {
    this.count = 0;
    this.cart.forEach(v => {
      this.count = this.count + v.count;
      console.log('ICI       ', v.count);
    });
    console.log('NUMBER OF VEHICLES:', this.count, this.cart);
  }

  userIsConnected() {
    if (this.activeUser == null) {
      return false;
    } else {
      return true;
    }
  }

  disconnectUser() {
    this.activeUser = null;
    this.vehiculeService.setUserInformationConnexion(null, null);
  }

  openDialog() {
    const dialogRef = this.dialog.open(FirstContentDialogComponent);

    /*dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialog.open(LoginContentDialogComponent);
      } else {
        this.dialog.open(RegistrationContentDialogComponent);
      }
    }); */
  }
}


