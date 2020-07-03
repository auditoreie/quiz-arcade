import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


// @IonicPage()
@Component({
  selector: 'page-ver-questao',
  templateUrl: 'ver-questao.html',
})
export class VerQuestaoPage {
  quizz: any;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController, 
    public navParams: NavParams) 
  {
    this.quizz = this.navParams.get("quizz");
    console.log(this.quizz);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerQuestaoPage');
  }
  closeModal(){
    let dado = { 'foo': "bar"};
    this.viewCtrl.dismiss(dado);
  }

}
