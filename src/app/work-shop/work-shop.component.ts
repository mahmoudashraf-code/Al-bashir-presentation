import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-work-shop',
  templateUrl: './work-shop.component.html',
  styleUrls: ['./work-shop.component.scss']
})
export class WorkShopComponent implements OnInit {
  constructor(public app: AppService) { }
  ngOnInit(): void {
    this.app.project = {
      select: 0,
      setting: {
        background: "white",
        color: "black"
      },
      slides: [
        {
          slide: [
            {
              "type": "list",
              "value": {
                "items": [
                  "bloger app",
                  "documentation app",
                  "posts app",
                  "protfile app",
                  "and others static web pages"
                ],
                "style": "circle"
              }
            },
            {
              type: "star"
            },
            {
              "type": "message",
              "value": {
                "severity": "info",
                "content": "/ka;lkj;lkjdk;ljd"
              }
            },
            {
              "type": "message",
              "value": {
                "severity": "info",
                "content": "/ka;lkj;lkjdk;ljd"
              }
            },
            {
              "type": "message",
              "value": {
                "severity": "info",
                "content": "/ka;lkj;lkjdk;ljd"
              }
            },
            {
              "type": "message",
              "value": {
                "severity": "info",
                "content": "/ka;lkj;lkjdk;ljd"
              }
            },
            {
              "type": "message",
              "value": {
                "severity": "info",
                "content": "/ka;lkj;lkjdk;ljd"
              }
            }
          ],
          temp: []
        },
        {
          slide: [],
          temp: []
        },
      ]
    }
  }

}
