import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  departments: any; // to store list of all departments we want to show
  searchKey: string = ''; // the search key for searchByDepartmentByName method

  constructor(
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  /**
 * get called everytime the users change the input value in the search bar
 */
   InputChanged() {
    this.searchDepartmentByName();
  }

  /**
   * This is a method to search records by department Name. The search key is (two-way) binded with the value of the search bar
   */
  searchDepartmentByName(){
    this.departmentService.getDepartmentByName(this.searchKey).subscribe({
      next:(data:any)=>{
        if(data.data.length==0){
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: 'The search key was not found in any record!',
          });
        }
        this.departments = data.data;
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Could not load records!',
        });
      },
    });
  }

  ngOnInit(): void {
    // after ngOnInit get called, we load all department records to be shown in the table
    this.departmentService.getAllDepartment().subscribe({
      next:(data:any)=>{
        this.departments = data.data;
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Could not load records!',
        });
      },
    });
  }
  

/**
 * This is a method to show a delete confirmation dialog and call the delete method if the user has positive confirmation
 * @param departmentID this is the ID of a record that we want to delete 
 */
  deleteConfirmation(departmentID: number) {
    Swal.fire({
      title: 'Are you sure want to remove the record?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.delete(departmentID);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your record is safe :)', 'error');
      }
    });
  }

  /**
   * This method sends the delete request
   * @param departmentID this is the ID of a record that we want to delete
   */
  delete(departmentID: number) {
    this.departmentService.deleteDepartment(departmentID).subscribe({
      next: (data) => {
        Swal.fire('Deleted!', 'Your record has been deleted.', 'success').then(
          (reason: any) => {
            this.departments=data.data;
            // the delete response contains a new list of all records that we will use to fill the table
          }
        );
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Could not delete the record!',
        });
      },
    });
  }
}
