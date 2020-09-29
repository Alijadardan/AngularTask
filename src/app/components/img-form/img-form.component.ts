import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ImageUploadService } from '@services/image-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-img-form',
  templateUrl: './img-form.component.html',
  styleUrls: ['./img-form.component.scss']
})
export class ImgFormComponent implements OnInit {

  @Input() isAddMode;
  @Input() loading;
  @Input() id;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  files;

  constructor(private imgService: ImageUploadService) { }

  ngOnInit(): void {
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

  deleteImage(id) {
    let placeholder = this.files;
    this.files = undefined;
    this.imgService.deleteImage(id).subscribe({
      next: () => {
        Swal.fire({
          text: 'Img was Deleted',
          icon: 'success'
        });
        this.files = placeholder;
        this.files = this.files.filter(function (obj) {
          return obj.id !== id;
        });
        this.showImages();
      },
      error: error => {
        Swal.fire({
          text: 'Img was not Deleted',
          icon: 'error'
        });
      }
    });
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

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }

  addImage() {
    let id: number = +this.id;
    this.imgService.addImage(id, this.cardImageBase64).subscribe({
      next: () => {
        Swal.fire({
          text: 'Img was Added',
          icon: 'success'
        });
        this.files.push({
          id: null,
          taskId: null,
          oggetto: "",
          allegato: this.cardImageBase64
        });
        this.removeImage();
      },
      error: error => {
        Swal.fire({
          text: 'Img was not Added : ' + error,
          icon: 'error'
        });
      }
    })
  }
}
