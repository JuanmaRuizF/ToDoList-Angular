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
    datetimeDueDate: ""
  };
  taskList: FormGroup;

  fechavieja;

  constructor(private router: Router, private fb: FormBuilder, public taskSvc: PagesService) {
    const navigation = this.router.getCurrentNavigation();
    this.task = navigation?.extras?.state?.value;

    // console.log(this.task)
    this.initForm();

  }

  ngOnInit(): void {

    if(typeof this.task === 'undefined'){
      this.router.navigate(['new'])
    }else{
      this.fechavieja = this.task.taskDueDate;
      var dateObject = new Date(this.task.taskDueDate);
      var dateParts = this.task.taskDueDate.split("/");


      // month is 0-based, that's why we need dataParts[1] - 1
      var datee = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];

      var dateObject = new Date(datee);

      // this.task.taskDueDate = dateObject.toString();
      // console.log(dateObject)
      console.log(this.task);
      this.taskList.patchValue(this.task);
    }

  }
  changeStatus(event:any, value:InterfaceTaskList){
    // console.log("AAAAAAAAAAAAAAA")
    // console.log({event});

    this.task.taskStatus = event.value;
    // console.log(event.value);

    this.taskSvc.onSaveTask(this.task, this.task.id)
  }

  onSave():void{
    if(this.taskList.valid){

      const list = this.task;
      var timestamp = parseInt(this.taskList.value.taskDueDate.getTime());
      console.log(timestamp)
      var timestamp1 = Number(timestamp) + 3200;
      console.log(timestamp1);

      var date = new Date(timestamp1).toLocaleDateString();

      console.log(date);
      list.taskDueDate = date;
      list.datetimeDueDate = timestamp1;
      console.log(list.taskDueDate);

      console.log(list);
      const listId = this.task.id;
      this.taskSvc.onSaveTask(list, listId)
      alert("The task has been edited")
      this.taskList.reset();
      this.router.navigate(['list']);

    }else{

      const list = this.task;
      // console.log(list.datetimeDueDate)
      var date = new Date(list.datetimeDueDate).toLocaleDateString();

      // console.log(date);
      list.taskDueDate = date;

      var dateParts = this.task.taskDueDate.split("/");

      var mesbien = parseInt(dateParts[1]) - 1
      var milliseconds = new Date(parseInt(dateParts[2]), mesbien, parseInt(dateParts[0])).getTime();

      list.datetimeDueDate = milliseconds;

      var date = new Date(list.datetimeDueDate).toLocaleDateString();

      list.taskDueDate = date;
      // console.log(list.taskDueDate);

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
      taskDueDate: [''],
      datetimeDueDate:['']
    });

    // console.log(this.taskList)
  }
}
