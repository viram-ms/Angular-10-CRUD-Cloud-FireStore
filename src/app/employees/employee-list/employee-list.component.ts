import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  list: Employee[];
  constructor(private employeeService: EmployeeService, private firestore: AngularFirestore, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
          } as Employee;
      })
    });
  }

  onEdit(emp: Employee){
    this.employeeService.formData = Object.assign({},emp);
  }

  onDelete(id: string){
    if(confirm('Are you sure to delete the record')){
      this.firestore.doc('employees/'+id).delete();
      this.toaster.warning('Deleted successfully', 'Emp. Register');
    }
  }

}
