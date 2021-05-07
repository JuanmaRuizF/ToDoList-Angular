import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricalRoutingModule } from './historical-routing.module';
import { HistoricalComponent } from './historical.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    HistoricalComponent
  ],
  imports: [
    CommonModule,
    HistoricalRoutingModule,
    MatButtonToggleModule,
    MatSortModule,
    MatTableModule,
    MatRadioModule,
    MatIconModule
  ]
})
export class HistoricalModule { }
