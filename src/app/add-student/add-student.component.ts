import { Component, OnInit } from '@angular/core';
import { Student } from '../shared/models/student';
import { StudentService } from '../shared/services/student.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  public student = new Student();
  formAdd: NgForm;
  id: string;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params  => {
      this.id=params['id'];
    });
    if (this.id) {
      this.getStudent(this.id);
    }
  }
  getStudent(id) {
    this.studentService.getStudent(id).subscribe(res => {
      this.student = res.data() as Student;
      this.student.id = res.id;
    });
  }

  save() {
    if (!this.student.id) {
      this.studentService.addStudent({ ...this.student }).then((res) => {
        this.formAdd.resetForm();
      });
    } else {
      this.studentService.updateStudent(this.student);
    }
  }
}
