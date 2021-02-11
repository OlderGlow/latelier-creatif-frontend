import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Evenements } from 'src/app/models/evenements';
import { ApiService } from 'src/app/services/api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddEvenementComponent implements OnInit {

  Evenement: Evenements;
  public imagePath: any;
  imgURL: any;
  public message: string;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  formEvenement: FormGroup = this.formBuilder.group({
    title: '',
    description: '',
    categorie: 'Expo-Vente',
    lieu: '',
    date: '',
    published: true,
  });

  constructor(private as: ApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  addEvenement(): void{
    this.Evenement = {
      title: this.formEvenement.value.title,
      description: this.formEvenement.value.description,
      categorie: this.formEvenement.value.categorie,
      image: this.cardImageBase64,
      lieu: this.formEvenement.value.lieu,
      published: true,
      date: this.formEvenement.value.date
    };
    console.log(this.Evenement);
    this.as.addEvenement(this.Evenement).toPromise().then(e => this.router.navigate(['/admin/evenements']));
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
