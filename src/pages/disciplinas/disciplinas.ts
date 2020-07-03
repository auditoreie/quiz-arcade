import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DisciplinasProvider } from '../../providers/disciplinas/disciplinas';
import { GameViewPage } from '../game-view/game-view';
import { QuizzesProvider } from '../../providers/quizzes/quizzes';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';


// @IonicPage()
@Component({
  selector: 'page-disciplinas',
  templateUrl: 'disciplinas.html',
})
export class DisciplinasPage {
  idcurso: any;
  disciplinas: any;
  nomecurso: any;
  option: any;
  dificuldadeQuiz: any;
  quantidadeQuiz: any;
  periodo: any;
  aba: any;
  // toastCtrl: any;

  constructor(
    public toastCtrl: ToastController,
    // private toast: ToastController,
    private storage: Storage,
    public quizzesProvider: QuizzesProvider,
    public disciplinasProvider: DisciplinasProvider, 
    public navCtrl: NavController, 
    public navParams: NavParams) 
  {
    this.idcurso = this.navParams.get("idcurso");
    this.nomecurso = this.navParams.get("nomecurso"); 
    this.aba = this.navParams.get("aba"); 

    console.log(this.idcurso);    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisciplinasPage');
    this.disciplinasProvider.getDisciplinas(this.idcurso)
    .then((result) => {
      let resultado = result;
       this.disciplinas = resultado;
    })
    .catch((erro) => {
        console.log(erro);
        
    });    
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
      this.toastCtrl.create({message:"Escolha o Período Letivo das questões!"
        , position:"middle", duration:3000,cssClass: 'toast-vermelho'}).present();
    }
    else{
      this.option = {
        category: disciplina.id,
        difficulty: this.dificuldadeQuiz,
        quizNum: this.quantidadeQuiz,
        periodo: this.periodo
      };

      this.quizzesProvider.getQuiz2(this.option.quizNum, this.option.category, this.option.difficulty, this.option.periodo).
      then((quiz) => {
        this.storage.set('quizzes', JSON.stringify(quiz));
        this.navCtrl.setRoot(GameViewPage, {disciplina: disciplina});
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
  closeModal() {
    this.navCtrl.pop();
  }

}
