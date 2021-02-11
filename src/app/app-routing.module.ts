import { AddEvenementComponent } from './admin/adminevenements/add/add.component';
import { EditEvenementComponent } from './admin/adminevenements/edit/edit.component';
import { EditComponent } from './admin/creations/edit/edit.component';
import { AddComponent } from './admin/creations/add/add.component';
import { CreationsComponent } from './admin/creations/creations.component';
import { AdminEvenementsComponent } from './admin/adminevenements/evenements.component';
import {
  AdminloginComponent
} from './admin/adminlogin/adminlogin.component';
import {
  OperationsComponent
} from './evenements/operations/operations.component';
import {
  EvenementsComponent
} from './evenements/evenements/evenements.component';
import {
  ExpoventeComponent
} from './evenements/expovente/expovente.component';
import {
  DeconoelComponent
} from './creations/deconoel/deconoel.component';
import {
  CarterieComponent
} from './creations/carterie/carterie.component';
import {
  TricotComponent
} from './creations/tricot/tricot.component';
import {
  BroderieComponent
} from './creations/broderie/broderie.component';
import {
  CoutureComponent
} from './creations/couture/couture.component';
import {
  BricolageComponent
} from './creations/bricolage/bricolage.component';
import {
  StatusComponent
} from './administration/status/status.component';
import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  HistoriqueComponent
} from './administration/historique/historique.component';
import {
  ContactComponent
} from './contact/contact.component';
import {
  AuthGuardService as AuthGuard
} from './services/auth-guard.service';
import { HomeComponent } from './admin/home/home.component';

const routes: Routes = [{
    path: 'administration/historique',
    component: HistoriqueComponent
  },
  {
    path: 'administration/status',
    component: StatusComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'creations/bricolage',
    component: BricolageComponent
  },
  {
    path: 'creations/couture',
    component: CoutureComponent
  },
  {
    path: 'creations/broderie',
    component: BroderieComponent
  },
  {
    path: 'creations/tricot',
    component: TricotComponent
  },
  {
    path: 'creations/carterie',
    component: CarterieComponent
  },
  {
    path: 'creations/deconoel',
    component: DeconoelComponent
  },
  {
    path: 'evenements/expovente',
    component: ExpoventeComponent
  },
  {
    path: 'evenements/animations',
    component: EvenementsComponent
  },
  {
    path: 'evenements/operations',
    component: OperationsComponent
  },
  {
    path: 'admin/login',
    component: AdminloginComponent,
  },
  {
    path: 'admin/home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/evenements',
    component: AdminEvenementsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/creations',
    component: CreationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/creations/add',
    component: AddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/creations/edit/:id',
    component: EditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/evenements/edit/:id',
    component: EditEvenementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/evenements/add',
    component: AddEvenementComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
