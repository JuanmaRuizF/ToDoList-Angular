import { Component, OnInit, AfterViewInit,  ViewChild} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { PagesService } from 'src/app/pages.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgModule } from '@angular/core'
import {InterfaceTaskList}  from '../../components/models/list.interface'
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['taskName', 'taskDescription', 'taskStatus', 'taskStartDate', 'taskDueDate', 'Actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  tasklist$ = this.taskSvc.tasks;
  navigationExtras: NavigationExtras = {
    state:{
      value:null
    }
  }
  constructor(private router: Router, public taskSvc: PagesService) { }

  ngOnInit(): void {
    this.taskSvc.taskQuery(true).subscribe(res=>this.dataSource.data = res);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }



  async onGoToDelete(taskId:string): Promise<void>{
    try{
      await this.taskSvc.onDeleteTask(taskId);
      alert('Deleted');
    }catch(err){
      console.log(err);
    }

  }
}
