import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { CadastreProvider } from '../../providers/cadastre/cadastre';

// @IonicPage()
@Component({
  selector: 'page-cad-sala',
  templateUrl: 'cad-sala.html',
})
export class CadSalaPage {
  public formCad: FormGroup;
  
  loader: any;

  avaliativas: {nome: string; id: string; }[];

  avaliativa;
  erroAvaliativa;
  msgAvaliativa;

  nomeSala;
  erroNomeSala;
  msgNomeSala;

  turma;
  erroTurma;
  msgTurma;
  
  disciplina;
  erroDisciplina;
  msgDisciplina;

  eAvaliativa;

  nota;
  erroNota;
  msgNota;

  constructor(
    public cadastreProvider: CadastreProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams) 
    {
      this.formCad = formBuilder.group({
        avaliativa: ['', Validators.required],
        nomeSala: ['', Validators.required],
        turma: ['', Validators.required],        
        disciplina: ['', Validators.required], 
        nota: [''],  
      });
      this.avaliativas = [];
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad CadSalaPage');

    await this.initArrayAvaliativa();
  }
  closeModal() {
    this.navCtrl.pop();
  }
  initArrayAvaliativa(){
    // '1' => 'Fácil', 
    // '2' => 'Intermediário',
    // '3' => 'Dificil',
    this.avaliativas.push({nome: "Não", id: "0"});
    this.avaliativas.push({nome: "Sim", id: "1"});    
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
    
    let{avaliativa} = this.formCad.controls;
    let{nomeSala} = this.formCad.controls;
    let{turma}= this.formCad.controls;
    let{disciplina}= this.formCad.controls;
    let{nota}= this.formCad.controls;
    

    // let {foto} = this.formPermuta.controls;
   
    // this.score = parseInt(ocular.value)+ parseInt(verbal.value)+ parseInt(motora.value) + parseInt(pupilar.value);
    if (!this.formCad.valid){
        console.log("entrei no formvalid erro");
      
        if (!avaliativa.valid) {
          this.erroAvaliativa = true;
          this.msgAvaliativa = "Escolha se é avaliativa ou não!";
        } else {
          this.msgAvaliativa = "";
        }

        if (!nomeSala.valid) {
          this.erroNomeSala = true;
          this.msgNomeSala = "Escolha o nome da sala!";
        } else {
          this.msgNomeSala = "";
        }

        if (!turma.valid) {
          this.erroTurma = true;
          this.msgTurma = "Escolha o nome da Turma!";
        } else {
          this.msgTurma = "";
        } 
        if (!disciplina.valid) {
          this.erroDisciplina = true;
          this.msgDisciplina = "Escolha o nome da Disciplina!";
        } else {
          this.msgDisciplina = "";
        }        

    }
    else{
      console.log("entrei no Else");
            
      let d = new Date();
      var jsonAux = JSON.parse(localStorage.getItem("quiz-perfil"));
      // this.objPerfil = jsonAux[0].id; 

      let objAux = {
        avaliativa : avaliativa,
        nomeSala : nomeSala,
        turma: turma,
        disciplina: disciplina,
        nota: nota,

        data: d.getFullYear()+'-'+(1 + d.getMonth())+'-'+d.getDate(),
        id_sala: Math.random().toString(36).substr(2, 9),        
        id_professor: jsonAux[0].id,
      };
      // console.log("Antes IF Persistencia");
      this.openLoading("Aguarde estamos cadastrando a Sala...");
      
      this.cadastreProvider.submeteSala(objAux)
      .then((result: any)=>{      
          console.log(result);          
          this.closeLoading();

          this.toastCtrl.create({message:"A Sala foi cadastrada com sucesso!"
          , position:"middle", duration:4000, cssClass: 'toast-vermelho'}).present();
          this.formCad.reset();      
      })
      .catch((error: any)=>{
          console.log(error);        
          this.toastCtrl.create({message:"Não conseguimos criar esta Sala."
          , position:"bottom", duration:3000,cssClass: 'toast-vermelho'}).present();
          this.closeLoading();
      })               
    }
  }
  onChange($event){
    console.log($event);
    if($event == 1){
      this.eAvaliativa = true; 
    }
    else{
      this.eAvaliativa = false; 
    }
    
  }
}
