import { Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { BadgeComponent } from './badge/badge.component';
import { CardsComponent } from './cards/cards.component';
import { GridComponent } from './grid/grid.component';
import { ListsComponent } from './lists/lists.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { StepperComponent } from './stepper/stepper.component';
import { ExpansionComponent } from './expansion/expansion.component';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { ProgressComponent } from './progress/progress.component';
import { RipplesComponent } from './ripples/ripples.component';
import { DialogComponent } from '../../../dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { InicioComponent } from './inicio/inicio.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { MiAsistenciaComponent } from './mi-asistencia/mi-asistencia.component';
import { ReporteRegistroComponent } from './reporte-registro/reporte-registro.component';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { ReporteIncidenciasComponent } from './reporte-incidencias/reporte-incidencias.component';
import { GraficaAsistenciaComponent } from './grafica-asistencia/grafica-asistencia.component';
import { GraficaIncidenciasComponent } from './grafica-incidencias/grafica-incidencias.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';
import { AltaProfesoresComponent } from './alta-profesores/alta-profesores.component';
import { AltaProfesores2Component } from './alta-profesores2/alta-profesores2.component';
import { CamposClinicosComponent } from './campos-clinicos/campos-clinicos.component';
import { ChipsComponent } from '../../../chips/chips.component';

export const MaterialRoutes: Routes = [
  {
    path: '',
    children: [


      {
        path: 'inicio',
        component: InicioComponent
      },
      {
        path: 'asistencia',
        component: AsistenciaComponent
      },
      {
        path: 'mi-asistencia',
        component: MiAsistenciaComponent
      },
      {
        path: 'reporte-registro',
        component: ReporteRegistroComponent
      },

      {
        path: 'incidencias',
        component: IncidenciasComponent
      },
      {
        path: 'reporte-incidencias',
        component: ReporteIncidenciasComponent
      },

      {
        path: 'grafica-asistencia',
        component: GraficaAsistenciaComponent

      },
      {
        path: 'grafica-incidencias',
        component: GraficaIncidenciasComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'perfil-admin',
        component: PerfilAdminComponent
      },
      {
        path: 'alta-profesores',
        component: AltaProfesoresComponent
      },
      {
        path:'campos-clinicos',
        component:CamposClinicosComponent

      },
      {
        path: 'alta-profesores2',
        component: AltaProfesores2Component
      },
      {
        path: '',
        redirectTo: '/material/inicio',
        pathMatch: 'full'
      },
      {
        path: 'button',
        component: ButtonsComponent
      },
      {
        path: 'badge',
        component: BadgeComponent
      },
      {
        path: 'cards',
        component: CardsComponent
      },
      {
        path: 'grid',
        component: GridComponent
      },
      {
        path: 'lists',
        component: ListsComponent
      },
      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: 'tabs',
        component: TabsComponent
      },
      {
        path: 'ripples',
        component: RipplesComponent
      },
      {
        path: 'stepper',
        component: StepperComponent
      },
      {
        path: 'expansion',
        component: ExpansionComponent
      },
      {
        path: 'chips',
        component: ChipsComponent
      },
      {
        path: 'toolbar',
        component: ToolbarComponent
      },
      {
        path: 'progress-snipper',
        component: ProgressSnipperComponent
      },
      {
        path: 'progress',
        component: ProgressComponent
      },
      {
        path: 'dialog',
        component: DialogComponent
      },
      {
        path: 'tooltip',
        component: TooltipComponent
      },
      {
        path: 'snackbar',
        component: SnackbarComponent
      },
      {
        path: 'slider',
        component: SliderComponent
      },
      {
        path: 'slide-toggle',
        component: SlideToggleComponent
      }
    ]
  }
];
