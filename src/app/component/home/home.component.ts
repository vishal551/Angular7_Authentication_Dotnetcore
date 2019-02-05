import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  HostListener
} from "@angular/core";
import { Employee } from "src/app/CustomClass/Employee";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { CityService } from "src/app/services/city.service";
import { EmployeeService } from "src/app/services/employee.service";

import {
  ModalDirective,
  MdbTableDirective,
  MdbTablePaginationComponent,
  MdbTableService
} from "angular-bootstrap-md";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  @ViewChild("basicModal") basicModal: ModalDirective;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent)
  mdbPagination: MdbTablePaginationComponent;
  @ViewChild("row") row: ElementRef;
  elements: any = [];
  headElements = ["Name", "Mobile", "Gender", "Action"];

  searchText: string = "";
  previous: string;

  firstItemIndex;
  lastItemIndex;
  listCity: any;
  employee = new Employee();
  myEmployeeForm: FormGroup;

  constructor(
    private cityService: CityService,
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private tableService: MdbTableService,
    private cdRef: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.GetCityList();
    this.myEmployeeForm = new FormGroup({
      Name: new FormControl("", Validators.required),
      ID_City: new FormControl("", Validators.required),
      Mobile: new FormControl("", Validators.required),
      Gender: new FormControl("", Validators.required)
    });
    // for (let i = 1; i <= 20; i++) {
    //   debugger;
    //   this.elements.push({
    //     id: i.toString(),
    //     first: "vishal " + i,
    //     last: "patel " + i,
    //     handle: "data " + i
    //   });
    // }
    debugger;
    this.GetEmployeeList();
  }
  @HostListener("input") oninput() {
    this.mdbPagination.searchText = this.searchText;
  }
  GetEmployeeList() {
    this.employeeService.getAllEmployee().subscribe(res => {
      if (res) {
        this.elements = res;
        this.tableService.setDataSource(this.elements);
        this.elements = this.tableService.getDataSource();
        this.previous = this.tableService.getDataSource();
      }
    });
  }
  ngAfterViewInit() {
    this.mdbPagination.setMaxVisibleItemsNumberTo(4);
    this.firstItemIndex = this.mdbPagination.firstItemIndex;
    this.lastItemIndex = this.mdbPagination.lastItemIndex;

    this.mdbPagination.calculateFirstItemIndex();
    this.mdbPagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  addNewRow() {
    // tslint:disable-next-line:max-line-length
    this.tableService.addRow({
      id: this.elements.length.toString(),
      first: "Wpis " + this.elements.length,
      last: "Last " + this.elements.length,
      handle: "Handle " + this.elements.length
    });
    this.emitDataSourceChange();
  }

  removeRow() {
    this.tableService.removeRow(1);
    this.tableService.getDataSource().forEach((el, index) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
    this.tableService.rowRemoved().subscribe(data => {
      console.log(data);
    });
  }

  emitDataSourceChange() {
    this.tableService.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }

  onNextPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  searchItems() {
    debugger;
    const prev = this.tableService.getDataSource();

    if (!this.searchText) {
      this.tableService.setDataSource(this.previous);
      this.elements = this.tableService.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.tableService.searchLocalDataBy(this.searchText);
      this.tableService.setDataSource(prev);
    }

    this.mdbPagination.calculateFirstItemIndex();
    this.mdbPagination.calculateLastItemIndex();

    this.tableService
      .searchDataObservable(this.searchText)
      .subscribe((data: any) => {
        if (data.length === 0) {
          this.firstItemIndex = 0;
        }
      });
  }
  GetCityList() {
    this.cityService.GetCityList().subscribe(
      result => {
        this.listCity = result;
      },
      error => {
        console.log(error);
      }
    );
  }
  AddEmployee(employee: Employee) {
    // debugger;
    if (!employee.Id) this.InsertEmployee(employee);
    else this.updateEmployee(employee);
  }
  updateEmployee(emp: Employee) {
    this.employeeService.updateEmployee(emp).subscribe(res => {
      if (res) {
        this.toastr.success("Employee updated successfully", "Employee Report");
        this.basicModal.hide();
        this.myEmployeeForm.reset();
        this.GetEmployeeList();
      }
    });
  }
  InsertEmployee(emp: Employee) {
    this.employeeService.AddEmployee(emp).subscribe(res => {
      if (res) {
        this.toastr.success(
          "Employee inserted successfully",
          "Employee Report"
        );
        this.basicModal.hide();
        this.myEmployeeForm.reset();
        this.GetEmployeeList();
      }
    });
  }
  DeleteEmployee(Id: number) {
    if (confirm("Are you sure you want to delete this?")) {
      this.employeeService.deleteEmployee(Id).subscribe(res => {
        if ((res = "true")) {
          this.GetEmployeeList();
          this.toastr.warning(
            "Employee Deleted successfully",
            "Employee report"
          );
        }
      });
    }
  }
  GetEmployeeReportbyId(emp: Employee) {
    this.employee = emp;
    this.basicModal.show();
  }
}
