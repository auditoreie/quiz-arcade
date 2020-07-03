import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppModule } from '../../app/app.module';


@Injectable()
export class AutenticationApiProvider {
  private baseApi = AppModule.getApi().url_api;
  // private baseApi = this.api.apiBase;

  constructor(public http: HttpClient) {
    console.log('Hello AutenticationApiProvider Provider');
  }
  login(email, password){
      return new Promise((resolve, reject) =>{        
        let url = this.baseApi+'login/'+email+"/"+password;
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
  public loginPost(email, password){
    // console.log(dados);
    
    return new Promise((resolve, reject) =>{
        console.log("Entrei loginPost");               
       
        let postData = new FormData();        
        postData.append('email' ,  email);
        postData.append('senha' , password);
                
          let url = AppModule.getApi().url_api+"login/";
          console.log(url);
                  
          this.http.post(url, postData)
            .subscribe(result => {
                console.log('enviado');
                resolve(result);                                              
            }, error => {
                console.log(error);
                console.log("Entrei Erro loginPost");              
                reject(error); 
            });
    });
  }
  buscarSala(sala){
    return new Promise((resolve, reject) =>{        
      let url = this.baseApi+'buscarsala/'+sala;
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
}
