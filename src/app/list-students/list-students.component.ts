import { Component, OnInit } from '@angular/core';
import { StudentService } from '../shared/services/student.service';
import { Student } from '../shared/models/student';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss']
})
export class ListStudentsComponent implements OnInit {

  students: Student[];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents() {
    this.studentService.getStudentsList().subscribe(data => {
      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Student
        };
      });
    });
  }

  delete(id: string) {
    this.studentService.deleteStudent(id);
  }

}
