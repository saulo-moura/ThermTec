import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  db: PouchDB.Database;
  remote: string;
  data: any;

  constructor() { 
    this.db = new PouchDB('thermtec_db');
    
    this.remote = "http://localhost:5984/thermtec_db";

    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    this.db.sync(this.remote, options)
  }

  getUsers() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.db.allDocs({ include_docs: true }).then((result) => {
        this.data = [];
        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });
        resolve(this.data);
        this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
          this.handleChange(change);
        });
      }).catch((error) => {
        console.log(error);
      }); 
    });
  }

  createUser(user){

  }

  updateUser(user){

  }

  deleteUser(user){

  }

  handleChange(change : any){
    console.log("mudou");
    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index) => {
      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }
    });
    // Documento apagado
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    } 
    else {
      // Documento atualizado
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      } 
      // Documento adicionado
      else {
        this.data.push(change.doc); 
      }
    }
  }

}
