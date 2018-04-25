import { Injectable } from '@angular/core';
import { Transition } from './types';

@Injectable()
export class ApiService {

  private API_URL = "http://localhost:8060/";//"https://fast-dj-api.herokuapp.com/";//"http://localhost:8060/";

  addTransition(transition: Transition) {
    //TODO ADD TIME!!!!!!!!!
    return this.postJsonToApi('transition', transition);
  }

  getAllTransitions(): Promise<Transition[]> {
    return this.getJsonFromApi('transitions');
  }

  private postJsonToApi(path: string, json: {}, params?: {}) {
    path = this.addParams(path, params);
    return fetch(this.API_URL+path, {
      method: 'post',
      body: JSON.stringify(json),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(r => r.text())
      //.then(r => {console.log(r); return r})
      .then(t => JSON.parse(t))
      .catch(e => console.log(e));
  }

  private getJsonFromApi(path: string, params?: {}): Promise<any> {
    path = this.addParams(path, params);
    return fetch(this.API_URL+path)
      .then(r => r.text())
      .then(t => JSON.parse(t))
      .catch(e => console.log(e));
  }

  private addParams(path, params?: {}) {
    if (params) {
      let paramStrings = Array.from(Object.keys(params))
        .map(k => k+"="+encodeURIComponent(params[k]));
      path += '?'+paramStrings.join('&');
    }
    return path;
  }

}