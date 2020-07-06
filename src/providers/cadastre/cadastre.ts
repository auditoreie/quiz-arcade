import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppModule } from '../../app/app.module';

@Injectable()
export class CadastreProvider {
  url: any;
  salas:any;

  constructor(public http: HttpClient) {
    console.log('Hello CadastreProvider Provider');
    this.url = AppModule.api.url_api;
    this.salas = [];
  }
  
  public getTableGen(table){
    return new Promise((resolve, reject) =>{        
        let url = this.url+'/gettablegeneric/'+table;
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
  public getSalasProf(idProf){
    this.salas = [];
    this.salas = new Promise((resolve, reject) =>{        
        let url = this.url+'getsalasprof/'+idProf;
        console.log(url);        
        this.http.get(url)       
         .subscribe((result: any) =>{            
              console.log(result);  
              resolve(result);                                                      
          },
          (error) => {
            reject(error);
          })                             
    });
    return this.salas;
  }

  public getClassromsByProfId(idProf) {
    const url = `${this.url}getsalasprof/${idProf}`;
    return this.http.get(url);
  }


  public getSalasProfWillEnter(idProf){
    this.salas = [];
    this.salas = new Promise((resolve, reject) =>{        
        let url = this.url+'getsalasprof/'+idProf;
        console.log(url);        
        this.http.get(url)       
         .subscribe((result: any) =>{            
              console.log(result);  
              resolve(result);                                                      
          },
          (error) => {
            reject(error);
          })                             
    });
    return this.salas;
  }
  getSalasProfWillEnterNovo(idProf: string) {
    this.http.get(`${this.url}getsalasprof/${idProf}`)       
     .subscribe(
       (result: any) => {    //tipa a porra toda e para de usar any         
        this.salas = result; // aqui provavel não ser result mas um result.body ou sei lá como tu estruturou
        // aqui mataria o loading tbm
      },
      (error) => {
        console.log(error); // aqui se tivesse um loading tu ia matar ele
      });  
  }
  public delSala(idSala){
    return new Promise((resolve, reject) =>{        
        let url = this.url+'delsala/'+idSala;
        console.log(url);        
        this.http.get(url)       
         .subscribe((result: any) =>{            
              console.log(result);  
              resolve(result);                          
          },
          (error) => {
            reject(error);
          })                   
    });
  }
  public submeteQuestao(dados){
    console.log(dados);
    
    return new Promise((resolve, reject) =>{
        console.log("Entrei submeteQuestao");                      
        let postData = new FormData();        

        postData.append('ciencia' ,  dados.ciencia.value);
        postData.append('curso' , dados.curso.value);
        postData.append('category' , dados.category.value);
        postData.append('periodo' , dados.periodo.value);
        postData.append('type' ,  dados.type);

        postData.append('difficulty' , dados.difficulty.value); 
        postData.append('question' , dados.question.value);  
        postData.append('correct_answer' , dados.correct_answer.value); 
        postData.append('incorrect_answers1' , dados.incorrect_answers1.value); 
        postData.append('incorrect_answers2' , dados.incorrect_answers2.value); 
        postData.append('incorrect_answers3' , dados.incorrect_answers3.value); 
        postData.append('incorrect_answers4' , dados.incorrect_answers4.value); 
        postData.append('video_explicativo' , dados.video_explicativo.value); 
        postData.append('texto_explicativo' , dados.texto_explicativo.value); 
        postData.append('inserido_data' , dados.inserido_data);
        postData.append('inserido_por' , dados.inserido_por);
        postData.append('id_sala' , dados.id_sala);
        postData.append('ativo' , dados.ativo);  
        
        console.log(postData);
        
          let url = this.url+"addquestao/";
          console.log(url);
                  
          this.http.post(url, postData)
            .subscribe(result => {
                console.log('enviado');
                resolve(result);                                              
            }, error => {
                console.log(error);
                console.log("Entrei Erro Provider Cadastrese");              
                reject(error); 
            });
    });
  }
  public submeteSala(dados){
    console.log(dados);
    
    return new Promise((resolve, reject) =>{
        console.log("Entrei submeteQuestao");                      
        let postData = new FormData();        

        postData.append('avaliativa' ,  dados.avaliativa.value);
        postData.append('nome' ,  dados.nomeSala.value);
        postData.append('turma' , dados.turma.value);
        postData.append('disciplina' , dados.disciplina.value);
        postData.append('nota' , dados.nota.value);

        postData.append('data' , dados.data);
        postData.append('id_sala' , dados.id_sala);
        postData.append('id_professor' , dados.id_professor);
         
        
        console.log(postData);
        
          let url = this.url+"addsala/";
          console.log(url);
                  
          this.http.post(url, postData)
            .subscribe(result => {
                console.log('enviado');
                resolve(result);                                              
            }, error => {
                console.log(error);
                console.log("Entrei Erro sendPostRequest");              
                reject(error); 
            });
    });
  }

  public submeteProfe(dados){
    console.log(dados);
    
    return new Promise((resolve, reject) =>{
        console.log("Entrei submeteProfe");                      
        let postData = new FormData();        

        postData.append('foto',  dados.foto);
        postData.append('nome',  dados.nome.value);
        postData.append('sobrenome',  dados.sobrenome.value);
        postData.append('cargo_funcao', dados.cargo_funcao.value);
        postData.append('email', dados.email.value);
        postData.append('senha', dados.senha.value);

        postData.append('ativo', dados.ativo);
        postData.append('data_cadastro', dados.data_cadastro);         
        
        console.log(postData);
        
          let url = this.url+"addprof/";
          console.log(url);
        //   const httpOptions = {
        //     headers: new HttpHeaders({
        //         'Content-Type': 'application/json; charset=UTF-8'
        //     })
        // };
                          
          this.http.post(url, postData)
            .subscribe(result => {
                console.log('enviado');
                resolve(result);                                              
            }, error => {
                console.log(error);
                console.log("Entrei Erro sendPostRequest");              
                reject(error); 
            });
    });
  }
  public submeteEditProfe(dados, id){
    console.log(dados);
    
    return new Promise((resolve, reject) =>{
        console.log("Entrei submeteEditProfe");                      
        let postData = new FormData();        

        postData.append('foto',  dados.foto);
        postData.append('nome',  dados.nome.value);
        postData.append('sobrenome',  dados.sobrenome.value);
        postData.append('cargo_funcao', dados.cargo_funcao.value);
        postData.append('email', dados.email.value);
        postData.append('senha', dados.senha.value);

        // postData.append('ativo', dados.ativo);
        // postData.append('data_cadastro', dados.data_cadastro);   
        postData.append('id', id);      
        
        console.log(postData);
        
          let url = this.url+"editprof/";
          console.log(url);  
        //   const httpOptions = {
        //     headers: new HttpHeaders({
        //         'Content-Type': 'application/json; charset=UTF-8'
        //     })
        // };
                          
          this.http.post(url, postData)
            .subscribe(result => {
                console.log('enviado');
                resolve(result);                                              
            }, error => {
                console.log(error);
                console.log("Entrei Erro sendPostRequest");              
                reject(error); 
            });
    });
  }
}