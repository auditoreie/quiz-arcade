import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-listas-resposta-aluno',
  templateUrl: 'listas-resposta-aluno.html',
})
export class ListasRespostaAlunoPage {
  respostas: any;
  respostasAluno: any;

  constructor(
    public viewCtrl: ViewController, 
    public navCtrl: NavController,
    public navParams: NavParams) 
  {
    this.respostas = navParams.get("sala");
    console.log(this.respostas);
    this.respostasAluno = JSON.parse(this.respostas.questoes);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListasRespostaAlunoPage');
  }
  closeModal(){   
      let data = { 'fechado': true};
      this.viewCtrl.dismiss(data);
      // this.navCtrl.pop();    
  }

}
