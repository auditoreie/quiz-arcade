import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
// import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home';
import { DisciplinasPage } from '../disciplinas/disciplinas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ciencias: string = "sociais";
  isAndroid: boolean = false;
  cursos_sociais:any;
  cursos_humanas:any;
  cursos_exatas:any;
  cursos_biologicas:any;
  
  
  option: {
    category:number, 
    difficulty:number,    
    quizNum: number, 
  };
  spinnerON: boolean;
  // temDados: boolean;

  constructor(
    platform: Platform,
    public homeProvider: HomeProvider,
    public toast: ToastController,
    public navCtrl: NavController, 
    // private quizProvider: QuizzesProvider,    
    public modalCtrl: ModalController,
    // private storage: Storage
    )
    { 
      // this.temDados = false;
      this.isAndroid = platform.is('android');
      // console.log(this.storage.get('quizzes'));
    };

  ionViewWillEnter(){
    //this.buscaCursos();
    
  };
  ionViewDidLoad(){
    this.homeProvider.getCursos(1)
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
      this.toast.create({message:"Não foi possivel conectar em nossos servidores..."
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
      this.homeProvider.getCursos(1)
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
      this.homeProvider.getCursos(2)
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
      this.homeProvider.getCursos(3)
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
      this.homeProvider.getCursos(4)
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
  openDto(curso){        
    // console.log(idcurso);    
    let profileModal = this.modalCtrl.create(DisciplinasPage, {
      nomecurso: curso.nome, 
      idcurso: curso.id,
      aba: 1
    });
    profileModal.present();
    profileModal.onDidDismiss(data => {  
      //console.log(data);
    });
 
  }
  buscaCursos(){

  }
  openLoading2() {
    this.spinnerON = true;
  }
 
  closeLoading2() {
    this.spinnerON = false;
  }
  // start(){
  //   this.navCtrl.push(GameViewPage);
  //   this.storage.set('quizIndex', 0);
  //   this.storage.set('results', []);
  // };
};
