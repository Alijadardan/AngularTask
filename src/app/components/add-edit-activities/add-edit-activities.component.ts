import { TasksService } from './../../services/tasks.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, endWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-add-edit-activities',
  templateUrl: './add-edit-activities.component.html',
  styleUrls: ['./add-edit-activities.component.scss']
})
export class AddEditActivitiesComponent implements OnInit {

  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  colors: any = ['#228BE6', '#8B8B8B', '#12b886', '#ffffff'];
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
      color: ['#228BE6', Validators.required],
      note: ['', Validators.required]
    });

    if (!this.isAddMode) {
      this.tasksService.getTaskById(this.id)
        .pipe(first())
        .subscribe((x) => { this.form.patchValue(x); this.loading = false });

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
          this.router.navigate(['/'], { relativeTo: this.route });
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  toggleClass(){
    this.classApplied = !this.classApplied;
  }

}
