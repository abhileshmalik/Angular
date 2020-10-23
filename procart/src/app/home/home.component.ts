import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('fd', { static: false }) searchForm: NgForm;
  searchedProd = '';

  constructor() { }

  ngOnInit() {
  }

  onSearchProd() {
    this.searchedProd = this.searchForm.value.searchedProd;
    console.log(this.searchedProd);
    
    this.searchForm.reset();
    
  }

}
