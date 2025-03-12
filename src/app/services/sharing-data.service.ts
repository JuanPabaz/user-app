import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _idUserEventEmitter: EventEmitter<number> = new EventEmitter()

  private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  private _findUserByIdEventEmitter: EventEmitter<number> = new EventEmitter();

  private _selectUserByIdEventEmitter: EventEmitter<User> = new EventEmitter();
  
  private _errorsUserFormEventEmitter = new EventEmitter();

  private _paginatorEventEmitter = new EventEmitter();

  private _loginHandlerEventEmitter = new EventEmitter();

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

  get selectUserByIdEventEmitter(): EventEmitter<User>{
    return this._selectUserByIdEventEmitter;
  }

  get errorsUserFormEventEmitter(): EventEmitter<User>{
    return this._errorsUserFormEventEmitter;
  }

  get paginatorEventEmitter(): EventEmitter<any>{
    return this._paginatorEventEmitter;
  }

  get loginHandlerEventEmitter(): EventEmitter<any>{
    return this._loginHandlerEventEmitter;
  }
}
