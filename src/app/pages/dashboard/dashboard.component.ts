import { Component, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { Users } from '../../modal/users';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/services/users/users.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['selectAll', 'username', 'email', 'phone', 'option'];
  @ViewChild('table', { static: true }) table!: MatTable<Users>;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Users>(true, []);
  selectedData: boolean = true;
  dataSource: any;
  dragDisabled = true;


  constructor(private _toster: ToastrService, private cdr: ChangeDetectorRef, public dialog: MatDialog, private userService: UsersService) { }

  ngOnInit() {
    this.displayTableData()
  }


  /*** @description call API  */

  displayTableData() {
    this.userService.getUsers().subscribe((res: any) => {
      this.dataSource = res;
      this.dataSource.sort = this.sort;
    });
  }


  /*** @description  Drag container to disabled.  */

  drop(event: CdkDragDrop<any>) {
    this.dragDisabled = true;
    const index4 = this.dataSource
    const previousIndex = index4.findIndex((d: any) => d === event.item.data);
    moveItemInArray(this.dataSource, previousIndex, event.currentIndex);
    this.table.renderRows();
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /*** @description Remove All Data  */

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      for (let index = 0; index < this.dataSource.length; index++) {
        const element = this.dataSource[index];
        this.dataSource.splice(element, 1);
      }
    });
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.dataSource = new MatTableDataSource<Users>(this.dataSource);
          this._toster.success('', 'Delete Successfully', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'decreasing',
            positionClass: 'toast-bottom-right'
          })
        }
      });

    this.selection = new SelectionModel<Users>(true, []);
  }

  masterToggle() {
    this.selectedData = false;
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach((row: any) => this.selection.select(row));
  }


  /*** @description Remove Single Data Row  */

  removeRow(id: any) {

    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.userService.deleteUser(id).subscribe(() => {
            this.dataSource = this.dataSource.filter(
              (u: Users) => u.id !== id);
            this._toster.success('', 'Delete Successfully', {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'decreasing',
              positionClass: 'toast-bottom-right'
            })
            this.selectedData = false;

          });
        }
      });
  }

  removeSelectedRowss() {

    const users = this.dataSource.filter((u: Users) => u.isSelected);
    console.log('removeAllSelectedRows', users);
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.userService.deleteUsers(users).subscribe(() => {
            this.dataSource = this.dataSource.filter(
              (u: Users) => !u.isSelected
            );
            this._toster.success('', 'Delete Successfully', {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'decreasing',
              positionClass: 'toast-bottom-right'
            })
            this.selectedData = false;

          });
        }
      });
  }

  selectAll(event: any) {
    if (event.checked === true) {
      this.selectedData = false;
      this.dataSource = this.dataSource.map((item: any) => ({
        ...item,
        isSelected: event.checked,
      }));
    }

  }


}


