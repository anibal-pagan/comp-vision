import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { UrlObj } from './url-obj';
import { DescriptionTagRequest } from './description-tag-request';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private httpClient: HttpClient) { }

  private _handleError(error: HttpErrorResponse | any) {
    let data = {};
    data = {
      reason: error && error.error.reason ? error.error.reason : '',
      status: error.status
    };
    console.error(data);
    return throwError(error);
  }

  public server = "https://angularworkshop.cognitiveservices.azure.com/vision/v2.1/analyze?visualFeatures=Description,Tags";

  public analyzeImage(url: UrlObj): Observable<DescriptionTagRequest> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'ocp-apim-subscription-key': 'bfd61d7d608146108062b503f4f49de5'
      })
    };
    return this.httpClient.post<DescriptionTagRequest>(this.server, url, httpOptions).pipe(catchError(this._handleError));

  }
}
