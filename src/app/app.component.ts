import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public app: AppService, private http: HttpClient) {
    this.http.post("http://alnafizah.com/Khalid_POS.com/V1/test/login.php", { user_name: "mahmoud", user_pass: "15452" }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    }).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }
}
