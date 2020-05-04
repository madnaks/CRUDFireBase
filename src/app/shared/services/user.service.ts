import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  addUser(user: User) {
    return this.firestore.collection('users').add(user);
  }

  getUsersList() {
    return this.firestore.collection('users').snapshotChanges();
  }

  getUser(id: string) {
    return this.firestore.doc('users/' + id).get();
  }

  updateUser(user: User) {
    return this.firestore.doc('users/' + user.id).update(user);
  }

  deleteStudent(userId: string) {
    this.firestore.doc('users/' + userId).delete();
  }
}
