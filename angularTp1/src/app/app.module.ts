import { VehiculesServiceService } from './vehicules-service.service';
import { PanierServiceService } from './panier-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatIconModule, MatListModule, MatCardModule, MatToolbarModule, MatDialogModule } from '@angular/material';
import { MatMenuModule, MatInputModule, MatSidenavModule, MatSelectModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AppComponent } from './app.component';
import { PanierComponent } from './panier/panier.component';
import { CarsComponent } from './cars/cars.component';
import { HeaderComponent, FirstContentDialogComponent} from './header/header.component';
import { UserComponent } from './user/user.component';
import { CarComponent } from './car/car.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { environment } from '../environments/environment.prod';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleKeysPipe } from './vehicle-keys.pipe';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: 'panier', component: PanierComponent },
  { path: 'user', component: UserComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'vehicle/:id', component: VehicleDetailsComponent },
  { path: '**', redirectTo: 'cars' }
];

@NgModule({
  declarations: [
    AppComponent,
    PanierComponent,
    CarsComponent,
    HeaderComponent,
    UserComponent,
    CarComponent,
    VehicleDetailsComponent,
    VehicleKeysPipe,
    FirstContentDialogComponent
  ],
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatGridListModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    MatListModule, BrowserModule, MatButtonModule, MatCheckboxModule, BrowserAnimationsModule, RouterModule.forRoot(routes)
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ],
  entryComponents: [
    FirstContentDialogComponent
  ],
  providers: [PanierServiceService, VehiculesServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
