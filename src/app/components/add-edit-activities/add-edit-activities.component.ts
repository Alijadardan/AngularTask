import { ImageUploadService } from './../../services/image-upload.service';
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
  showForm = false;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  files;


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tasksService: TasksService,
    private imgService: ImageUploadService) { }


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
      note: ['', Validators.required],
    });

    this.GetTaskInfo();

    if (!this.isAddMode) {
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

      this.loading = true;
    }

    this.form.valueChanges.subscribe(e => this.isDirty = true);
  }

  get f() { return this.form.controls; }

  onSubmit() {
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


  GetTaskInfo() {
    let taskStatus = JSON.parse(localStorage.getItem('taskStatus'));
    let taskType = JSON.parse(localStorage.getItem('taskType'));
    let anagrafiche = JSON.parse(localStorage.getItem('anagrafiche'));
    if (taskStatus && taskType && anagrafiche) {
      this.taskStatus = taskStatus;
      this.idTaskTypes = taskType;
      this.anagrafiches = anagrafiche;
    } else {
      this.tasksService.getTaskInfo().subscribe((data) => {
        localStorage.setItem('taskStatus', JSON.stringify(data.status));
        localStorage.setItem('taskType', JSON.stringify(data.type));
        localStorage.setItem('anagrafiche', JSON.stringify(data.anagrafiche));
      });
    }
  }

  toggleClass() {
    this.classApplied = !this.classApplied;
  }

  canDeactivate() {
    return this.isDirty;
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }

  addImage(id) {
    let y: number = +id;
    this.loading = true;
    this.imgService.addImage(y, this.cardImageBase64).subscribe({
      next: () => {
        Swal.fire({
          text: 'Img was Added',
          icon: 'success'
        });
        this.files.unshift({
          id: null,
          taskId: null,
          oggetto: "",
          allegato: this.cardImageBase64
        });
        this.loading = false;
      },
      error: error => {
        Swal.fire({
          text: 'Img was not Added',
          icon: 'error'
        });
        this.loading = false;
        // this.error = error;
      }
    })
  }

  AddImage() {
    if (!this.isAddMode) {
      this.addImage(this.id);
      const element: HTMLElement = document.getElementById('imgForm');
      element.style.display = 'none';
      this, this.showForm = false;
    }
  }

  showImgForm() {
    this.showImages();
    const element: HTMLElement = document.getElementById('imgForm');
    if (!this.showForm) {
      element.style.display = 'block';
      this.showForm = true;
    } else {
      element.style.display = 'none';
      this.showForm = false;
    }
  }

  showImages() {
    this.imgService.getImageById(this.id).subscribe(
      {
        next: (data) => {
          this.files = data;
          this.loading = false;
        },
        error: error => {
          Swal.fire({
            text: 'No Image Found',
            icon: 'warning'
          });
          this.loading = false;
          this.files = [];
        }
      });
  }

  deleteImage(id) {
    let placeholder = this.files;
    this.files = undefined;
    this.loading = true;
    this.imgService.deleteImage(id).subscribe({
      next: () => {
        Swal.fire({
          text: 'Img was Deleted',
          icon: 'success'
        });
        this.files = placeholder;
        this.files.splice(this.files.filter(el => el.id == id), 1);
        this.showImages();
        this.loading = false;
      },
      error: error => {
        Swal.fire({
          text: 'Img was not Deleted',
          icon: 'error'
        });
        this.loading = false;
      }
    });
  }
}
