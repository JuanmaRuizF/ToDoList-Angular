import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {InterfaceTaskList} from './../../components/models/list.interface'

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

  constructor(private router: Router) {
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

  onDelete():void{
    alert('Deleted');
  }
}
