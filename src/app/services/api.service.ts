import {
  Evenements
} from './../models/evenements';
import {
  Creations
} from './../models/creations';
import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpRequest
} from '@angular/common/http';
import {
  Mail
} from '../models/mail';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import {
  last,
  map,
  tap
} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class ApiService {

  public progressSource = new BehaviorSubject < number > (0);

  API_URL_MAIL = 'https://latelier-creatif.herokuapp.com/mail';
  API_URL_CREATIONS = 'https://latelier-creatif.herokuapp.com/api/categories';
  API_URL_EVENEMENTS = 'https://latelier-creatif.herokuapp.com/api/evenements';

  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(private httpClient: HttpClient) {}

  /* METHODS API CREATIONS */
  postApi(body: Mail): Observable < any > {
    return this.httpClient.post(this.API_URL_MAIL, body, this.options);
  }

  getCreations(id: number, ipp: number): Observable < any > {
    return this.httpClient.get < Creations > (this.API_URL_CREATIONS + '?page=' + id + '&size=' + ipp, this.options);
  }

  getCreationsByCategory(categorie: string, id: number, ipp: number): Observable < any > {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get < Creations > (this.API_URL_CREATIONS + '/search?categorie=' + categorie + '&page=' + id + '&size=' + ipp, this.options);
  }

  addCreations(body: Creations): Observable < Creations > {
    return this.httpClient.post < Creations > (this.API_URL_CREATIONS, body, this.options);
  }

  editCreations(id: string, body: Creations): Observable < Creations > {
    return this.httpClient.put < Creations > (this.API_URL_CREATIONS + '/' + id, body, this.options);
  }

  getCreationById(id: string): Observable < any > {
    return this.httpClient.get < Creations > (this.API_URL_CREATIONS + '/' + id, this.options);
  }

  deleteCreation(id: string): Observable < any > {
    return this.httpClient.delete < Creations > (this.API_URL_CREATIONS + '/' + id, this.options);
  }

  /* METHODS API EVENEMENTS */
  getEvenements(id: number, ipp: number): Observable < any > {
    return this.httpClient.get < Evenements > (this.API_URL_EVENEMENTS + '?page=' + id + '&size=' + ipp, this.options);
  }

  getEvenementsByCategory(categorie: string, id: number, ipp: number): Observable < any > {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get < Evenements > (this.API_URL_EVENEMENTS + '/search?categorie=' + categorie + '&page=' + id + '&size=' + ipp, this.options);
  }

  addEvenement(body: Evenements): Observable < Evenements > {
    return this.httpClient.post < Evenements > (this.API_URL_EVENEMENTS, body, this.options);
  }

  editEvenement(id: string, body: Evenements): Observable < Evenements > {
    return this.httpClient.put < Evenements > (this.API_URL_EVENEMENTS + '/' + id, body, this.options);
  }

  getEvenementById(id: string): Observable < any > {
    return this.httpClient.get < Evenements > (this.API_URL_EVENEMENTS + '/' + id, this.options);
  }

  deleteEvenement(id: string): Observable < any > {
    return this.httpClient.delete < Evenements > (this.API_URL_EVENEMENTS + '/' + id, this.options);
  }

  // tslint:disable-next-line: typedef
  upload(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    const req = new HttpRequest(
      'POST',
      'http://localhost:5000/upload',
      formData, {
        reportProgress: true
      }
    );

    return this.httpClient.request(req).pipe(
      map(event => this.getEventMessage(event, file)),
      tap((envelope: any) => this.processProgress(envelope)),
      last()
    );
  }

  processProgress(envelope: any): void {
    if (typeof envelope === 'number') {
      this.progressSource.next(envelope);
    }
  }

  // tslint:disable-next-line: typedef
  private getEventMessage(event: HttpEvent < any > , file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;
      case HttpEventType.UploadProgress:
        return Math.round((100 * event.loaded) / event.total);
      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;
      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

}
