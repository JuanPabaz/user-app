import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _idUserEventEmitter: EventEmitter<number> = new EventEmitter()
  
  private _selectedUserEventEmitter: EventEmitter<User>= new EventEmitter()

  private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  constructor() { }

  get idUserEventEmitter(): EventEmitter<number>{
    return this._idUserEventEmitter;
  }

  get selectedUserEventEmitter(): EventEmitter<User>{
    return this._selectedUserEventEmitter;
  }

  get newUserEventEmitter(): EventEmitter<User>{
    return this._newUserEventEmitter;
  }
}
