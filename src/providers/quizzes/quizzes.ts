import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppModule } from '../../app/app.module';


@Injectable()
export class QuizzesProvider {
  url: string;

  constructor(public http: HttpClient) {
    console.log('Hello QuizzesProvider Provider');
    // this.url = 'http://localhost/quizDTO/api';
    this.url = AppModule.api.url_api;
  }
  public getQuiz2(quizNum, category, difficulty, periodo){
    return new Promise((resolve, reject) =>{        
        let url = this.url +'getquiz/'+ quizNum + '/' + category + '/' + difficulty+ '/' + periodo;
        console.log(url);        
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
  public getQuizMedio(quizNum, category, difficulty, periodo){
    return new Promise((resolve, reject) =>{        
        let url = this.url +'getquizmedio/'+ quizNum + '/' + category + '/' + difficulty+ '/' + periodo;
        console.log(url);        
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
  public getQuizPorSala(idSala){
    return new Promise((resolve, reject) =>{        
        let url = this.url +'getquizporsala/'+idSala;
        console.log(url);        
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
  public delQuizz(idQuizz){
    return new Promise((resolve, reject) =>{        
        let url = this.url +'delquizz/'+idQuizz;
        console.log(url);        
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
  public saveQuestoesAval(nomeAluno, idSala, results, notalFinalAluno){
      return new Promise((resolve, reject) =>{
        console.log("Entrei saveQuestoesAval Provider");               
      
        let postData = new FormData();        
        postData.append('nome_aluno',  nomeAluno);
        postData.append('id_sala',  idSala);
        postData.append('questoes', results);
        postData.append('nota', notalFinalAluno);
                
          let url = AppModule.getApi().url_api+"respostasSala/";
          console.log(url);
                  
          this.http.post(url, postData)
            .subscribe(result => {
                console.log('salvo Questões da Sala');
                resolve(result);                                              
            }, error => {
                console.log(error);
                console.log("Entrei Erro Questões da Salat");              
                reject(error); 
            });

      localStorage.removeItem("dados-sala-aval"); 
      });     
  }
  public getRespostasSala(idSala){
    return new Promise((resolve, reject) =>{        
        let url = this.url +'getRespostasSala/'+idSala;
        console.log(url);        
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
