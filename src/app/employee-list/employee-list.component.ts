import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Http, RequestOptions, Headers, Response } from '@angular/http';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees = [];
  postData : string;
 

  constructor(private _employeeService: EmployeeService, private http : Http) {
    
   }

  ngOnInit() {
    this._employeeService.getEmployees()
    .subscribe(resEmployeeData => this.employees = resEmployeeData);
  }

  onSubmit(value : any){
    console.log(value);
    let body = JSON.stringify({ value });
    console.log(body);
    var headers = new Headers();
  let options = new RequestOptions({ headers: headers });
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  this.http.post('http://zingotesting.azurewebsites.net/api/Cities/AddCity', value, options)
           .map((res: Response) => res.json())
           .subscribe();
    

  }

  onTestPost(){
    this._employeeService.postJSON().subscribe(
      data => this.postData = JSON.stringify(data),
      error => alert(error),
      () => console.log("Finished")
    );
  }
  

}
