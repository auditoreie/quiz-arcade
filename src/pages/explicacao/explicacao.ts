import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';



// @IonicPage()
@Component({
  selector: 'page-explicacao',
  templateUrl: 'explicacao.html',
})
export class ExplicacaoPage {
  tipoParam: string;
  disciplina: any;
  currentQuiz: any;
  htmlExplica: any;

  constructor(
    private youtube: YoutubeVideoPlayer,
    public navCtrl: NavController, 
    public navParams: NavParams) 
  {
    this.tipoParam = navParams.get("tipo");
    this.currentQuiz = navParams.get("currentQuiz");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExplicacaoPage');
    
    if(this.tipoParam == 'video') {
      // console.log(this.currentQuiz.video_explicativo);
      this.youtube.openVideo(this.currentQuiz.video_explicativo);
    }
    if(this.tipoParam == 'texto'){
      //console.log(this.currentQuiz.texto_explicativo);
      this.htmlExplica = this.currentQuiz.texto_explicativo;
    }
  }
  closeModal() {
    this.navCtrl.pop();
  }

}
