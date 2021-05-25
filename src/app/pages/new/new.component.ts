import { isFakeTouchstartFromScreenReader } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { PagesService } from 'src/app/pages.service';
import {InterfaceTaskList} from './../../components/models/list.interface'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  fecha = new Date();
  tdate = this.fecha.toLocaleDateString();
  task: InterfaceTaskList = null;
  taskList: FormGroup;


  constructor(private router: Router, private fb: FormBuilder, private taskSvc: PagesService) {
    const navigation = this.router.getCurrentNavigation();
    this.task = navigation?.extras?.state?.value;
    this.initForm();
    //console.log(this.tdate)
  }

  ngOnInit(): void {
    if(typeof this.task === 'undefined'){
      this.router.navigate(['new'])
    }else{
      this.taskList.patchValue(this.task);
    }
  }

  onSave():void{
    console.log('Saved', this.taskList.value)

    if(this.taskList.valid){
      console.log(this.taskList.value.taskDueDate.getTime());
      var timestamp = parseInt(this.taskList.value.taskDueDate.getTime());
      console.log(timestamp)
      var timestamp1 = Number(timestamp) + 3200;
      console.log(timestamp1);

      this.taskList.value.datetimeDueDate  = timestamp1
      var date = new Date(timestamp1).toLocaleDateString();

      console.log(date);
      this.taskList.value.taskDueDate = date;

      const list = this.taskList.value;
      //console.log(list)
      const listId = this.task?.id|| null;
      this.taskSvc.onSaveTask(list, listId)
      alert("The task has been added")
      this.taskList.reset();
      this.router.navigate(['list']);
    }
  }

  onGoBackToList():void{
    this.router.navigate(['list']);
  }
  private initForm():void{
    this.taskList = this.fb.group({
      taskName: ['', [Validators.required]],
      taskDescription: ['', ],
      taskStatus: ['Pending'],
      taskStartDate: [this.tdate],
      taskDueDate: ["",],
      datetimeDueDate: ["",],
    });
  }
}


