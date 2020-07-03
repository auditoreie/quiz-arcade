import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { CadastreProvider } from '../../providers/cadastre/cadastre';


// @IonicPage()
@Component({
  selector: 'page-cadastre',
  templateUrl: 'cadastre.html',
})
export class CadastrePage {
  public formCad: FormGroup;
  
  loader: any;
  
  multiplaescolha;
  certoerrado;

  ciencia: any;
  erroCiencia;
  msgCiencia;
  ciencias: any;
  
  cursos: any;
  
  curso:any;
  erroCurso;
  msgCurso;

  disciplina: any;
  disciplinas: any;
  erroDisciplina;
  msgDisciplina;
  // dificuldades: any;
  
  dificuldade:any;
  dificuldades: {nome: string; id: string; }[];
  erroDif;
  msgDif;

  periodo:any;
  periodos: {nome: string; id: string; }[];
  erroPeriodo;
  msgPeriodo;

  pergunta;
  erroPerg;
  msgPerg;

  respCorreta;
  erroRespCorreta;
  msgRespCorreta;

  respErr1;
  erroRespErr1;
  msgRespErr1;

  respErr2;
  erroRespErr2;
  msgRespErr2;

  respErr3;
  erroRespErr3;
  msgRespErr3;

  respErr4;
  erroRespErr4;
  msgRespErr4;

  videoExplic;
  erroVideoExplic;
  msgVideoExplic;

  textExplica;
  erroTextExplica;
  msgTextExplica;

  inserido;
  erroInserido;
  msgInserido;
  origem: string;
  id_sala;
  id_sala_param: string;
  quizz_ativo: number;
  quizz_inserido: any;
  objPerfil: any;
  multiplaescolhaTipo: boolean;
  certoerradoTipo: boolean;
  tipoQuestao: number;

