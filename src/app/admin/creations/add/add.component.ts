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
  isCompressing = false;
  formCreation: FormGroup = this.formBuilder.group({
    title: '',
    description: '',
    categorie: 'Bijoux',
  });

  constructor(private as: ApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  addCreation(): void{
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
    const options = {
      maxSizeMB: 0.02,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };

    try {
      this.isCompressing = true;
      const compressedFile = await imageCompression(imageFile, options);
      this.isCompressing = false;
      const x = imageCompression.getDataUrlFromFile(compressedFile);
      this.cardImageBase64 = (await x).toString();
    } catch (error) {
      console.log(error);
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
