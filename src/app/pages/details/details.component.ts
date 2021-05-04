import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {InterfaceTaskList} from './../../components/models/list.interface'
import { PagesService } from 'src/app/pages.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  navigationExtras: NavigationExtras = {
    state:{
      value:null
    }
  }
  list:InterfaceTaskList =  null;

  constructor(private router: Router, private taskSvc: PagesService) {
    const navigation = this.router.getCurrentNavigation();
    this.list = navigation?.extras?.state?.value;
   }

  ngOnInit(): void {
    if(typeof this.list === 'undefined'){
      this.router.navigate(['list']);
    }
  }

  onGoToEdit():void{
    this.navigationExtras.state.value = this.list;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  onGoBackToList():void{
    this.router.navigate(['list']);
  }

  async onDelete(): Promise<void>{
    try{
      await this.taskSvc.onDeleteTask(this.list.id);
      alert('Deleted');
      this.router.navigate(['list']);
    }catch(err){
      console.log(err);
    }
  }
}
