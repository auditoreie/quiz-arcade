import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera/';
// import { Camera, CameraOptions } from '@ionic-native/camera';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';

import { CadastreProvider } from '../../providers/cadastre/cadastre';

// @IonicPage()
@Component({
  selector: 'page-cad-professor',
  templateUrl: 'cad-professor.html',
})
export class CadProfessorPage {
  formCad: FormGroup;

  foto;
  erroFoto;
  msgFoto;
  
  fotoC: any;
  fotoG: any;

  nome;
  erroNome;
  msgNome;

  sobrenome;
  erroSobrenome;
  msgSobrenome;

  cargoFuncao;
  erroCargoFuncao;
  msgCargoFuncao;

  email;
  erroEmail;
  msgEmail;

  senha;
  erroSenha;
  msgSenha;
  
  base64Image: string;
  loader: any;
  
  constructor(
    public cadastreProvider: CadastreProvider,
    public camera: Camera,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams) 
  {
    this.formCad = formBuilder.group({
      // foto: ['', Validators.required],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],        
      cargoFuncao: ['', Validators.required],  
      email: ['', [Validators.required, Validators.email]],  
      senha: ['', Validators.required],  
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadProfessorPage');
  }
  closeModal() {
    this.navCtrl.pop();
  }
  openCamera(){
    const options: CameraOptions = {
      quality: 75,
      targetWidth:720,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE  
    }

    this.camera.getPicture(options).then((imageData) => {
       
      this.base64Image = 'data:image/jpeg;base64,'+imageData;

    },(err) => {
        // Handler error        
    });
  }
  openGallery(){
    const options: CameraOptions = {
      quality: 75,
      targetWidth:720,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
       
      this.base64Image = 'data:image/jpeg;base64,'+imageData;

    },(err) => {
        // Handler error        
    });
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
  submitCad(){
    console.log("Entrei submitCad");
    
    // let{foto} = this.formCad.controls;
    let{nome} = this.formCad.controls;
    let{sobrenome}= this.formCad.controls;
    let{cargoFuncao}= this.formCad.controls;
    let{email}= this.formCad.controls;
    let{senha}= this.formCad.controls;
    

    // let {foto} = this.formPermuta.controls;
   
    // this.score = parseInt(ocular.value)+ parseInt(verbal.value)+ parseInt(motora.value) + parseInt(pupilar.value);
    if (!this.formCad.valid){
        console.log("entrei no formvalid erro");
        console.log(this.formCad.valid);
        
        console.log(this.base64Image);
        
        if(this.base64Image == null || this.base64Image == undefined) {
          this.erroFoto = true;
          this.msgFoto = "Escolha a foto!";
        } else {
          this.msgFoto = "";
        }

        if (!nome.valid) {
          this.erroNome = true;
          this.msgNome = "Digite um nome!";
        } else {
          this.msgNome = "";
        }

        if (!sobrenome.valid) {
          this.erroSobrenome = true;
          this.msgSobrenome = "Digite um sobrenome!";
        } else {
          this.msgSobrenome = "";
        }

        if (!cargoFuncao.valid) {
          this.erroCargoFuncao = true;
          this.msgCargoFuncao = "Digite um Cargo e Função!";
        } else {
          this.msgCargoFuncao = "";
        }

        if (!email.valid) {
          this.erroEmail = true;
          this.msgEmail = "Digite um email valido!";
        } else {
          this.msgEmail = "";
        }

        if (!senha.valid) {
          this.erroSenha = true;
          this.msgSenha = "Digite uma senha!";
        } else {
          this.msgSenha = "";
        }

    }
    else{
      console.log("entrei no Else");
      console.log(this.base64Image);
      if(this.base64Image == undefined){
        // alert("Ficou undefined");
        this.toastCtrl.create({message:"E necessário cadastrar uma foto!"
        , position:"middle", duration:3000,cssClass: 'toast-vermelho'}).present();
      }
      else{              
          let d = new Date();
          //var jsonAux = JSON.parse(localStorage.getItem("quiz-perfil"));
          // this.objPerfil = jsonAux[0].id; 

          let objAux = {
            foto: this.base64Image,
            // foto: "this.base64Image",
            nome: nome,
            sobrenome: sobrenome,
            cargo_funcao: cargoFuncao,
            email: email,
            senha: senha,
            ativo: 1,
            data_cadastro: d.getFullYear()+'-'+(1 + d.getMonth())+'-'+d.getDate(),
            //id_sala: Math.random().toString(36).substr(2, 9),        
            //id_professor: jsonAux[0].id,
          };
          // let objAux = {
          //   foto: "this.base64Image",
          //   // foto: "this.base64Image",
          //   nome: "nome",
          //   sobrenome: "sobrenome",
          //   cargo_funcao: "cargoFuncao",
          //   email: "email",
          //   senha: "senha",
          //   ativo: "1",
          //   data_cadastro: "2020-03-14",
          //   //id_sala: Math.random().toString(36).substr(2, 9),        
          //   //id_professor: jsonAux[0].id,
          // };
          // console.log("Antes IF Persistencia");
          this.openLoading("Aguarde, estamos cadastrando...");      
          this.cadastreProvider.submeteProfe(objAux)
          .then((result: any)=>{      
              let resultConvertido = JSON.parse(result);          
              if(resultConvertido == "ed"){
                this.toastCtrl.create({message:"Este e-mail já está cadastrado!"
                , position:"middle", duration:4000, cssClass: 'toast-vermelho'}).present();
                // this.formCad.reset();      
                this.closeLoading();
              } 
              else{
                this.toastCtrl.create({message:"Cadastro realizado com sucesso!"
                , position:"middle", duration:4000, cssClass: 'toast-vermelho'}).present();
                this.formCad.reset();      
                this.closeLoading();
              }        
        })
        .catch((error: any)=>{
            console.log(error);
                    
            this.toastCtrl.create({message:"Não conseguimos cadastrar...\n Tente novamente mais tarde!"
            , position:"bottom", duration:3000,cssClass: 'toast-vermelho'}).present();

            console.log(error.error);
            this.closeLoading();
        });              
      }
    }
  }
}

