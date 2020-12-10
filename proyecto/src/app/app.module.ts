import { AuthGuard } from './auth.guard';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule, MatInputModule, MatCheckbox } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material';
//import { LayoutModule } from '@angular/cdk/layout'; 
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import {MatMenuModule} from '@angular/material/menu';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { AsidePerfilComponent } from './components/aside-perfil/aside-perfil.component';
import {MatCardModule} from '@angular/material/card';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserEditEstablecimientoComponent } from './components/user-edit-establecimiento/user-edit-establecimiento.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { ListComponent } from './components/list/list.component';
import { ListAddComponent } from './components/list-add/list-add.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ListEditComponent } from './components/list-edit/list-edit.component';
import {MatTableModule} from '@angular/material/table';
import { SongAddComponent } from './components/song-add/song-add.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';


import {MatSortModule} from '@angular/material/sort'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import { SongEditComponent } from './components/song-edit/song-edit.component';
import { AlertMenssageComponent } from './components/alert-menssage/alert-menssage.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { TimeEditComponent } from './components/time-edit/time-edit.component'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FooterComponent } from './components/footer/footer.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HomeComponent } from './components/home/home.component';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { RecoverComponent } from './components/recover/recover.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent, 
    SignupComponent,
    SigninComponent,
    UserDetailComponent,
    AsidePerfilComponent,
    UserEditComponent,
    UserEditEstablecimientoComponent,
    SongListComponent,
    ListComponent,
    ListAddComponent,
    ListEditComponent,
    SongAddComponent,
    SongEditComponent,
    AlertMenssageComponent,
    ChangePasswordComponent,
    TimeEditComponent,
    FooterComponent,
    HomeComponent,
    TermsComponent,
    PrivacyComponent,
    RecoverComponent,
    EmployeeListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule, 
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
    


  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
