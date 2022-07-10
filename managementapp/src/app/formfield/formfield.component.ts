import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formfield',
  templateUrl: './formfield.component.html',
  styleUrls: ['./formfield.component.css']
})
export class FormfieldComponent implements OnInit {
  supervisors;

  constructor(private http: HttpClient) { }


  ngOnInit() {
    this.http.get('http://localhost:8080/api/supervisors').subscribe(data => {
        this.supervisors = data;
        console.log(this.supervisors);
    })





  }

}
