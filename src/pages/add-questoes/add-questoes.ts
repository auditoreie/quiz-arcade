import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { QuizzesProvider } from '../../providers/quizzes/quizzes';


// @IonicPage()
@Component({
  selector: 'page-add-questoes',
  templateUrl: 'add-questoes.html',
})
export class AddQuestoesPage {
  sala: any;
  spinnerON: boolean;
  quizzes: any;

  constructor(
    public quizzesProvider: QuizzesProvider,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public toast: ToastController, 
    public navParams: NavParams) 
    {
      this.sala = this.navParams.get("sala");

      console.log(this.sala);      
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddQuestoesPage');
  }
  closeModal(){
    let fotoPerfil = { 'foto': "this.base64Image"};
    this.viewCtrl.dismiss(fotoPerfil);
  }
  openLoading2() {
    this.spinnerON = true;
  }
 
  closeLoading2() {
    this.spinnerON = false;
  }
  buscaQuizPorSala(IdSala){  
    this.openLoading2();   
    this.quizzesProvider.getQuizPorSala(IdSala)
      .then((result: any)=>{  
          // this.openLoading2();                    
          setTimeout(() => {
            // somecode
            this.quizzes = result;             
            this.closeLoading2();
          }, 1000);   
              
      })
      .catch((error: any)=>{
        this.toast.create({message:"Não conseguimos buscar questões", 
        position:"middle", duration:3000, cssClass: 'error-loader'}).present();
         this.closeLoading2();
      })
  }
}
