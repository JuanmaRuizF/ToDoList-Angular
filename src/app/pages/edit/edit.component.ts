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
  task: InterfaceTaskList = null;
  taskList: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private taskSvc: PagesService) {
    const navigation = this.router.getCurrentNavigation();
    this.task = navigation?.extras?.state?.value;
    this.initForm();

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
      const list = this.taskList.value;
      const listId = this.task?.id|| null;
      this.taskSvc.onSaveTask(list, listId)
      alert("The task has been edited")
      this.taskList.reset();
    }
  }
  onGoBackToList():void{
    this.router.navigate(['list']);
  }
  private initForm():void{
    this.taskList = this.fb.group({
      taskName: ['', [Validators.required]],
      taskDescription: ['', [Validators.required]],
    });
  }
}
