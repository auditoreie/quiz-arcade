import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { GameViewPage } from '../pages/game-view/game-view';
import { GameViewMedioPage } from '../pages/game-view-medio/game-view-medio';
import { FeedbackPage } from '../pages/feedback/feedback';
import { FeedbackMedioPage } from './../pages/feedback-medio/feedback-medio';

import { ResultsPage } from '../pages/results/results';
import { ResultsMedioPage } from '../pages/results-medio/results-medio';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { QuizProvider } from '../providers/quiz/quiz';
import { QuizzesProvider } from '../providers/quizzes/quizzes';
// import { VadeMecumPage } from '../pages/vade-mecum/vade-mecum';
import { HomeProvider } from '../providers/home/home';
import { DisciplinasProvider } from '../providers/disciplinas/disciplinas';
import { DisciplinasPage } from '../pages/disciplinas/disciplinas';
import { CadastrePage } from '../pages/cadastre/cadastre';
// import { DetailLeiPage } from '../pages/detail-lei/detail-lei';
import { DetailLeiProvider } from '../providers/detail-lei/detail-lei';
import { CadastreProvider } from '../providers/cadastre/cadastre';
import { ExplicacaoPage } from '../pages/explicacao/explicacao';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
// import { LoginPage } from '../pages/login/login';
import { AutenticationApiProvider } from '../providers/autentication-api/autentication-api';
import { ProfessorPage } from '../pages/professor/professor';
import { LoginPage } from '../pages/login/login';
import { AddQuestoesPage } from '../pages/add-questoes/add-questoes';
import { QuestoesPage } from '../pages/questoes/questoes';
import { VerQuestaoPage } from '../pages/ver-questao/ver-questao';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CadProfessorPage } from '../pages/cad-professor/cad-professor';
import { Camera } from '@ionic-native/camera';
import { EntrarSalaPage } from '../pages/entrar-sala/entrar-sala';
import { RespostasSalaPage } from '../pages/respostas-sala/respostas-sala';
import { ListasRespostaAlunoPage } from '../pages/listas-resposta-aluno/listas-resposta-aluno';
import { CadSalaPage } from '../pages/cad-sala/cad-sala';
import { EditProfessorPage } from '../pages/edit-professor/edit-professor';
import { EnsinoMedioPage } from '../pages/ensino-medio/ensino-medio';
import { OabPage } from '../pages/oab/oab';
import { ConcursoPage } from '../pages/concurso/concurso';
import { EnsinomedioProvider } from '../providers/ensinomedio/ensinomedio';

// import { TabsLogadoPage } from '../pages/tabs-logado/tabs-logado';
// import { ProfessorPage } from '../pages/professor/professor';
import { OneSignal } from '@ionic-native/onesignal';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    SettingsPage,
    GameViewPage,
    GameViewMedioPage,
    FeedbackPage,
    FeedbackMedioPage,
    ResultsPage,
    ResultsMedioPage,
    CadSalaPage,
    EditProfessorPage,
    DisciplinasPage,
    CadastrePage,
    // DetailLeiPage,
    ExplicacaoPage,
    ProfessorPage,
    LoginPage,
    AddQuestoesPage,
    QuestoesPage,
    VerQuestaoPage,
    CadProfessorPage,
    EntrarSalaPage,
    RespostasSalaPage,
    ListasRespostaAlunoPage,
    EnsinoMedioPage,
    ConcursoPage,
    OabPage
    // TabsLogadoPage,
    // ProfessorPage
  ],
  imports: [
    BrowserModule,
    HttpModule,   
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    SettingsPage,
    GameViewPage,
    GameViewMedioPage,
    FeedbackPage,
    FeedbackMedioPage,
    ResultsPage,
    ResultsMedioPage,
    // VadeMecumPage,
    DisciplinasPage,
    CadastrePage,
    EditProfessorPage,
    // DetailLeiPage,
    ExplicacaoPage,
    ProfessorPage,
    LoginPage,
    AddQuestoesPage,
    QuestoesPage,
    VerQuestaoPage,
    CadProfessorPage,
    EntrarSalaPage,
    RespostasSalaPage,
    ListasRespostaAlunoPage,
    CadSalaPage,
    EnsinoMedioPage,
    ConcursoPage,
    OabPage
    // TabsLogadoPage,
    // ProfessorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},     
    QuizzesProvider,
    HomeProvider,
    DisciplinasProvider,
    DetailLeiProvider,
    CadastreProvider,
    YoutubeVideoPlayer,
    AutenticationApiProvider,
    SocialSharing,
    Camera,
    EnsinomedioProvider,
    OneSignal, 
  ]
})
export class AppModule {

  public static api = {    
    url_api           : 'http://quizacademico.com.br/admin/api/',   
    // url_api           : 'http://localhost/quizacademico/admin/api/', 
        
  };

  static getApi(){
    return this.api;
  } 
 
}
