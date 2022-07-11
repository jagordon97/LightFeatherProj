import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formfield',
  templateUrl: './formfield.component.html',
  styleUrls: ['./formfield.component.css']
})
export class FormfieldComponent implements OnInit {
  supervisors;
  form: FormGroup;
  showMsg: boolean = false;

  constructor(public fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      fname: ['',[
          Validators.required,
          Validators.pattern("^[a-zA-Z ]*$")
        ]
      ],
      lname: ['',[
          Validators.required,
          Validators.pattern("^[a-zA-Z ]*$")
        ]
      ],
      email: ['',[
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
        ]
      ],
      phone: ['',[
          Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")
        ]
      ],
      supervisor: ['', [
          Validators.required
        ]],
    });
  }

  ngOnInit(){
    this.http.get('http://localhost:8080/api/supervisors').subscribe(data => {
        this.supervisors = data;
        console.log(this.supervisors);
    });
  }

  submitForm(){
    var formData: any = new FormData();

    formData.append('fname', this.form.get('fname')?.value);
    formData.append('lname', this.form.get('lname')?.value);
    formData.append('email', this.form.get('email')?.value);
    formData.append('phone', this.form.get('phone')?.value);
    formData.append('supervisor', this.form.get('supervisor')?.value);

    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });



    this.http
      .post('http://localhost:8080/api/submit', object).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });

      this.showMsg= true;
  }

  hideMsg(){
    this.showMsg= false;

  }

}
