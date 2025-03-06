import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _idUserEventEmitter: EventEmitter<number> = new EventEmitter()

  private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  private _findUserByIdEventEmitter: EventEmitter<number> = new EventEmitter();

  private _selectUserByIdEventEmitter: EventEmitter<number> = new EventEmitter();

  constructor() { }

  get idUserEventEmitter(): EventEmitter<number>{
    return this._idUserEventEmitter;
  }

  get newUserEventEmitter(): EventEmitter<User>{
    return this._newUserEventEmitter;
  }

  get findUserByIdEventEmitter(): EventEmitter<number>{
    return this._findUserByIdEventEmitter;
  }

  get selectUserByIdEventEmitter(): EventEmitter<number>{
    return this._selectUserByIdEventEmitter;
  }
}
