import { TasksService } from './../../services/tasks.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, endWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import Anagrafiche from 'src/app/models/Anagrafiche';
import TaskType from 'src/app/models/taskType';
import TaskStatus from 'src/app/models/taskStatus';
import Swal from 'sweetalert2';


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


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tasksService: TasksService,) { }


  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      subject: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      idAnagrafica: [1, Validators.required],
      idTaskType: [7, Validators.required],
      idTaskStatus: [1, Validators.required],
      color: ['#228BE6', Validators.required],
      note: ['', Validators.required]
    });

    this.GetTaskInfo();

    if (!this.isAddMode) {
      this.tasksService.getTaskById(this.id)
        .pipe(first())
        .subscribe((x) => {
          console.log(x);
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
        });

        this.loading = true;
    }

    this.form.valueChanges.subscribe( e => this.isDirty = true );
  }

  get f() { return this.form.controls; }

  onSubmit() {
    console.log(this.form);
    this.submitted = true;

    // stop here if form is invalid
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
          this.error = error;
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
          this.error = error;
          this.loading = false;
        }
      });
  }


  GetTaskInfo(){
    let taskStatus = JSON.parse(localStorage.getItem('taskStatus'));
    let taskType = JSON.parse(localStorage.getItem('taskType'));
    let anagrafiche = JSON.parse(localStorage.getItem('anagrafiche'));
    if(taskStatus && taskType && anagrafiche ){
      this.taskStatus = taskStatus;
      this.idTaskTypes = taskType;
      this.anagrafiches = anagrafiche;
    }else{
      this.tasksService.getTaskInfo().subscribe((data)=> {
        console.log(data);
        localStorage.setItem('taskStatus',JSON.stringify(data.status));
        localStorage.setItem('taskType', JSON.stringify(data.type));
        localStorage.setItem('anagrafiche', JSON.stringify(data.anagrafiche));
      });
    }
  }

  toggleClass(){
    this.classApplied = !this.classApplied;
  }

  canDeactivate() {
    return this.isDirty;
  }

}
