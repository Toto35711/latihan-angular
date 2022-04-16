import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LocationService } from 'src/app/services/location.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css'],
})
export class DepartmentFormComponent implements OnInit {
  locations: any;
  department: any;
  managers: any;
  id: number = 0;
  form = new FormGroup({
    departmentID: new FormControl(0),
    departmentName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    locationID: new FormControl('', Validators.required),
    managerID: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
    private locationService: LocationService,
    private employeeService: EmployeeService
  ) {}

  /**
   * to shorthand the corresponding HTML code
   */
  get f() {
    return this.form.controls;
  }

  /**
   * assign the list of all records of locations into locations variable
   */
  findAllLocation() {
    this.locationService.getAllLocations().subscribe((res) => {
      this.locations = res.data;
    });
  }

  /**
   * assign the list of all records of managers into managers variable
   */
  findAllManager() {
    this.employeeService.getAllEmployees().subscribe((res) => {
      this.managers = res.data;
    });
  }

  ngOnInit(): void {
    this.locations = this.findAllLocation();
    this.managers = this.findAllManager();
    this.getDetail();
  }

  /**
   * this is a method to submit the form. If the current id is zero (meaning that we want to add a new record), it sends a post request. 
   * Otherwise, it sends a put request.
   */
  submit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);

    if (this.id == 0) {
      this.departmentService.postDepartment(this.form.value).subscribe({
        next: (data: any) => {
          Swal.fire({
            icon: 'success',
            title: 'the new record has been saved',
            showConfirmButton: true,
            confirmButtonText: 'OK',
          }).then((result: any) => {
            this.onReset();
            this.router.navigate(['/departments']);
          });
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Could not add the new record!',
          });
        },
      });
    } else {
      this.departmentService.putDepartment(this.form.value).subscribe({
        next: (data: any) => {
          Swal.fire({
            icon: 'success',
            title: 'the record has been updated',
            showConfirmButton: true,
            confirmButtonText: 'OK',
          }).then((result: any) => {
            this.onReset();
            this.router.navigate(['/departments']);
          });
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Could not update the record!',
          });
        },
      });
    }
  }

  /**
   * this is a method to reset the form fields
   */
  onReset() {
    this.form.reset();
  }

  /**
   * this is a method to get all necessary informations of a record that we need to update and then call the bindForm method
   */
  getDetail() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id !== 0) {
      this.departmentService.getDepartmentByID(this.id).subscribe((res) => {
        this.department = res.data;
        this.bindForm(res.data);
      });
    }
  }

  /**
   * this is a method to fill the update form
   */
  bindForm(data: any) {
    this.f['departmentID'].patchValue(data.departmentID);
    this.f['departmentName'].patchValue(data.departmentName);
    this.f['locationID'].patchValue(data.locationID);
    this.f['managerID'].patchValue(data.managerID);
  }
}
