import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { ButtonsComponent } from './buttons/buttons.component';
import { BadgeComponent } from './badge/badge.component';
import { CardsComponent } from './cards/cards.component';
import { GridComponent } from './grid/grid.component';
import { ListsComponent } from './lists/lists.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { RipplesComponent } from './ripples/ripples.component';
import { StepperComponent } from './stepper/stepper.component';
import { ExpansionComponent } from './expansion/expansion.component';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { ProgressComponent } from './progress/progress.component';
import {
  DialogComponent,
  DialogOverviewExampleDialogComponent
} from '../../../dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AgmCoreModule } from '@agm/core';
import { InicioComponent } from './inicio/inicio.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { MiAsistenciaComponent } from './mi-asistencia/mi-asistencia.component';
import { ReporteRegistroComponent } from './reporte-registro/reporte-registro.component';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { ReporteIncidenciasComponent } from './reporte-incidencias/reporte-incidencias.component';
import { GraficaAsistenciaComponent } from './grafica-asistencia/grafica-asistencia.component';
import { GraficaIncidenciasComponent } from './grafica-incidencias/grafica-incidencias.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';
import { AltaProfesoresComponent } from './alta-profesores/alta-profesores.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AltaProfesores2Component } from './alta-profesores2/alta-profesores2.component';
import { CamposClinicosComponent } from './campos-clinicos/campos-clinicos.component';
import { PaginationComponent } from '../tables/pagination/pagination.component';
import { SortableComponent } from '../tables/sortable/sortable.component';
import { MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChipsComponent } from '../../../chips/chips.component';



@NgModule({
  imports: [
 
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    NgxDatatableModule,
    NgxChartsModule,
    Ng2SmartTableModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    

    SweetAlert2Module.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC-HP1yuc34x-fkhEWpD_ZnGN2VVH7GP1I'
    })
  ],
  providers: [],
  entryComponents: [DialogOverviewExampleDialogComponent],
  declarations: [
    ButtonsComponent,
    BadgeComponent,
    CardsComponent,
    GridComponent,
    ListsComponent,
    MenuComponent,
    TabsComponent,
    RipplesComponent,
    StepperComponent,
    ExpansionComponent,
    ChipsComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    ProgressComponent,
    DialogComponent,
    DialogOverviewExampleDialogComponent,
    TooltipComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    InicioComponent,

    AsistenciaComponent,
    MiAsistenciaComponent,
    ReporteRegistroComponent,
    IncidenciasComponent,
    ReporteIncidenciasComponent,
    GraficaAsistenciaComponent,
    GraficaIncidenciasComponent,
    PerfilComponent,
    PerfilAdminComponent,
    AltaProfesoresComponent,
    AltaProfesores2Component,
    CamposClinicosComponent
  ]
})
export class MaterialComponentsModule {}
