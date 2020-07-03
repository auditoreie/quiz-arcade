import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppModule } from '../../app/app.module';


@Injectable()
export class EnsinomedioProvider {
  url: any;

  constructor(public http: HttpClient) {
    console.log('Hello EnsinomedioProvider Provider');        
    this.url = AppModule.api.url_api;
  }

  public getDisciplinasMedio(ciencia){
    return new Promise((resolve, reject) =>{        
        let url = this.url +'getdisciplinasmed/'+ciencia;
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
