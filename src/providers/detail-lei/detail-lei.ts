import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class DetailLeiProvider {
  url: string;

  constructor(public http: HttpClient) {
    console.log('Hello DetailLeiProvider Provider');
    // this.url = 'http://localhost/quizDTO/api';
  }

  public getLei(lei){
    return new Promise((resolve, reject) =>{        
        let url = lei;
        this.http.get(url, {responseType: 'text'})       
         .subscribe((result: any) => {            
              resolve(result);
              console.log(result);                            
          },
          (error) => {
            reject(error);
          })                   
    });
  }

}
