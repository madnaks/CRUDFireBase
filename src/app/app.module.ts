import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { ListStudentsComponent } from './list-students/list-students.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path : '' , component : LoginComponent},
  { path: 'login', component : LoginComponent },
  { path: 'all-student', component: ListStudentsComponent },
  { path: 'add-student', component: AddStudentComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    ListStudentsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates:true
    }),
  ],
  providers: [ AngularFirestore],
  bootstrap: [AppComponent]
})


export class AppModule { }
