import { TasksService } from './../../services/tasks.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, endWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import Anagrafiche from 'src/app/models/Anagrafiche';
import TaskType from 'src/app/models/taskType';
import TaskStatus from 'src/app/models/taskStatus';


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

    this.getAnagrafiche();
    this.getTaskType();
    this.getTaskStatus();

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
          alert("Task was Added");
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
          alert("Task was Updated");
          this.router.navigate(['/'], { relativeTo: this.route });
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  getAnagrafiche(){
    let anagrafiche = JSON.parse(localStorage.getItem('anagrafiche'));
    if(anagrafiche){
      this.anagrafiches = anagrafiche;
    }else{
      this.tasksService.getAnagrafiche().subscribe((data)=>{
        this.anagrafiches = data;
        localStorage.setItem('anagrafiche', JSON.stringify(data));
      });
    }
  }

  getTaskType(){
    let taskType = JSON.parse(localStorage.getItem('taskType'));
    if(taskType){
      this.idTaskTypes = taskType;
    }else{
      this.tasksService.getTaskType().subscribe((data)=>{
        this.idTaskTypes = data;
        localStorage.setItem('taskType', JSON.stringify(data));
      })
    }
  }

  getTaskStatus(){
    let taskStatus = JSON.parse(localStorage.getItem('taskStatus'));
    if(taskStatus){
      this.taskStatus = taskStatus;
    }else{
      this.tasksService.getTaskStatus().subscribe((data)=>{
        this.taskStatus = data;
        localStorage.setItem('taskStatus', JSON.stringify(data));
      })
    }
  }

  toggleClass(){
    this.classApplied = !this.classApplied;
  }

}
