import { Injectable } from '@angular/core';
import { T } from '@angular/core/src/render3';

const ls = localStorage;

@Injectable()
export class LocalStorageService {
  constructor() { }

  public get<T>(key: string): any {
    console.log("localStorage:get(key):",key,JSON.parse(ls.getItem(key)) as T)
    return JSON.parse(ls.getItem(key)) as T;
  }

  public getList<T>(key: string) {
    const before = ls.getItem(key);
    return before ? (JSON.parse(before) as T[]) : [];
  }

  public set(key: string, value: any): void {
    if (!value && value === undefined) { return; }
    const arr = JSON.stringify(value);
    ls.setItem(key, arr);
  }
}
