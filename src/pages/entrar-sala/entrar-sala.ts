import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { AutenticationApiProvider } from '../../providers/autentication-api/autentication-api';
import { DomSanitizer } from '@angular/platform-browser';
import { GameViewPage } from '../game-view/game-view';
import { QuizzesProvider } from '../../providers/quizzes/quizzes';
import { Storage } from '@ionic/storage';


// @IonicPage()
@Component({
  selector: 'page-entrar-sala',
  templateUrl: 'entrar-sala.html',
})
export class EntrarSalaPage {
  salaAval: boolean;
  nomeSala: any;
  // temErroNomeSala: boolean;
  // erroNomeSala: string;
  spinnerON: boolean;
  // erroNSala: boolean;
  // msgErroNSala: string;
  sala: any;
  econtreiSala: boolean;
  // nomeAluno: any;
  erroEntrarSala: boolean;
  msgErroSala: string;
  // erroSalaNaoEncontrada: boolean;
  // msgSalaNaoEncontrada: string;
  displayImage: any;
  spinnerBuscandoQuizz: boolean;

  constructor(
    public toastCtrl: ToastController,
    public quizzesProvider: QuizzesProvider,
    private storage: Storage,
    private sanitizer: DomSanitizer,
    public autenticationApiProvider: AutenticationApiProvider,
    public viewCtrl: ViewController,
    public navCtrl: NavController, 
    private alertCtrl: AlertController,
    public navParams: NavParams) 
    {
      // this.msgErroNSala = "";
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntrarSalaPage');
  }
  closeModal(){
    let fotoPerfil = { 'foto': "this.base64Image"};
    this.viewCtrl.dismiss(fotoPerfil);
  }

