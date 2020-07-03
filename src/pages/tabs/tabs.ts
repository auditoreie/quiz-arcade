import { Component } from '@angular/core';

// import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
// import { SettingsPage } from '../settings/settings';
// import { VadeMecumPage } from '../vade-mecum/vade-mecum';
import { CadastrePage } from '../cadastre/cadastre';
import { AboutPage } from '../about/about';
import { ProfessorPage } from '../professor/professor';
import { LoginPage } from '../login/login';

import { EnsinoMedioPage } from '../ensino-medio/ensino-medio';
import { ConcursoPage } from '../concurso/concurso';
import { OabPage } from '../oab/oab';
// import { ProfessorPage } from '../professor/professor';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;  
  tabMedio = EnsinoMedioPage;
  tabConc = ConcursoPage;
  tabOAB = OabPage;
  tab3Root = CadastrePage;
  tab4Root: any;
  tab5Root = AboutPage;

  constructor() {

    if(localStorage.getItem('quiz-logado') == 'true'){
      // this.tab4Root = "ProfessorPage";
      this.tab4Root = ProfessorPage
    }
    else{
      this.tab4Root = LoginPage;
    }
  }
  
}
