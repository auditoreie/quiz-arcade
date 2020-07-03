import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, AlertController, ModalController } from 'ionic-angular';

import { QuizzesProvider } from '../../providers/quizzes/quizzes';
import { VerQuestaoPage } from '../ver-questao/ver-questao';

import { SocialSharing } from '@ionic-native/social-sharing';
import { CadastrePage } from '../cadastre/cadastre';

// @IonicPage()
@Component({
  selector: 'page-questoes',
  templateUrl: 'questoes.html',
})
export class QuestoesPage {
  sala: any;
  spinnerON: boolean;
  quizzes: any;
  qntQuizz: number;
  arrayQuestoes: any;
  respostas = [];

  constructor(
    private socialSharing: SocialSharing,
    public modalCtrl: ModalController,
    public quizzesProvider: QuizzesProvider,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public toast: ToastController, 
    public navParams: NavParams,
    private alertCtrl: AlertController
    ) 
    {
      this.sala = this.navParams.get("sala");
      console.log(this.sala); 
      this.qntQuizz = 0;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestoesPage');

    this.buscaQuizPorSala(this.sala.id_sala);
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
            this.qntQuizz = this.quizzes.length;            
            this.closeLoading2();
          }, 1000);   
              
      })
      .catch((error: any)=>{
        this.toast.create({message:"Não localizamos questões", 
        position:"middle", duration:3000, cssClass: 'toast-vermelho'}).present();
         this.closeLoading2();
      })
  }
  delQuizz(id){
    console.log(id);
    let alert = this.alertCtrl.create({
      title: 'Deletar Questão',
      message: 'Você tem certeza que deseja apagar esta Questão?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Deletar',
          handler: () => {
            this.openLoading2();   
            this.quizzesProvider.delQuizz(id)
              .then((result: any)=>{  
                  // this.openLoading2();                    
                  setTimeout(() => {
                    // somecode  
                    this.toast.create({message:"Questão deletada com sucesso!", 
                    position:"middle", duration:4000, cssClass: 'toast-vermelho'}).present();                
                    
                    // this.buscaQuizPorSala(this.sala.id_sala);
                    this.quizzes.forEach(logArrayElements);
                    // }
                    function logArrayElements(element, index, array) {
                      // console.log("a[" + index + "] = " + element);
                      if(element.id == id){
                        console.log("Localizado em indice: "+index);
                        array.splice(index, 1);        
                      }
                    }
                    this.buscaQuizPorSala(this.sala.id_sala);

                    this.closeLoading2();
                  }, 1000);   
                  
              })
              .catch((error: any)=>{
                console.log(error);                
                this.toast.create({message:"Sem conexão com nossos servidores", 
                position:"middle", duration:4000, cssClass: 'toast-vermelho'}).present();
                 this.closeLoading2();
              })
          }
        }
      ]
    });
    alert.present();
  }
  verQuizz(quizz){
    console.log(quizz);
    let profileModal = this.modalCtrl.create(VerQuestaoPage, {quizz: quizz});    
    profileModal.present();

    profileModal.onDidDismiss(data => {  
      console.log("Clicado fechar VerQuestaoPage");      
      console.log(data);
      // this.buscaSalasProfessor();
      // if(data.foto == undefined || data.foto == null){
      //   console.log("Foto undefined ou null");
         
      // }
      // else{
      //   this.displayImage = data.foto;
      // }
      
      
      // this.buscaSalasProfessor();
    });    
  }  
  addQuestoes(){
    // console.log(quizz);
    // let logado = "logado";
    let profileModal = this.modalCtrl.create(CadastrePage, {
      origem: "questoes",
      id_sala: this.sala.id_sala,
    });    
    profileModal.present();

    profileModal.onDidDismiss(data => {  
      console.log("Clicado fechar addQuestoes");      
      console.log(data); 
      this.buscaQuizPorSala(this.sala.id_sala);    
    });   
  }

  public limpaHTML2(source: string) {
    return source.replace(/<p[^>]*>/g,'').replace(/<\/p[^>]*>/g, '');
    //console.log(s); (\[gallery[^]*])    
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
  compartilhar(quizze){
    console.log("Compartilhar clicado!");
    // console.log(quizze);
    let pergunta = this.limpaHTML2(quizze.question);
    let arrayAux;

    if(quizze.type == 1){
      arrayAux = [
        quizze.correct_answer,
        quizze.incorrect_answers1,
        quizze.incorrect_answers2,
        quizze.incorrect_answers3,
        quizze.incorrect_answers4,
      ]
    }
    if(quizze.type == 2){
      arrayAux = [
        quizze.correct_answer,
        quizze.incorrect_answers1,
        // quizze.incorrect_answers2,
        // quizze.incorrect_answers3,
        // quizze.incorrect_answers4,
      ]
    }
    


    let strinGona = `ID: `
    +quizze.id+` \n`+pergunta+` \n`;

    this.arrayQuestoes = arrayAux;    
    
    this.respostas = this.shuffle(this.arrayQuestoes);
 
    //let string2 = "";
    let alternativa: string;
    
    if(quizze.type == 1){
      this.respostas.forEach((item, index) => {
        if(index == 0){
          alternativa = "(A)"; 
        }
        if(index == 1){
          alternativa = "(B)"; 
        }
        if(index == 2){
          alternativa = "(C)"; 
        }
        if(index == 3){
          alternativa = "(D)"; 
        }
        if(index == 4){
          alternativa = "(E)"; 
        }     
        strinGona += `${alternativa} ${this.respostas[index]} \n`;
      });
    }
    if(quizze.type == 2){
      this.respostas.forEach((item, index) => {
        if(index == 0){
          alternativa = "(A)"; 
        }
        if(index == 1){
          alternativa = "(B)"; 
        }             
        strinGona += `${alternativa} ${this.respostas[index]} \n`;
      });
    }

    console.log(strinGona);

    let strinGonaPerfil = `
        Questão : `+quizze.id+` - Quiz Acadêmico
    `;

    this.socialSharing.share(strinGona, strinGonaPerfil, null, "www.quizacademico.com"+`
    
    Enviado do App Quiz Acadêmico.
    `)
    .then(()=>{
      console.log("shareViaWhatsApp: Success");
    })
    .catch(()=>{
      this.toast.create({message:"Não foi possivel compartilhar!!!"
      , position:"middle", duration:4000, cssClass: 'toast-vermelho'}).present();
    })
    
    this.respostas = [];
  }
}

