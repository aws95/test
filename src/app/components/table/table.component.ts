import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DataService } from "../../services/data.service";



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  tasks: any;
  allTasks: any;
  paginator = [];

  constructor(public API: DataService) { }

  ngOnInit(): void {
    this.API.GetData().subscribe(load => {
      this.tasks = load;
      this.allTasks = load;
      for (let i = 1; i <= this.tasks.length / 10; i++) {
        this.paginator.push(i);
      }
      this.tasks = this.tasks.slice(0, 10);
    });
  }

  paginate(p) {
    let start = p * 10 - 10;
    let end = start + 10;
    this.tasks = this.allTasks.slice(start, end);
  }

  previous(p) {
    if (p != 1) {
      this.paginate((p-1)/10);
    }
  }

  next(p) {
    if (p != 191) {
      this.paginate((p-1)/10+1 + 1);
    }
  }

}

