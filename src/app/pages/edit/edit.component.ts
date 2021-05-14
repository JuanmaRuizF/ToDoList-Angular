import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { PagesService } from 'src/app/pages.service';
import {InterfaceTaskList} from './../../components/models/list.interface'
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  task: InterfaceTaskList = {
    id: "",
    taskName: "",
    taskDescription: "",
    taskStartDate:"" ,
    taskStatus: "",
    taskDueDate: "",
  };
  taskList: FormGroup;



  constructor(private router: Router, private fb: FormBuilder, public taskSvc: PagesService) {
    const navigation = this.router.getCurrentNavigation();
    this.task = navigation?.extras?.state?.value;

    console.log(this.task)
    this.initForm();

  }

  ngOnInit(): void {

    if(typeof this.task === 'undefined'){
      this.router.navigate(['new'])
    }else{
      console.log(this.taskList.patchValue(this.task));
      this.taskList.patchValue(this.task);
    }

  }
  changeStatus(event:any, value:InterfaceTaskList){
    console.log("AAAAAAAAAAAAAAA")
    console.log({event});

    this.task.taskStatus = event.value;
    console.log(this.task);

    this.taskSvc.onSaveTask(this.task, this.task.id)
  }

  onSave():void{
    if(this.taskList.valid){

      // console.log(this.task)
      // this.taskList = this.fb.group({
      //   taskName: [this.task.taskName],
      //   taskDescription: [this.task.taskDescription],
      //   taskStartDate: [this.task.taskStartDate],
      //   taskStatus: [this.taskSvc.selected.taskStatus],
      //   id: [this.task.id]
      // });
      const list = this.task;

      var timestamp = parseInt(this.taskList.value.taskDueDate.getTime());
      console.log(timestamp)
      var timestamp1 = Number(timestamp) + 3200;
      console.log(timestamp1);

      var date = new Date(timestamp1).toLocaleDateString();

      console.log(date);
      list.taskDueDate = date;

      console.log(list.taskDueDate);
      // list.taskDueDate = JSON.stringify(list.taskDueDate);
      // console.log(list.taskDueDate)
      // list.taskDueDate = this.task.taskDueDate.substring(1,list.taskDueDate.indexOf('T'));


      console.log(list);
      const listId = this.task.id;
      this.taskSvc.onSaveTask(list, listId)
      alert("The task has been edited")
      this.taskList.reset();
      this.router.navigate(['list']);

    }
  }

  onGoBackToList():void{
    this.router.navigate(['list']);
  }
  private initForm():void{
    this.taskList = this.fb.group({
      taskName: ['' ],
      taskDescription: [''],
      taskStartDate: [this.task.taskStartDate],
      taskStatus: [this.task.taskStatus],
      id: [this.task.id],
      // taskDueDate: [this.task.taskDueDate]
      taskDueDate: ['']
    });

    console.log(this.taskList)
  }
}