  buscarSala(){
    console.log(this.nomeSala);
    // this.nomeSala = this.nomeSala.trim();
    
    if(this.nomeSala === undefined || this.nomeSala === ''){
      this.erroEntrarSala = true;
      this.msgErroSala = 'Preencha alguma Sala';
      console.log("Entrei temErroNomeSala");       
    }
    else{ 
      this.erroEntrarSala = false;
      // this.erroNSala = false;
      // console.log("entrei else");
      this.openLoading2();
      this.autenticationApiProvider.buscarSala(this.nomeSala)      
      .then((result: any)=>{
          console.log("autenticationApiProvider buscarSala");            
          let resultDados = result;
          this.sala = resultDados[0];                    
          this.econtreiSala = true;
          if(this.sala.avaliativa == 1){
            this.salaAval = this.sala.avaliativa;
          }
          console.log(this.sala);   
          this.displayImage = this.sanitizer.bypassSecurityTrustUrl(this.sala.foto);
          // if(this.sala.avaliativa == 1){
          //   this.salaAval = true;
          //   this.erroEntrarSala = false;           
          // } 
          // else{
          //   this.salaAval = false;
          // }                  
          this.closeLoading2();         
      })
      .catch((error: any)=>{
          console.log(error);      
         this.erroEntrarSala = true;
         this.msgErroSala = "Sala não encontrada";
          this.closeLoading2();
      })
    }
  }
  openLoading2() {
    this.spinnerON = true;
  } 
  closeLoading2() {
    this.spinnerON = false;
  }
  openLoadingBuscaQuizz() {
    this.spinnerBuscandoQuizz = true;
  } 
  closeLoadingBuscaQuizz() {
    this.spinnerBuscandoQuizz = false;
  }
  entrarSala(){
    console.log(this.nomeSala); 

    if(this.nomeSala === undefined || this.nomeSala === ''){
      this.erroEntrarSala = true;
      this.msgErroSala = "Digite uma Sala";
    }
    else{
      // let alert = this.alertCtrl.create({
      //   title: 'Entrar na Sala?',
      //   message: 'Deseja realmente entrar na sala: '+this.nomeSala+'?',
      //   buttons: [
      //     {
      //       text: 'Cancelar',
      //       role: 'cancel',
      //       handler: () => {
      //         console.log('Cancel clicked');
      //       }
      //     },
      //     {
      //       text: 'Sim',
      //       handler: () => {                                                           
      //           // setTimeout(() => {                                                        
      //             // A Magica
      //             this.openLoadingBuscaQuizz();
      //             this.quizzesProvider.getQuizPorSala(this.sala.id_sala).
      //             then((quiz) => {
      //                 this.storage.set('quizzes', JSON.stringify(quiz));                      
      //                 this.storage.set('quizIndex', 0);
      //                 this.storage.set('results', []);
      //                 this.closeLoadingBuscaQuizz();

      //                 this.navCtrl.push(GameViewPage, { 
      //                   sala_e_Prof: this.sala
      //                 });
      //             }) 

      //             .catch((erro) => {
      //               console.log(erro);        
      //               // this.toastCtrl.create({ message: "Esta disciplina não possui questões cadastradas! \nNos ajude, cadastre novas questões ;)", 
      //               // duration: 3000, position: 'middle' }).present();
      //               this.erroEntrarSala = true;
      //               this.msgErroSala = "Esta sala não possui questões cadastradas!";
      //               this.closeLoadingBuscaQuizz();

      //             });

      //             // Fim da Magica
      //           // }, 1000);                                                   
      //       }
      //     }
      //   ]
      // });
      // alert.present();
      if(!this.salaAval){
        let alert = this.alertCtrl.create({
        title: 'Entrar na Sala?',
        message: 'Deseja realmente entrar na sala: '+this.nomeSala+'?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Sim',
            handler: () => {                                                           
                // setTimeout(() => {                                                        
                  // A Magica
                  this.openLoadingBuscaQuizz();
                  this.quizzesProvider.getQuizPorSala(this.sala.id_sala).
                  then((quiz) => {
                      this.storage.set('quizzes', JSON.stringify(quiz));                      
                      this.storage.set('quizIndex', 0);
                      this.storage.set('results', []);
                      this.closeLoadingBuscaQuizz();

                      this.navCtrl.push(GameViewPage, { 
                        sala_e_Prof: this.sala                                                
                      });
                  }) 

                  .catch((erro) => {
                    console.log(erro);        
                    // this.toastCtrl.create({ message: "Esta disciplina não possui questões cadastradas! \nNos ajude, cadastre novas questões ;)", 
                    // duration: 3000, position: 'middle' }).present();
                    this.erroEntrarSala = true;
                    this.msgErroSala = "Esta sala não possui questões cadastradas!";
                    this.closeLoadingBuscaQuizz();

                  });

                  // Fim da Magica
                // }, 1000);                                                   
            }
          }
        ]
      });
      alert.present();
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Sala Avaliativa',
          inputs: [
            {
              name: 'nome',
              placeholder: 'Qual Nome?'
            },        
          ],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Entrar',
              handler: data => {
                console.log(data.nome);
                if(data.nome == ''){
                  this.toastCtrl.create({message: "Por favor digite seu nome!"
                  ,position:"middle", duration:4000, cssClass: 'toast-vermelho'}).present();
                  return false;
                }                
                if(data.nome != "" || data.nome != undefined) {
                    this.openLoadingBuscaQuizz();
                    this.quizzesProvider.getQuizPorSala(this.sala.id_sala).
                    then((quiz) => {
                        this.storage.set('quizzes', JSON.stringify(quiz));                      
                        this.storage.set('quizIndex', 0);
                        this.storage.set('results', []);
                        this.closeLoadingBuscaQuizz();

                        this.navCtrl.push(GameViewPage, { 
                          sala_e_Prof: this.sala,
                          nome_aluno: data.nome,
                          nota: this.sala.nota,
                          // periodo: this.sala.periodo,
                          destino: 'entrar-sala',                                                                       
                        });
                        let objDadosSalaAval = {
                          nomeAluno: data.nome,
                          notaSala: this.sala.nota,
                          idSala: this.sala.id_sala,
                          // periodoAluno: this.periodoAluno
                        };
                        localStorage.setItem('dados-sala-aval', JSON.stringify(objDadosSalaAval));
                    }) 

                    .catch((erro) => {
                      console.log(erro);        
                      // this.toastCtrl.create({ message: "Esta disciplina não possui questões cadastradas! \nNos ajude, cadastre novas questões ;)", 
                      // duration: 3000, position: 'middle' }).present();
                      this.erroEntrarSala = true;
                      this.msgErroSala = "Esta sala não possui questões cadastradas!";
                      this.closeLoadingBuscaQuizz();

                    });
                } else {
                  this.toastCtrl.create({message: "Por favor digite seu nome!"
                    ,position:"middle", duration:4000, cssClass: 'toast-vermelho'}).present();
                  return false;
                }
              }
            }
          ]
        });
        alert.present();
      }
    }           
  }

}
