import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Creations } from 'src/app/models/creations';
import { ApiService } from 'src/app/services/api.service';
import * as _ from 'lodash';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  creation: Creations;
  id: string;
  private routeSub: Subscription;
  public imagePath: any;
  imgURL: any;
  public message: string;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  isCompressing = false;

  formCreation: FormGroup = this.formBuilder.group({
    title: '',
    description: '',
    categorie: 'Bijoux',
    published: ''
  });

  constructor(private as: ApiService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.as.getCreationById(this.id).subscribe(data => {
      this.creation = data;
      this.formCreation = this.formBuilder.group({
        title: this.creation.title,
        image: this.creation.image,
        published: this.creation.published,
        description: this.creation.description,
        categorie: this.creation.categorie,
      });
      this.imgURL = this.creation.image;

    }
    );
  }

  addCreation(): void{
    this.creation = {
      title: this.formCreation.value.title,
      description: this.formCreation.value.description,
      categorie: this.formCreation.value.categorie,
      image: this.cardImageBase64,
      published: this.formCreation.value.published,
      date: new Date()
    };
    this.as.editCreations(this.id, this.creation).toPromise().then(e => this.router.navigate(['/admin/creations']));
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
