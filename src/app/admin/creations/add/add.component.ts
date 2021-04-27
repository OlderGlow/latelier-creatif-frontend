import { Router } from '@angular/router';
import { Creations } from './../../../models/creations';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  creation: Creations;
  public imagePath: any;
  imgURL: any;
  public message: string;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  isLoading: boolean;

  formCreation: FormGroup = this.formBuilder.group({
    title: '',
    description: '',
    categorie: 'Bijoux',
  });

  constructor(private as: ApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  addCreation(creation): void{
    this.creation = {
      title: this.formCreation.value.title,
      description: this.formCreation.value.description,
      categorie: this.formCreation.value.categorie,
      image: this.cardImageBase64,
      published: true,
      date: new Date()
    };
    this.isLoading = true;
    this.as.addCreations(this.creation).toPromise().then(e => this.router.navigate(['/admin/creations']));
  }

  async handleImageUpload(event): Promise<any> {

    const imageFile = event.target.files[0];
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 0.02,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };

    try {
      console.log('compression en attente');
      const compressedFile = await imageCompression(imageFile, options);
      console.log('compression terminée');
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
      console.log(compressedFile);
      const x = imageCompression.getDataUrlFromFile(compressedFile);
      this.cardImageBase64 = (await x).toString();
    } catch (error) {
      console.log(error);
    }

  }

  fileChangeEvent(fileInput: any) {
    console.log(fileInput);
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 10000;
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

                console.log(img_height, img_width);


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


  preview(files: string | any[]): void {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Format d\'image incorrect';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

}
