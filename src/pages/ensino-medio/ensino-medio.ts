import { Component } from '@angular/core';
import { NavController, Platform, ToastController, ModalController } from 'ionic-angular';
import { GameViewMedioPage } from '../game-view-medio/game-view-medio';

import { EnsinomedioProvider } from '../../providers/ensinomedio/ensinomedio';
import { QuizzesProvider } from '../../providers/quizzes/quizzes';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-ensino-medio',
  templateUrl: 'ensino-medio.html',
})
export class EnsinoMedioPage {
  ciencias: string = "sociais";
  isAndroid: boolean = false;
  cursos_sociais:any;
  cursos_humanas:any;
  cursos_exatas:any;
  cursos_biologicas:any;
  dificuldadeQuiz: any;
  quantidadeQuiz: any;
  periodo: any;
  
  option: any;

  spinnerON: boolean;

  constructor(
    platform: Platform,
    public ensinomedioProvider: EnsinomedioProvider,    
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private storage: Storage,
    public quizzesProvider: QuizzesProvider,
    ) 
    {
      this.isAndroid = platform.is('android');
    }

    ionViewDidLoad(){
      this.ensinomedioProvider.getDisciplinasMedio(1)
      .then((result)=>{                
          this.openLoading2();      
          setTimeout(() => {
            let cursos = result;
            this.cursos_sociais = cursos;          
            this.closeLoading2();
          }, 3000);
          
      })
      .catch((erro) =>{
        console.log(erro);
        this.closeLoading2();
        this.toastCtrl.create({message:"Não foi possivel conectar em nossos servidores..."
        , position:"middle", duration:1000, cssClass: 'toast-vermelho'}).present();
      });
  
    }
    onSegmentChanged(event){
      console.log(event);
      
      //888888888888888888888888 */
      // '1' => 'Sociais', 
      // '2' => 'Humanas',
      // '3' => 'Exatas',  
      // '4' => 'Biologicas',	
      //888888888888888888888888*/
      if(event._value == 'sociais'){
        console.log("Entrei sociais");
        this.ensinomedioProvider.getDisciplinasMedio(1)
        .then((result)=>{
            let cursos = result;
            this.cursos_sociais = cursos;
            console.log(this.cursos_sociais);          
        })
        .catch((erro) =>{
          console.log(erro);
          
        })
      }
      if(event._value == 'humanas'){
        console.log("Entrei humanas");
        this.openLoading2();
        this.ensinomedioProvider.getDisciplinasMedio(2)
        .then((result)=>{
            let cursos = result;
            this.cursos_humanas = cursos;
            this.closeLoading2();
        })
        .catch((erro) =>{
          console.log(erro);
          this.closeLoading2();
        })
      }   
      if(event._value == 'exatas'){
        console.log("Entrei exatas");
        this.openLoading2();
        this.ensinomedioProvider.getDisciplinasMedio(3)
        .then((result)=>{
            let cursos = result;
            this.cursos_exatas = cursos;
            this.closeLoading2();
        })
        .catch((erro) =>{
          console.log(erro);
          this.closeLoading2();
        })
      }
      if(event._value == 'biologicas'){
        console.log("Entrei Biolo");
        this.openLoading2();
        this.ensinomedioProvider.getDisciplinasMedio(4)
        .then((result)=>{
            let cursos = result;
            this.cursos_biologicas = cursos;
            this.closeLoading2();
        })
        .catch((erro) =>{
          console.log(erro);
          this.closeLoading2();
        })   
      }    
    }
    
    openQuizz(disciplina){
      console.log(disciplina);
    
     if(this.dificuldadeQuiz == undefined || this.quantidadeQuiz == undefined){
         console.log("entrei nos 0");
         console.log(this.dificuldadeQuiz);
         console.log(this.quantidadeQuiz);        
         this.toastCtrl.create({message:"Escolha a Dificuldade e a Quantidade de questões!"
           , position:"middle", duration:3000,cssClass: 'toast-vermelho'}).present();
     }
     if(this.periodo == undefined){      
       this.toastCtrl.create({message:"Escolha a serie das questões!"
         , position:"middle", duration:3000,cssClass: 'toast-vermelho'}).present();
     }
     else{
       this.option = {
         category: disciplina.id,
         difficulty: this.dificuldadeQuiz,
         quizNum: this.quantidadeQuiz,
         periodo: this.periodo
       };
 
       this.quizzesProvider.getQuizMedio(this.option.quizNum, this.option.category, this.option.difficulty, this.option.periodo).
       then((quiz) => {
         this.storage.set('quizzes', JSON.stringify(quiz));
         this.navCtrl.setRoot(GameViewMedioPage, {disciplina: disciplina});
         this.storage.set('quizIndex', 0);
         this.storage.set('results', []);
       }) 
 
       .catch((erro) => {
         console.log(erro);        
         this.toastCtrl.create({ message: "Esta disciplina não possui questões cadastradas! \nNos ajude, cadastre novas questões ;)", 
         duration: 3000, position: 'middle' }).present();
 
       });
     }    
     
   }
    openLoading2() {
      this.spinnerON = true;
    }
   
    closeLoading2() {
      this.spinnerON = false;
    }

}
