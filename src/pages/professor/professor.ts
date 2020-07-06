import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { DomSanitizer } from '@angular/platform-browser';
// import { CadSalaPage } from '../cad-sala/cad-sala';
import { CadastreProvider } from '../../providers/cadastre/cadastre';
import { LoginPage } from '../login/login';
// import { AddQuestoesPage } from '../add-questoes/add-questoes';
import { QuestoesPage } from '../questoes/questoes';

import { SocialSharing } from '@ionic-native/social-sharing';
import { RespostasSalaPage } from '../respostas-sala/respostas-sala';
import { CadSalaPage } from '../cad-sala/cad-sala';
import { EditProfessorPage } from '../edit-professor/edit-professor';

import { HttpClient } from '@angular/common/http';
import { AppModule } from '../../app/app.module';

// @IonicPage()
@Component({
  selector: 'page-professor',
  templateUrl: 'professor.html',
})
export class ProfessorPage {
  objPerfil: any;
  fotoUser: string;
  displayImage: any;
  spinnerON: boolean;
  salas: any;
  tamSala: any;
  url: string;
  
  classroms: any;


  constructor(
    private socialSharing: SocialSharing,
    public modalCtrl: ModalController,
    private sanitizer: DomSanitizer,
    public navCtrl: NavController,
    public navParams: NavParams,
    public cadastreProvider: CadastreProvider,
    public toast: ToastController,
    private alertCtrl: AlertController,
    public http: HttpClient
    ) 
    {
      this.url = AppModule.api.url_api;
      // this.salas = [];
      
    }
  ionViewWillEnter(){    
      console.log("ionViewWillEnter"); 
      // this.salas = [];            
      try {
        var objAux = JSON.parse(localStorage.getItem("quiz-perfil"));
        this.objPerfil = objAux[0]; 
        console.log(this.objPerfil);        
        this.displayImage = this.sanitizer.bypassSecurityTrustUrl(this.objPerfil.foto);                
  
      } catch (error) {
        console.log("Não consegui buscar foto");        
      }     
      // this.buscaSalasProfessor();
      this.getCurrentClassroms();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfessorPage');   
  } 
  addSalas(){
    console.log("Fui clicado AddSalas");
    let profileModal = this.modalCtrl.create(CadSalaPage);
    
    profileModal.present();

    profileModal.onDidDismiss(data => {  
      // console.log(data);
      this.buscaSalasProfessor();
      
    });
  }
  
  buscaProf(){       
    this.openLoading2();   
    this.cadastreProvider.getSalasProf(this.objPerfil.id)
      .then((result: any)=>{            
          this.salas = result;
          this.tamSala = this.salas.length; 
          this.closeLoading2();                                
      })
      .catch((error: any)=>{
        this.toast.create({message:"Sem conexão com nossos servidores",
         position:"middle", duration:3000, cssClass: 'toast-vermelho'}).present();
         this.closeLoading2();
      })      
  }
  buscaSalasProfessor(){    
    console.log("buscaSalasProfessor2");       
    this.openLoading2();   
    this.cadastreProvider.getSalasProfWillEnter(this.objPerfil.id)
      .then((result: any)=>{            
          this.salas = result;
          this.tamSala = this.salas.length; 
          this.closeLoading2();                                
      })
      .catch((error: any)=>{
        this.toast.create({message:"Sem conexão com nossos servidores",
         position:"middle", duration:3000, cssClass: 'toast-vermelho'}).present();
         this.closeLoading2();
      })      
  }

  getCurrentClassroms() {
    this.openLoading2();
    console.log('Entering getClassrom')
    this.cadastreProvider.getClassromsByProfId(this.objPerfil.id)
      .subscribe(
        (res: Array<any>) => { 
          this.salas = res;
          this.tamSala = res.length;
          this.closeLoading2();
        },
        err => { console.trace(err) }
        )
    
  }


  buscaSalasProfessorOld(){
    // this.getSalasProfWillEnterNovo(this.objPerfil.id); 
  }
  buscaSalasProfessorNot(idProf){
    this.openLoading2(); 
    this.http.get(`${this.url}getsalasprof/${idProf}`)       
     .subscribe(
      (result: any) => {    
        this.salas = result;   
        this.tamSala = this.salas.length;       
        console.log(this.salas);        
        this.closeLoading2();                                
      },
      (error) => {
        console.log(error); // aqui se tivesse um loading tu ia matar ele
        this.closeLoading2();                                
      });  
  }
  openLoading2() {
    this.spinnerON = true;
  }
 
