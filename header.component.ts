import { VehiculesServiceService } from './../vehicules-service.service';
import { MatDialog } from '@angular/material';
import { count } from 'rxjs/operators';
import { PanierServiceService } from './../panier-service.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { identity } from 'rxjs';

@Component({
  selector: 'first-content-dialog',
  templateUrl: 'first-content-dialog.html',
})
export class FirstContentDialogComponent {

  constructor(private db: AngularFirestore, private vehiculeService: VehiculesServiceService) { }

  activeUser = null;
  private showLogin: boolean;
  private showFirst: boolean;

  registerForm = {username:'',password:'',cpass:''};

  RegisterForm: FormGroup;

  ngOnInit(): void {
    this.RegisterForm = new FormGroup({
      'username': new FormControl(this.registerForm.username, [
        Validators.required,
        Validators.minLength(4)
      ]),
      'password': new FormControl(this.registerForm.password, Validators.required),
      'cpass': new FormControl(this.registerForm.cpass, {
         updateOn: 'blur'
      })

    }, { validators: passwordValidator });


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

  login(username: string, password: string) {
    return new Promise(resolve => {
      const docRef = this.db.collection('user', ref =>
        ref.where('username', '==', username).where('password', '==', password)).get().subscribe(user => {
          if (user.size > 0) {
            this.vehiculeService.setUserId(user.docs[0].id);
            const right = user.docs[0].data().role;
            // Enregistrer ces informations
          }
        });
    });
  }

  register() {
    this.db.collection('user').add(username)
  }
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, private storageService: PanierServiceService) { }

  private cart;
  activeUser = null;
  count = 0;

  ngOnInit() {
    this.storageService.cartInStorage.subscribe(cart => {
      this.cart = cart;
      this.getNumberVehicles();
    });
    this.cart = this.storageService.getPanier();
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
  }

  openDialog() {
    this.activeUser = '';
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


