import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { RecoverComponent } from './components/recover/recover.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsComponent } from './components/terms/terms.component';
import { HomeComponent } from './components/home/home.component';
import { TimeEditComponent } from './components/time-edit/time-edit.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { SongEditComponent } from './components/song-edit/song-edit.component';
import { SongAddComponent } from './components/song-add/song-add.component';
import { ListComponent } from './components/list/list.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { UserEditEstablecimientoComponent } from './components/user-edit-establecimiento/user-edit-establecimiento.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AsidePerfilComponent } from './components/aside-perfil/aside-perfil.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { PlayerComponent } from './components/player/player.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'reproductor', component: PlayerComponent, canActivate: [AuthGuard] },
  { path: 'play/:id', component: PlayerComponent, canActivate: [AuthGuard] },
  { path: 'entrar', component: SigninComponent },
  { path: 'registrarse', component: SignupComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'recover', component: RecoverComponent },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard] },

  { path: 'perfil', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'user-edit', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'user-edit-establishment', component: UserEditEstablecimientoComponent, canActivate: [AuthGuard] },
  { path: 'list', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'song-list', component: SongListComponent , canActivate: [AuthGuard]},
  { path: 'song-add', component: SongAddComponent, canActivate: [AuthGuard] },
  { path: 'song-edit/:id', component: SongEditComponent, canActivate: [AuthGuard] },
  { path: 'time-edit', component: TimeEditComponent, canActivate: [AuthGuard] },

  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },


  //{ path: '**', component: PlayerComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
