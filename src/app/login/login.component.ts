import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  @ViewChild('closeSignUpModal', { static: false }) closeSignUpModal: ElementRef;
  @ViewChild('closeResetPasswordModal', { static: false }) closeResetPasswordModal: ElementRef;

  public user = new User();
  public newUser = new User();
  public restPasswordUser = new User();
  formResetPassword: FormGroup;

  users: User[];

  constructor(
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router,
    private db: AngularFirestore) { }

  ngOnInit() {
    this.getAllUsers();
    this.formResetPassword = new FormGroup({
      userName: new FormControl(),
      password: new FormControl(),
      newPassword: new FormControl(),
   });
  }

  login() {
    let verifLogin = false;
    for (let val of this.users) {
      if (this.user.userName == val.userName && this.user.password == val.password) {
        verifLogin = true;
      }
    }
    if (verifLogin) {
      this.router.navigate(['all-student']);
    } else {
      this.toaster.error('Failed to sign in', 'Failed');
    }
  }

  getAllUsers() {
    this.userService.getUsersList().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as User
        };
      });
    });
  }

  addUser() {
    this.userService.addUser({ ...this.newUser }).then((res) => {
      this.closeSignUpModal.nativeElement.click();
      this.toaster.success('User added', 'Succeeded');
    });
  }

  resetPassword(){
    let validation = false;
    for(let val of this.users){
      if (this.restPasswordUser.userName == val.userName && this.restPasswordUser.password == val.password){
        validation = true;
        val.password = this.formResetPassword.controls['newPassword'].value;
        debugger;
        this.userService.updateUser(val);
        this.toaster.success('Password of the user :'+this.restPasswordUser.userName+' was changed successfully','Succeeded');
      }
    }
    if(!validation){
      this.toaster.error('User name or password incorrect !','Error');
    }
  }
}
