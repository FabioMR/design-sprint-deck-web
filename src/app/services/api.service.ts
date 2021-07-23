import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { DirectUpload } from '@rails/activestorage';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) { }

  get actionCableUrl() {
    return `${environment.apiUrl}/cable?token=${this.authService.token}`;
  };

  get(url, params = {}) {
    return this.parseRequest(this.httpClient.get(`${environment.apiUrl}/${url}`, this.getOptions(params)));
  }

  post(url, params = {}) {
    return this.parseRequest(this.httpClient.post(`${environment.apiUrl}/${url}`, params, this.getOptions()));
  }

  put(url, params = {}) {
    return this.parseRequest(this.httpClient.put(`${environment.apiUrl}/${url}`, params, this.getOptions()));
  }

  patch(url, params = {}) {
    return this.parseRequest(this.httpClient.patch(`${environment.apiUrl}/${url}`, params, this.getOptions()));
  }

  delete(url, params = {}) {
    return this.parseRequest(this.httpClient.delete(`${environment.apiUrl}/${url}`, this.getOptions({}, params)));
  }

  upload(control, file) {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => control['url'] = event.target.result;

    const directUpload = new DirectUpload(file, `${environment.apiUrl}/rails/active_storage/direct_uploads`);

    control.markAsPending();

    directUpload.create((error, response) => {
      if (!error) {
        control.setValue(response.signed_id);
        control.setErrors(null);
      }
    });
  }

  private parseRequest(request) {
    return request
      .toPromise()
      .then(response => this.successResponse(response))
      .catch(response => this.errorResponse(response));
  }

  private getOptions(params = {}, body = {}) {
    const headers: any = { 'Content-Type': 'application/json', OS: 'web' };

    if (this.authService.token) {
      headers.Authorization = `Bearer ${this.authService.token}`;
    }

    return {
      headers,
      params,
      body,
    };
  }

  private successResponse(response) {
    return response;
  }

  private errorResponse(response) {
    switch (response.status) {
      case 401: {
        this.authService.clear();
        this.router.navigate(['/']);
        break;
      }
      case 404: {
        this.router.navigate(['/404']);
        break;
      }
      case 422: {
        throw response.error;
      }
      default: {
        this.router.navigate(['/500']);
        break;
      }
    }

    throw {};
  }
}