  constructor(
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navCtrl: NavController,     
    public navParams: NavParams,
    public cadastreProvider: CadastreProvider
    ) 
    {
        this.origem = this.navParams.get("origem");
        console.log("Origem: "+this.origem);
        
        this.id_sala_param = this.navParams.get("id_sala");
        console.log(this.id_sala_param);
        
        this.formCad = formBuilder.group({
            ciencia: ['', Validators.required],
            curso: ['', Validators.required],
            disciplina: ['', Validators.required],        
            dificuldade: ['', Validators.required], 
            periodo: ['', Validators.required],        
            pergunta: ['', Validators.required],
            respCorreta: ['', Validators.required],
            respErr1: ['', Validators.required],
            respErr2: [''],
            respErr3: [''],
            respErr4: [''],
            videoExplic: [''],
            textExplica: ['', Validators.required],
            inserido: [''],
            multiplaescolha: [''],
            certoerrado: [''],
                
        // fotoG: ['', Validators.required],   
        // fotoC: ['', Validators.required],     
      });
      this.dificuldades = [];
      this.periodos = [];
      
      try {
        var objAux = JSON.parse(localStorage.getItem("quiz-perfil"));
        this.objPerfil = objAux[0];
        console.log(this.objPerfil);         
       
      } catch (error) {
        console.log("Não consegui acessar localstorage");        
      }
      this.certoerradoTipo = false;
      this.multiplaescolhaTipo = true;
       
    }
  stateChangeME(event){
    if(event == true){
      this.multiplaescolhaTipo = event;
      this.certoerradoTipo = false;
    //   // this.certoerrado = false;
    }
    if(event == false){
      this.multiplaescolhaTipo = event;
      this.certoerradoTipo = true;    
    }
    console.log(this.multiplaescolhaTipo, this.certoerradoTipo);
        
  }
  stateChangeCE(event){
    if(event == true){      
      this.certoerradoTipo = event;
      this.multiplaescolhaTipo = false;
    }
    if(event == false){
      this.certoerradoTipo = event;   
      this.multiplaescolhaTipo = true;
       
    }
    console.log(this.certoerradoTipo, this.multiplaescolhaTipo);        
  }
  async ionViewDidLoad() {
    console.log('ionViewDidLoad CadastrePage');

    await this.buscaTables("ciencia");
    await this.buscaTables("curso");        
    await this.buscaTables("disciplinas");
    await this.initArrayDificuldades();
    await this.initArrayPeriodos();

    console.log(this.origem);

  }
  buscaTables(table){
    this.cadastreProvider.getTableGen(table)
    .then((result)=>{
      if(table == "ciencia"){
        this.ciencias = result;
      }
      if(table == "curso"){
        this.cursos = result;
      }
      if(table == "disciplinas"){
        this.disciplinas = result;
      }
                   
    })
    .catch((erro) => {
       console.log(erro);
       
    })
  }
  initArrayDificuldades(){
    // '1' => 'Fácil', 
    // '2' => 'Intermediário',
    // '3' => 'Dificil',
    this.dificuldades.push({nome: "Fácil", id: "1"});
    this.dificuldades.push({nome: "Intermediária", id: "2"});
    this.dificuldades.push({nome: "Dificil", id: "3"});
  }
  initArrayPeriodos(){
    this.periodos.push({nome: "1º", id: "1"});
    this.periodos.push({nome: "2º", id: "2"});
    this.periodos.push({nome: "3º", id: "3"});
    this.periodos.push({nome: "4º", id: "4"});
    this.periodos.push({nome: "5º", id: "5"});
    this.periodos.push({nome: "6º", id: "6"});
    this.periodos.push({nome: "7º", id: "7"});
    this.periodos.push({nome: "8º", id: "8"});
    this.periodos.push({nome: "9º", id: "9"});
    this.periodos.push({nome: "10º", id: "10"});

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
     
    // let{certoerrado}= this.formCad.controls;
    // let{multiplaescolha}= this.formCad.controls;
    let{ciencia} = this.formCad.controls;
    let{curso}= this.formCad.controls;
    let{disciplina}= this.formCad.controls;
    let{dificuldade}= this.formCad.controls; 
    let{periodo}= this.formCad.controls;        
    let{pergunta}= this.formCad.controls;
    let{respCorreta}= this.formCad.controls;
    let{respErr1}= this.formCad.controls;
    let{respErr2}= this.formCad.controls;
    let{respErr3}= this.formCad.controls;
    let{respErr4}= this.formCad.controls;
    let{videoExplic}= this.formCad.controls;
    let{textExplica}= this.formCad.controls;
    let{inserido}= this.formCad.controls;

    // let {foto} = this.formPermuta.controls;
   
    // this.score = parseInt(ocular.value)+ parseInt(verbal.value)+ parseInt(motora.value) + parseInt(pupilar.value);
    if (!this.formCad.valid){
        console.log("Algum erro do Form");
        console.log(this.formCad);
        
        if (!ciencia.valid) {
          this.erroCiencia = true;
          this.msgCiencia = "Escolha a Ciência!";
        } else {
          this.msgCiencia = "";
        }

        if (!curso.valid) {
          this.erroCurso = true;
          this.msgCurso = "Escolha o Curso!";
        } else {
          this.msgCurso = "";
        }

        if (!disciplina.valid) {
          this.erroDisciplina = true;
          this.msgDisciplina = "Escolha a Disciplina!";
        } else {
          this.msgDisciplina = "";
        }
        
        if (!dificuldade.valid) {
          this.erroDif = true;
          this.msgDif = "Escolha a Dificuldade!";
        } else {
          this.msgDif = "";
        }
        if (!periodo.valid) {
          this.erroPeriodo = true;
          this.msgPeriodo = "Escolha o Periodo!";
        } else {
          this.msgPeriodo = "";
        }

        if (!pergunta.valid) {
          this.erroPerg = true;
          this.msgPerg = "Preencha a Pergunta!";
        } else {
          this.msgPerg = "";
        }
        
        if (!respCorreta.valid) {
          this.erroRespCorreta = true;
          this.msgRespCorreta = "Preencha a Resposta Correta!";
        } else {
          this.msgPerg = "";
        }
        if (!respErr1.valid) {
          this.erroRespErr1 = true;
          this.msgRespErr1 = "Preencha a Resposta errada 1!";
        } else {
          this.msgRespErr1 = "";
        }
        // if (!respErr2.valid) {
        //   this.erroRespErr2 = true;
        //   this.msgRespErr2 = "Preencha a Resposta errada 2!";
        // } else {
        //   this.msgRespErr2 = "";
        // }
        // if(!respErr3.valid){
        //   this.erroRespErr3 = true;
        //   this.msgRespErr3 = "Preencha a Resposta errada 3!";
        // } else {
        //   this.msgRespErr3 = "";
        // }
        // if(!respErr4.valid){
        //   this.erroRespErr4 = true;
        //   this.msgRespErr4 = "Preencha a Resposta errada 4!";
        // } else {
        //   this.msgRespErr4 = "";
        // }       
        if(!textExplica.valid){
          this.erroTextExplica = true;
          this.msgTextExplica = "Preencha o Texto Explicativo!";
        } else {
          this.msgTextExplica = "";
        }
        // if(this.origem == 'questoes') {
        //   // if(!inserido.valid){
        //   //   this.erroInserido = true;
        //   //   this.msgInserido = "Preencha seu Nome!";
        //   // } else {
        //   //   this.msgInserido = "";
        //   // }
        // }
        // else{
        //   if(!inserido.valid){
        //     this.erroInserido = true;
        //     this.msgInserido = "Preencha seu Nome!";
        //   } else {
        //     this.msgInserido = "";
        //   }
        // }
          

    }
    else{
      console.log("entrei no Else");
            
      let d = new Date();
      let msgSucess = '';

      if(this.origem == 'questoes') {
        this.id_sala = this.id_sala_param;
        this.quizz_ativo = 1;
        this.quizz_inserido = this.objPerfil.nome+' '+this.objPerfil.sobrenome;
        msgSucess = "Questão enviada com Sucesso!!!";
      }
      else{
        this.id_sala = '';
        this.quizz_ativo = 0;
        this.quizz_inserido = inserido.value;
        msgSucess = "Questão enviada com Sucesso! \n Analisaremos sua questão e logo logo \n iremos disponibiliza-la!";
      }
      if(this.multiplaescolhaTipo == true){
        this.tipoQuestao = 1;        
      }
      if(this.certoerradoTipo == true){
        this.tipoQuestao = 2; 
      }

      let objAux = {
        ciencia : ciencia,
        curso : curso,
        category: disciplina,
        periodo: periodo,
        type: this.tipoQuestao, 
        difficulty: dificuldade,        
        question: pergunta,
        correct_answer:  respCorreta,
        incorrect_answers1: respErr1,
        incorrect_answers2: respErr2,
        incorrect_answers3: respErr3,
        incorrect_answers4: respErr4,
        video_explicativo: videoExplic,
        texto_explicativo: textExplica,
        inserido_data: d.getFullYear()+'-'+(1 + d.getMonth())+'-'+d.getDate(),
        inserido_por: this.quizz_inserido,        
        id_sala: this.id_sala,
        ativo: this.quizz_ativo,
      };
      // console.log("Antes IF Persistencia");
      this.openLoading("Aguarde Carregando...");
      
      this.cadastreProvider.submeteQuestao(objAux)
      .then((result: any)=>{      
          console.log(result);          
          this.closeLoading();

          this.toastCtrl.create({message: msgSucess
          , position:"middle", duration:4000, cssClass: 'toast-vermelho'}).present();
          this.formCad.reset();      
      })
      .catch((error: any)=>{
          console.log(error);        
          this.toastCtrl.create({message:"Erro ao enviar Questão."
          , position:"bottom", duration:3000,cssClass: 'toast-vermelho'}).present();
          this.closeLoading();
      })
      
     
      // if(aux){
      //   this.presentToast("A Denúncia foi enviada!");
      // }
      // else{
      //   this.presentToast("Não foi possível enviar Denúncia!");
      // }
      // let profileModal = this.modalCtrl.create("ResultEscalaGlasPage");
      // profileModal.present();
  
      // profileModal.onDidDismiss(data => {  
      //   console.log(data);
      // });
     
    }
  }
  closeModal(){
    let action = { 'action': 'close'};
    // this.viewCtrl.dismiss(action);
    this.navCtrl.pop();
  }

}
