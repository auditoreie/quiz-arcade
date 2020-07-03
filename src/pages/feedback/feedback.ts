import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { GameViewPage } from '../game-view/game-view';
import { Storage } from '@ionic/storage';
import { ResultsPage } from '../results/results';
import { ExplicacaoPage } from '../explicacao/explicacao';

// @IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  
  answerIsCorrect: boolean;
  correctAnswer: string;
  currentIndex: number;
  totalQuizNum: number
  disciplina: any;
  currentQuiz: any;
  bgImageErrou: string;
  bgImageAcertou: string;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private storage: Storage
  ) {
    this.disciplina = navParams.get("disciplina");  
    this.currentQuiz = navParams.get("currentQuiz");

    console.log("Quiz atual: "+this.currentQuiz);
    console.log(this.currentQuiz);
    
    
    let result = navParams.get('checkAnswer'),
        correctAnswer = navParams.get('correctAnswer'),
        total = navParams.get('totalQuizNum')

    this.answerIsCorrect = result;
    this.correctAnswer = correctAnswer;
    this.totalQuizNum = total;
  
  }
  public ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
    this.bgImageAcertou = '../assets/imgs/acertou/0'+this.getNumberBg()+'.gif';
    this.bgImageErrou = '../assets/imgs/errou/0'+this.getNumberBg()+'.gif';
    
  }
  ionViewWillEnter(){
    this.storage.get('quizIndex').then((val) => {
      this.currentIndex = val;
    });
  }

  nextQuiz() {
    this.storage.get('quizIndex').then((val) => {
      let currentQuizIndex = val;
      this.storage.set('quizIndex', currentQuizIndex + 1);
    });
    this.navCtrl.setRoot(GameViewPage, {disciplina: this.disciplina});
  } 
  resultado(){
    this.navCtrl.setRoot(ResultsPage, {disciplina: this.disciplina});
  }
  verVideo(){
    let profileModal = this.modalCtrl.create(ExplicacaoPage, {
      tipo: "video",
      disciplina: this.disciplina,
      currentQuiz: this.currentQuiz       
    });
    profileModal.present();
    profileModal.onDidDismiss(data => {  
      // console.log(data);
      // console.log(this.currentQuiz);
    });
  }
  verExplica(){
    let profileModal = this.modalCtrl.create(ExplicacaoPage, {
      tipo: "texto",
      disciplina: this.disciplina, 
      currentQuiz: this.currentQuiz       
    });
    profileModal.present();
    profileModal.onDidDismiss(data => {  
      // console.log(data);
      // console.log(this.currentQuiz);
    });
  }
  public getNumberBg(){
    let min = Math.ceil(1);
    let max = Math.floor(10);
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
