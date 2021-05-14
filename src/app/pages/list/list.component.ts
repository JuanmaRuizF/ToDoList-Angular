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
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})




export class ListComponent implements OnInit, AfterViewInit {
  show=false;


  displayedColumns: string[] = ['taskName', 'taskStatus', 'taskStartDate',  'taskDueDate', 'Actions'];
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
    this.taskSvc.taskQuery(false).subscribe(res=>this.dataSource.data = res);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  setfalse():void{
    this.show = !this.show;
    console.log(this.show);
  }


  onGoToSee(item:any):void{
    this.navigationExtras.state.value = item;
    this.router.navigate(['details'], this.navigationExtras);
  }

  onGoToEdit(item:any):void{
    console.log(item);
    this.navigationExtras.state.value = item;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  changeStatus(event:any, value:InterfaceTaskList){
    console.log(value)
    value.taskStatus = event.value;
    this.taskSvc.onSaveTask(value, value.id)
    console.log(value.taskStatus)
    this.show = !this.show;
  }

  async onGoToDelete(taskId:string): Promise<void>{
    try{
      await this.taskSvc.onDeleteTask(taskId);
      alert('Deleted');
    }catch(err){
      console.log(err);
    }

  }

  public editStatus(element){
    console.log(this.taskSvc.selected)
    this.show = !this.show;
    this.taskSvc.selected = element;
  }


}
