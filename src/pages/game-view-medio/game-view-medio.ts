import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams} from 'ionic-angular';

import { ResultsMedioPage } from '../results-medio/results-medio';
import { FeedbackMedioPage } from '../feedback-medio/feedback-medio';

// @IonicPage()
@Component({
  selector: 'page-game-view-medio',
  templateUrl: 'game-view-medio.html',
})
export class GameViewMedioPage {
  quizzes:any;
  currentQuiz:any;
  answers:any;
  correct:any;
  quizIndex:number;
  totalQuizNum: number;
  answers_aux = [];
  categoria: any;
  dificuldade: string;
  nomePagina: any;
  disciplina: any;
  salaProf: any;
  questionCE: boolean;
  nomeAluno: string;
  notaSala: any;
  nomeAlunoST: string;
  periodoAlunoST: string;
  notadoAlunoST: string;
  periodoAluno: any;
  // temDados: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // private alertCtrl: AlertController,
    private storage: Storage) 
    {
      this.nomePagina = navParams.get("pagina");   
      this.disciplina = navParams.get("disciplina");            
    
    }

  shuffle(arr){
    let currentIndex = arr.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr;
  }
  ionViewWillEnter(){
    // this.salaProf = this.navParams.get("sala_e_Prof");

    this.storage.get('quizIndex').then((val) => {
      this.quizIndex = val;
    });
    // console.log(this.quizIndex);

    this.storage.get('quizzes').then((val) => {
      this.quizzes = JSON.parse(val);
      // console.log(this.quizzes);
      
      if(this.quizzes !== null){
        if(this.quizzes.result){
          this.totalQuizNum = this.quizzes.result.length;          
        }
        else{
          this.totalQuizNum = this.quizzes.length;
        }
      }
      
      if(this.quizzes !== null && this.totalQuizNum >= this.quizIndex +1) {
        console.log(this.quizIndex);

        if(this.quizzes.result){
          this.currentQuiz = this.quizzes.result[this.quizIndex];          
        }
        else{
          this.currentQuiz = this.quizzes[this.quizIndex];
        }
        
        // console.log(this.quizzes.result[0]);
        console.log(this.currentQuiz);

        //this.categoria = this.verificaCategoria(this.currentQuiz.category);
        this.dificuldade = this.verificaDificuldade(this.currentQuiz.difficulty);

        if(this.currentQuiz.type == 2){
          this.answers_aux.push(this.currentQuiz.incorrect_answers1);
          this.questionCE = true;
        }
        else{
          this.answers_aux.push(this.currentQuiz.incorrect_answers1);
          this.answers_aux.push(this.currentQuiz.incorrect_answers2);
          this.answers_aux.push(this.currentQuiz.incorrect_answers3);
          this.answers_aux.push(this.currentQuiz.incorrect_answers4);  
        }
        
        this.answers = this.answers_aux;
        this.answers_aux = []; 

        console.log(this.answers);


        this.correct = this.currentQuiz.correct_answer;
        this.answers.push(this.correct);
        this.shuffle(this.answers);
      }
      else if(this.totalQuizNum < this.quizIndex +1) {
        this.navCtrl.setRoot(ResultsMedioPage);
      };
    });
  }

  trackAnswers(answer){
    this.storage.get('results').then((val) => {
      let results = val,
          quizResults = {
            question: this.currentQuiz.question,
            yourAnswer: answer,
            correctAnswer: this.correct
          }
      results.push(quizResults);
      this.storage.set('results', results)
    });
  }

  handleAnswer(answer, disciplina){
    if (answer === this.correct) {
      this.trackAnswers(answer);
      this.navCtrl.setRoot(
        FeedbackMedioPage,
        {
        checkAnswer:true,
        totalQuizNum: this.totalQuizNum,
        disciplina: disciplina,
        currentQuiz: this.currentQuiz
      });
    } else {
      this.trackAnswers(answer);
      this.navCtrl.setRoot(
        FeedbackMedioPage,
        {
          checkAnswer:false,
          correctAnswer: this.correct,
          totalQuizNum: this.totalQuizNum,
          disciplina: disciplina,
          currentQuiz: this.currentQuiz
        });
    }
  }
  verificaDificuldade(idDificuldade){
    let retorno;
    switch (idDificuldade) {
      case "1":
        retorno = "Fácil";
        break;
      case "2":
        retorno = "Intermediária";
        break;
      case "3":
        retorno = "Difícil";
        break;
      default:
        retorno = "Não Definido";
        break;
    }
    return retorno;
  }
  ionViewDidLoad(){
    console.log("ionViewDidLoad GameView");
    
    // this.storage.remove('quizzes');   
    // console.log("Removido quizzes");  
    // nomeAluno: this.nomeAluno,
    // notaSala: this.notaSala,
    // periodoAluno: this.periodoAluno
    try{
      if(localStorage.getItem("dados-sala-aval")){
        let ObjDadosSalaST = JSON.parse(localStorage.getItem("dados-sala-aval"));
        this.nomeAlunoST = ObjDadosSalaST.nomeAluno;    
        this.notadoAlunoST = ObjDadosSalaST.notaSala;  
      }
      else{
        this.nomeAlunoST = null;    
        this.notadoAlunoST = null;  
      }
      
    } catch (error) {
      this.nomeAlunoST = null;    
      this.notadoAlunoST = null;  
    }
    
    
    // console.log(this.nomeAlunoST, this.notadoAlunoST);
    
  }
}
