import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { QuizzesProvider } from '../../providers/quizzes/quizzes';
import { ListasRespostaAlunoPage } from '../listas-resposta-aluno/listas-resposta-aluno';

@Component({
  selector: 'page-respostas-sala',
  templateUrl: 'respostas-sala.html',
})
export class RespostasSalaPage {
  sala: any;
  loader: any;
  results: any;

  constructor(
    public quizzesProvider: QuizzesProvider,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public navParams: NavParams) 
  {
    this.sala = this.navParams.get("sala");
    console.log(this.sala);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RespostasSalaPage');
    this.buscarRespostasPorSala(this.sala.id_sala);
  }
  closeModal() {
    let data = { 'fechado': true};
    this.viewCtrl.dismiss(data);
    // this.navCtrl.pop();
  }
  buscarRespostasPorSala(idSala){
    this.openLoading("Buscando Respostas");   
      this.quizzesProvider.getRespostasSala(idSala)
        .then((result: any)=>{  
           this.results = result; 
           console.log(this.results);
           
           setTimeout(() => {
            // somecode
            this.closeLoading();            
          }, 2000); 
           
        })
        .catch((error: any)=>{
          console.log(error);                
          this.toast.create({message:"Sem conexão com nossos servidores", 
          position:"middle", duration:4000, cssClass: 'toast-vermelho'}).present();
            this.closeLoading();
        })    
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
  verRespostas(sala){
    // console.log(sala.respostas);
    let profileModal = this.modalCtrl.create(ListasRespostaAlunoPage, {sala: sala});
    
    profileModal.present();

    profileModal.onDidDismiss(data => {  
      console.log("Clicado fechar RespostasSalaPage");      
      console.log(data);      
    });   
  }
}
