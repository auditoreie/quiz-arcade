import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppModule } from '../../app/app.module';


@Injectable()
export class DisciplinasProvider {
  url: string;

  constructor(public http: HttpClient) {
    console.log('Hello DisciplinasProvider Provider');
    // this.url = 'http://localhost/quizDTO/api';
    this.url = AppModule.api.url_api;
  }
  public getDisciplinas(curso){
    return new Promise((resolve, reject) =>{        
        let url = this.url +'/getdisciplinas/'+ curso;
        this.http.get(url)       
         .subscribe((result: any) => {            
              resolve(result);
              // console.log(result);                            
          },

          (error) => {
            reject(error);
          })                   
    });
  }
  public getDisciplinas2(ciencia){
    return new Promise((resolve, reject) =>{        
        let url = this.url +'/getdisciplinasmed/'+ciencia;
        this.http.get(url)       
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