  closeLoading2() {
    this.spinnerON = false;
  }
  // ionViewWillLeave(){
  //   console.log("ionViewWillLeave");    
  // }
  // ionViewDidLeave(){
  //   console.log("ionViewDidLeave");    
  // }
  // ionViewDidEnter(){
  //   console.log("ionViewDidEnter");    
  // }
   
  logout(){    
    try {
      localStorage.setItem("quiz-logado", "false");
      // this.navCtrl.setRoot("LoginPage");
      this.navCtrl.setRoot(LoginPage);      
    } catch (error) {
      console.log("Não consegui buscar foto");
      this.toast.create({message:"Não consegui fazer LogOut", 
      position:"bottom", duration:3000, cssClass: 'toast-vermelho'}).present();        
    }   
  }
  delSala(id){
    console.log(id);
    let alert = this.alertCtrl.create({
      title: 'Deletar Sala',
      message: 'Você tem certeza que deseja apagar esta Sala?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Apagar',
          handler: () => {
            this.openLoading2();   
            this.cadastreProvider.delSala(id)
              .then((result: any)=>{  
                  // this.openLoading2();                    
                  console.log({'delSala': result});
                  this.toast.create({
                    message: "Sala deletada! Uhul",
                    position: "middle",
                    duration: 4000,
                    cssClass:"toast-vermelho"})
                    .present();
                  this.getCurrentClassroms();
                  // setTimeout(() => {
                  //   // somecode  
                  //   this.toast.create({message:"Sala deletada com sucesso!", 
                  //   position:"middle", duration:4000, cssClass: 'toast-vermelho'}).present();                
                  //   // this.closeLoading2();
                    
                  // }, 1000);   
                  
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
  questoes(sala){
    console.log(sala);
    let profileModal = this.modalCtrl.create(QuestoesPage, {
      sala: sala,     
    });    
    profileModal.present();

    profileModal.onDidDismiss(data => {  
      console.log("Clicado fechar addQuestoes");      
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
  editUser(objPerfil){
    console.log(objPerfil);
    let profileModal = this.modalCtrl.create(EditProfessorPage, {perfil: objPerfil});
    
    profileModal.present();

    profileModal.onDidDismiss(data => {  
      console.log("Clicado fechar editUser");      
      console.log(data.foto);
      // this.buscaSalasProfessor();
      if(data.foto == undefined || data.foto == null){
        console.log("Foto undefined ou null");
        
      }
      else{
        this.displayImage = data.foto;
      }
      
      
      // this.buscaSalasProfessor();
    });
  }
  
  compartilhar(sala, objPerfil){
    console.log("Compartilhar clicado!");
    console.log(sala);
    let stringGona = `
        Olá, 
        Entre em minha sala: `+sala.id_sala+` 
        `+sala.nome+`
        turma: `+sala.turma+`
        disciplina: `+sala.disciplina+`
        Professor: `+objPerfil.nome+` `+objPerfil.sobrenome+`
        `;
    let strinGonaPerfil = `
        Sala: `+sala.id_sala+` - Professor: `+objPerfil.nome+` `+objPerfil.sobrenome+`
    `;

    this.socialSharing.share(stringGona, strinGonaPerfil, null, "www.quizacademico.com"+`
    
    Enviado do App Quiz Acadêmico.
    `)
    .then(()=>{
      console.log("shareViaWhatsApp: Success");
    })
    .catch(()=>{
      this.toast.create({message:"Não foi possivel compartilhar!!!"
      , position:"middle", duration:4000, cssClass: 'toast-vermelho'}).present();
    })
    
  }
  respostasSala(sala){
    console.log(sala);
    let profileModal = this.modalCtrl.create(RespostasSalaPage, {sala: sala});
    
    profileModal.present();

    profileModal.onDidDismiss(data => {  
      console.log("Clicado fechar RespostasSalaPage");      
      console.log(data);      
    });        
  }
}
