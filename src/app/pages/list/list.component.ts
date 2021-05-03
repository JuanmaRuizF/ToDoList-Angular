import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  navigationExtras: NavigationExtras = {
    state:{
      value:null
    }
  }

  fakeData = [
    {
      taskName : 'tfg',
      taskDescription: 'acabarlo',
      taskStatus: 'Pending',
      taskDate: '19/05/2021'
    },
    {
      taskName : 'aaa',
      taskDescription: 'bbbbbbb',
      taskStatus: 'Pending',
      taskDate: '19/05/2021'
    },
    {
      taskName : 'cccccccccccc',
      taskDescription: 'ddddddd',
      taskStatus: 'Pending',
      taskDate: '19/05/2021'
    }
  ]

  constructor(private router: Router) { }

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

  onGoToDelete(item:any):void{
    alert('Deleted');
  }

}
