import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { PagesService } from 'src/app/pages.service';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tasklist$ = this.taskSvc.tasks;
  navigationExtras: NavigationExtras = {
    state:{
      value:null
    }
  }


  constructor(private router: Router, private taskSvc: PagesService) { }


  ngOnInit(): void {
  }

  onGoToSee(item:any):void{
    this.navigationExtras.state.value = item;
    this.router.navigate(['details'], this.navigationExtras);
  }

  onGoToEdit(item:any):void{
    this.navigationExtras.state.value = item;
    this.router.navigate(['edit'], this.navigationExtras);
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
