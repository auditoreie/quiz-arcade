import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppModule } from '../../app/app.module';


@Injectable()
export class HomeProvider {
  url: string;

  constructor(public http: HttpClient) {
    console.log('Hello HomeProvider Provider');
    // this.url = 'http://localhost/quizDTO/api';
    this.url = AppModule.api.url_api;
  }
  public getCursos(ciencia){
    return new Promise((resolve, reject) =>{        
        let url = this.url +'/getcursos/'+ciencia;
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
  public qtdPorCurso(idcurso){
    return new Promise((resolve, reject) =>{        
        let url = this.url +'/qtdQuestCurso/'+ idcurso;
        this.http.get(url)       
         .subscribe((result: any) => {            
              resolve(result);
              //console.log(result);                            
          },

          (error) => {
            reject(error);
          })                   
    });
  }

}
