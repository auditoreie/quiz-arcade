import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ModalController} from 'ionic-angular';

import { AutenticationApiProvider } from '../../providers/autentication-api/autentication-api';

import { Events } from 'ionic-angular';
// import { AppModule } from '../../app/app.module';
// import { TabsLogadoPage } from '../tabs-logado/tabs-logado';
import { ProfessorPage } from '../professor/professor';
import { DomSanitizer } from '@angular/platform-browser';
import { EntrarSalaPage } from '../entrar-sala/entrar-sala';
import { CadProfessorPage } from '../cad-professor/cad-professor';

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  displayImage: any;  
  username:string;
  email:string; 
  password:string;
  lembrar:boolean;
  temErro: boolean;
  erro: string;
  senhaLS: any;
  usuarioLS: any;
  emailLS: any;
  ckboxLembrarLS: any;
  public loader;
  fotoUser: any;
  objPerfil: any;

  constructor(
    public toast: ToastController,
    public autenticationApiProvider: AutenticationApiProvider,
    public loadingCtrl: LoadingController, 
    public navCtrl: NavController, 
    public events1: Events,
    private sanitizer: DomSanitizer,
    public modalCtrl: ModalController,
    public navParams: NavParams)
    {      
      try {
        var objAux = JSON.parse(localStorage.getItem("quiz-perfil"));
        this.objPerfil = objAux[0]; 
        console.log(this.objPerfil);        
        // this.fotoUser = AppModule.getApi().url_api+'professores/'+this.objPerfil[0].foto; 
        this.displayImage = this.sanitizer.bypassSecurityTrustUrl(this.objPerfil.foto);

      } catch (error) {
        console.log("Não consegui buscar foto");        
      } 
      if(this.objPerfil == null){
        this.displayImage = 'assets/imgs/avatar-login.png'; 
      }
            
      try {
        let objLS = JSON.parse(localStorage.getItem("lembrar-senha-app-quiz")); 
        this.senhaLS = objLS.senha; 
        this.emailLS = objLS.email;
        this.ckboxLembrarLS = objLS.ckboxLembrar;
        this.lembrar = true;

      } catch (error) {
        console.log(error);       
      }    
      console.log(this.emailLS, this.senhaLS, this.ckboxLembrarLS);    
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');  
  }

  login(){
    console.log(this.email, this.password);
    
    if(this.email === undefined || this.password === undefined){
      this.temErro = true;
      this.erro = 'Preencha alguma informação';
      console.log("Entrei senhas em branco");
      
    }
    else{ 
      // console.log("entrei else");
      this.openLoading();

      if(this.lembrar == true){
        let objSenha = {email: this.email, senha: this.password, ckboxLembrar: true};
        localStorage.setItem("lembrar-senha-app-quiz", JSON.stringify(objSenha));
      }
      
      this.autenticationApiProvider.loginPost(this.email, this.password)      
      .then((result: any)=>{
          console.log("autenticationApiProvider");            
          let resultDados = result;
          // let auxResultDados:any = JSON.parse(resultDados);
          // console.log(resultDados[0].ativo);
          
          if(resultDados[0].ativo == 1){
            console.log("ativo");
            localStorage.setItem('quiz-perfil', JSON.stringify(resultDados)); 
            // this.events1.publish("login", true);
            // this.navCtrl.setRoot(HomePage);
            localStorage.setItem('quiz-logado', 'true');             
            this.navCtrl.setRoot(ProfessorPage);                      
          }
          else{
            console.log("não ativo");
            this.toast.create({message:"Usuário não Ativo!"
            , position:"middle", duration:3000,cssClass: 'toast-vermelho'}).present();
            // this.closeLoading();
          }             
          this.closeLoading();         
      })
      .catch((error: any)=>{
          console.log(error);      
          this.toast.create({message:"Erro ao fazer Login"
          , position:"middle", duration:3000,cssClass: 'toast-vermelho'}).present();
          this.closeLoading();
      })
    }
  }
  cadastrarProf(){
    console.log("Fui clicado cadastrarProf");
    let profileModal = this.modalCtrl.create(CadProfessorPage);
    
    profileModal.present();

    profileModal.onDidDismiss(data => {  
      // console.log(data);
      // this.buscaSalasProfessor();
    });
  }
  openLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Realizando Login",
    });
    this.loader.present();
  }
  closeLoading() {    
    this.loader.dismiss();
    //this.isRefreshing = true;
  }
  entrarSala(){
    console.log("Fui clicado cadastrarProf");
    let profileModal = this.modalCtrl.create(EntrarSalaPage);
    
    profileModal.present();

    profileModal.onDidDismiss(data => {  
      // console.log(data);
      // this.buscaSalasProfessor();
    });
  }
}
