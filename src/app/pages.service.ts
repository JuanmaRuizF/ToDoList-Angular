import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {InterfaceTaskList} from 'src/app/components/models/list.interface'
import {map} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class PagesService {
  tasks: Observable<InterfaceTaskList[]>;

  private taskCollection: AngularFirestoreCollection<InterfaceTaskList>;

  constructor(private readonly afs: AngularFirestore) {
    this.taskCollection = afs.collection<InterfaceTaskList>('tasks');
    this.tasks = this.getTasks();
  }
//   this.toDoCollection = this.angularFirestore.collection<ToDo>('toDo', ref => {
//     return ref.where('status', '==', 'Done');
// });
  public selected = {
    id: null,
    taskName:"",
    taskDescription:"",
    taskStatus:"",
    taskStartDate:""
  }

  onDeleteTask(taskId:string): Promise<void>{
    return new Promise (async(resolve,reject)=>{
      try{
        const result = this.taskCollection.doc(taskId).delete();
        resolve(result);
      }catch(err){
        reject(err.message);
      }
    })


  }


  taskQuery(wantHistorical: Boolean): Observable<InterfaceTaskList[]>{
    if(wantHistorical == true){

      this.taskCollection = this.afs.collection<InterfaceTaskList>('tasks', ref => {
        return ref.where('taskStatus', '==', 'Finished');
      });
    }else{
      this.taskCollection = this.afs.collection<InterfaceTaskList>('tasks', ref => {
        return ref.where('taskStatus', '!=', 'Finished');
      });
    }
    return this.getTasks();
  }





   onSaveTask(task:InterfaceTaskList, taskId:string): Promise<void>{

    return new Promise (async(resolve,reject) => {
      try{
        const id = taskId || this.afs.createId();
        const data = {id, ...task};
        const result = this.taskCollection.doc(id).set(data);
        resolve(result);

      }catch(err){
        reject(err.message);
      }
    })

   }




  getTasks(){
    return this.taskCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as InterfaceTaskList))
    );

  }


}
