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
    this.getTasks();
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

  private getTasks(): void{
    this.tasks = this.taskCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as InterfaceTaskList))
    );
  }


}
