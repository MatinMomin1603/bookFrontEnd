import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { map } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
    // Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
    url = "http://65.1.95.209/api/";
    // url = "http://192.168.1.106/";
  constructor(public http: HttpClient) { }
 
  login(data:any){
       let pageAction = 'admin/login';
       return this.http.post(this.url+pageAction, JSON.stringify(data)).pipe(map(results=>results));
  }

  getBook(){
       let pageAction = 'admin/book';
       return this.http.get(this.url+pageAction).pipe(map(results=>results));
  }

  submitBook(data:any){
    let pageAction = 'admin/book';
    return this.http.post(this.url+pageAction, data).pipe(map(results=>results));
  }

  updateBook(data:any){
    let pageAction = 'admin/book/edit';
    return this.http.post(this.url+pageAction, JSON.stringify(data)).pipe(map(results=>results));
  }
  
  usersignUp(data:any){
    let pageAction = 'user';
    return this.http.post(this.url+pageAction, JSON.stringify(data)).pipe(map(results=>results));
  }

  userLogin(data:any){
    let pageAction = 'user/login';
    return this.http.post(this.url+pageAction, JSON.stringify(data)).pipe(map(results=>results));
  }

  getUserBookData(search:any=''){
    let pageAction = 'user/dashboard?search=' + search;
    return this.http.get(this.url+pageAction).pipe(map(results=>results));
  }

  getUserBookDeatils(data:any){
    let pageAction = 'user/book/view';
    return this.http.post(this.url+pageAction, JSON.stringify(data)).pipe(map(results=>results));
  }

}
