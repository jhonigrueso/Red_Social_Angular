// importar modulos del router de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importar componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

import { UserGuard } from './services/user.guard';

// Array de rutas
const appRoute: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'edit-user', component: UserEditComponent, canActivate: [UserGuard] },
  { path: 'gente', component: UsersComponent, canActivate: [UserGuard] },
  { path: 'gente/:page', component: UsersComponent, canActivate: [UserGuard] },
  { path: 'timeline', component: TimelineComponent, canActivate: [UserGuard] },
  { path: 'perfil/:id', component: ProfileComponent, canActivate: [UserGuard] },
  {
    path: 'siguiendo/:id/:page',
    component: FollowingComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'seguidores/:id/:page',
    component: FollowedComponent,
    canActivate: [UserGuard],
  },

  { path: '**', component: ErrorComponent },
];
//Exportar el modulo del router
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> =
  RouterModule.forRoot(appRoute);
