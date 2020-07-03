import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { GameViewPage } from '../game-view/game-view';
import { Storage } from '@ionic/storage';
// import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { QuizzesProvider } from '../../providers/quizzes/quizzes';
import { LoginPage } from '../login/login';

// @IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  results: any;
  quizTotal: number;
  correctTotal: number;
  nomeAlunoST: any;
  notadoAlunoST: any;
  notaFinalAluno: number;
  notalFinalAluno: number;
  // nomeAluno: any;
  loader: any;
  eUmaSalaAval: boolean;
  idSalaST: any;

  constructor(
    public quizzesProvider: QuizzesProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private storage: Storage) {
      console.log("Entrei na Pagina Results");
      
  }

  ionViewWillEnter(){
    // let ObjDadosSalaST = JSON.parse(localStorage.getItem("dados-sala-aval"));
    // this.nomeAlunoST = ObjDadosSalaST.nomeAluno;    
    // this.notadoAlunoST = ObjDadosSalaST.notaSala;
    try{
      if(localStorage.getItem("dados-sala-aval")){
        let ObjDadosSalaST = JSON.parse(localStorage.getItem("dados-sala-aval"));
        this.nomeAlunoST = ObjDadosSalaST.nomeAluno;    
        this.notadoAlunoST = ObjDadosSalaST.notaSala;
        this.idSalaST = ObjDadosSalaST.idSala;
        this.eUmaSalaAval = true;  
      }
      else{
        this.nomeAlunoST = null;    
        this.notadoAlunoST = null;  
      }
      
    } catch (error) {
      // this.nomeAlunoST = null;    
      // this.notadoAlunoST = null;  
      console.log(error);      
    }
    
    this.storage.get('results').then((val) => {
      this.results = val;
      console.log(this.results);
      
      this.quizTotal = this.results.length;
      
      let filterAnswers = this.results.filter(
        answer => answer.yourAnswer === answer.correctAnswer
      );

      this.correctTotal = filterAnswers.length;
    
      let notadoAlunoST: number = Number(this.notadoAlunoST);
      let notaCadaItemExerc;
      
      notaCadaItemExerc = notadoAlunoST/this.quizTotal;
      this.notalFinalAluno = notaCadaItemExerc*this.correctTotal;

      console.log(this.correctTotal);
      console.log(this.quizTotal);    
      console.log(notaCadaItemExerc);    
      console.log(this.notalFinalAluno);
      console.log(notadoAlunoST);
      
      if(this.eUmaSalaAval){
        this.saveQuestosdoAluno(this.nomeAlunoST, this.idSalaST, JSON.stringify(this.results), this.notalFinalAluno);
      }
      
    });
    
    // this.notaFinalAluno = this.notadoAlunoST/this.quizTotal;
  }

  backHome() {
    this.navCtrl.setRoot(TabsPage);
  }

  restart() {
    this.navCtrl.setRoot(GameViewPage);
    this.storage.set('quizIndex', 0);
    this.storage.set('results', []);
  }
  openLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg,
    });
    this.loader.present();
  }
  closeLoading() {    
    this.loader.dismiss();
    //this.isRefreshing = true;
  }
  saveQuestosdoAluno(nomeAlunoST, idSala, results, notalFinalAluno){
    this.openLoading("Guardando sua nota, aguarde!...");
    this.quizzesProvider.saveQuestoesAval(nomeAlunoST, idSala, results, notalFinalAluno)
    .then((result: any)=>{      
        let inserido = result;         

        if(inserido){
          this.toastCtrl.create({message:"Sua avaliação foi salva!"
        ,position:"middle", duration:4000, cssClass: 'toast-vermelho'}).present();
        }
        localStorage.removeItem("dados-sala-aval");
          // this.formCad.reset();                
        this.closeLoading();
    })                  
    .catch((error: any)=>{
        console.log(error);
        
        this.toastCtrl.create({message:"Não conseguimos salvar sua avaliação!"
        , position:"bottom", duration:3000,cssClass: 'toast-vermelho'}).present();
        this.closeLoading();
        localStorage.removeItem("dados-sala-aval");
    }) 
  }
  finalizar(){
    this.navCtrl.setRoot(LoginPage);    
  }


}
