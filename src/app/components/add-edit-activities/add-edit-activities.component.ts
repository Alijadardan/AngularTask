import { ImgFormComponent } from './../img-form/img-form.component';
import { TasksService } from '@services/tasks.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import Anagrafiche from 'src/app/models/Anagrafiche';
import TaskType from 'src/app/models/taskType';
import TaskStatus from 'src/app/models/taskStatus';
import Swal from 'sweetalert2';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-edit-activities',
  templateUrl: './add-edit-activities.component.html',
  styleUrls: ['./add-edit-activities.component.scss']
})
export class AddEditActivitiesComponent implements OnInit {

  colors: any = ['#228BE6', '#8B8B8B', '#12b886', '#ffffff'];
  anagrafiches: Anagrafiche;
  idTaskTypes: TaskType;
  taskStatus: TaskStatus;
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  error: "";
  classApplied = false;
  isDirty = false;

  @ViewChild(ImgFormComponent) imgForm: ImgFormComponent;


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tasksService: TasksService,) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.buildForm();
    this.GetTaskInfo();

    if (!this.isAddMode) {
      this.patchValues();
      this.loading = true;
    }
    this.form.valueChanges.subscribe(e => this.isDirty = true);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createTask();
    } else {
      this.updateTask();
    }
  }

  createTask() {
    this.tasksService.createTask(this.form.value).pipe(first())
      .subscribe({
        next: () => {
          this.isDirty = false;
          Swal.fire({
            text: 'Task was Added',
            icon: 'success'
          });
          this.router.navigate(['/'], { relativeTo: this.route });
        },
        error: error => {
          Swal.fire({
            text: 'Somthing went wrong :' + error,
            icon: 'error'
          });
          this.loading = false;
        }
      })
  }

  updateTask() {
    this.tasksService.updateTask(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.isDirty = false;
          Swal.fire({
            text: 'Task was Updated',
            icon: 'success'
          });
          this.router.navigate(['/'], { relativeTo: this.route });
        },
        error: error => {
          Swal.fire({
            text: 'Somthing went wrong :' + error,
            icon: 'error'
          });
          this.loading = false;
        }
      });
  }


  GetTaskInfo() {
    let taskStatus = JSON.parse(localStorage.getItem('taskStatus'));
    let taskType = JSON.parse(localStorage.getItem('taskType'));
    let anagrafiche = JSON.parse(localStorage.getItem('anagrafiche'));
    if (taskStatus && taskType && anagrafiche) {
      this.taskStatus = taskStatus;
      this.idTaskTypes = taskType;
      this.anagrafiches = anagrafiche;
    } else {
      this.tasksService.getTaskInfo().subscribe({
        next: (data) => {
          localStorage.setItem('taskStatus', JSON.stringify(data.status));
          localStorage.setItem('taskType', JSON.stringify(data.type));
          localStorage.setItem('anagrafiche', JSON.stringify(data.anagrafiche));
        },
        error: error => {
          Swal.fire({
            text: 'Somthing went wrong :' + error,
            icon: 'error'
          });
        }
      });
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      subject: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      idAnagrafica: [1, Validators.required],
      idTaskType: [7, Validators.required],
      idTaskStatus: [1, Validators.required],
      color: ['#228BE6', Validators.required],
      note: ['', Validators.required],
    });
  }

  patchValues() {
    this.tasksService.getTaskById(this.id)
      .pipe(first())
      .subscribe((x) => {
        this.form.patchValue({
          subject: x.subject,
          startDate: x.startDate,
          endDate: x.endDate,
          idAnagrafica: x.anagrafiche.id,
          idTaskType: x.taskType.id,
          idTaskStatus: x.taskStatus.id,
          color: x.taskColor,
          note: x.note
        });
        this.loading = false;
        this.isDirty = false;
      });
  }

  toggleClass() {
    this.classApplied = !this.classApplied;
  }

  canDeactivate() {
    return this.isDirty;
  }

  childEventClicked() {
    this.imgForm.showImages();
  }

  get f() { return this.form.controls; }

}
