import { Component, Input, OnInit } from '@angular/core';
import { iSlide } from 'src/app/iProject';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input("dev") dev: boolean;
  @Input("data") slide: iSlide;
  constructor() { }

  ngOnInit(): void {

  }

}
