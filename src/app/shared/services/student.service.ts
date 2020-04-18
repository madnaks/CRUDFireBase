import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private firestore: AngularFirestore) { }
  addStudent(student: Student) {
    return this.firestore.collection('student').add(student);
    // la fonction collection prend en paramètre le nom de la collection firebas
  }

  getStudentsList() {
    return this.firestore.collection('student').snapshotChanges();
  }

  getStudent(id: string) {
    return this.firestore.doc('student/' + id).get();
  }

  updateStudent(student: Student) {
    return this.firestore.doc('student/' + student.id).update(student);
  }

  deleteStudent(studentId: string) {
    this.firestore.doc('student/' + studentId).delete();
  }
}
