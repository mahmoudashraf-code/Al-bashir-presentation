import { Injectable } from '@angular/core';
import { iProject } from './iProject';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  setting: iSetting = {};
  project: iProject;
  constructor() {
    this.setting.theme = "blue";
  }
  getTheme(n: number) {
    return `var(--${this.setting.theme}-${n})`;
  }
}

export interface iSetting {
  theme?: string;
}