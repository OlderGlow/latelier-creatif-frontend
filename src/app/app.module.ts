import { AddEvenementComponent } from './admin/adminevenements/add/add.component';
import { EditEvenementComponent } from './admin/adminevenements/edit/edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminEvenementsComponent } from './admin/adminevenements/evenements.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './includes/navbar/navbar.component';
import { MaincontentComponent } from './main-content/maincontent/maincontent.component';
import { HistoriqueComponent } from './administration/historique/historique.component';
import { FooterComponent } from './includes/footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { StatusComponent } from './administration/status/status.component';
import { CoutureComponent } from './creations/couture/couture.component';
import { BricolageComponent } from './creations/bricolage/bricolage.component';
import { BroderieComponent } from './creations/broderie/broderie.component';
import { TricotComponent } from './creations/tricot/tricot.component';
import { CarterieComponent } from './creations/carterie/carterie.component';
import { DeconoelComponent } from './creations/deconoel/deconoel.component';
import { ExpoventeComponent } from './evenements/expovente/expovente.component';
import { EvenementsComponent } from './evenements/evenements/evenements.component';
import { OperationsComponent } from './evenements/operations/operations.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { HomeComponent } from './admin/home/home.component';
import { InterceptorService } from './services/interceptor.service';
import { CreationsComponent } from './admin/creations/creations.component';
import { AddComponent } from './admin/creations/add/add.component';
import { EditComponent } from './admin/creations/edit/edit.component';
import { LoaderComponent } from './includes/loader/loader.component';
import { ModalComponent } from './includes/modals/modals.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MaincontentComponent,
    HistoriqueComponent,
    FooterComponent,
    ContactComponent,
    StatusComponent,
    CoutureComponent,
    BricolageComponent,
    BroderieComponent,
    TricotComponent,
    CarterieComponent,
    DeconoelComponent,
    ExpoventeComponent,
    EvenementsComponent,
    OperationsComponent,
    AdminloginComponent,
    HomeComponent,
    CreationsComponent,
    AdminEvenementsComponent,
    AddComponent,
    EditComponent,
    LoaderComponent,
    ModalComponent,
    EditEvenementComponent,
    AddEvenementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [FormBuilder, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
