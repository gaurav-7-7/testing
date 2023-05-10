import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FoodService } from '../services/food.service';
import { RatingModule } from 'ng-starrating';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges{
  tagName: any
  product: any
  search: any
  category: any
  load = true
  spin=false
  page: any;
  count: number = 0;
  tableSize: any = 12;
  constructor(private fs:FoodService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void { 
    this.route.queryParams.subscribe(params => {
      if(params['tag']) {
      this.tagName = params['tag'];
      this.fetchTag(this.tagName)
      } else if(params['search']) {
        this.search = params['search'];
        this.fetchSearch(this.search)
      }else {
        this.fetchProducts()
      }
    });
  }

  fetchTag(tagName: any) {
    this.spin=true
    this.fs.getFoodbyTag(tagName).subscribe((data: any)=>{
      this.spin=false
      this.product = data[0].fields.products
      this.category = data[1].fields
      console.log(this.product)
    })
  }

  fetchSearch(search: any) {
    this.spin = true
    this.fs.getFoodbySearch(search).subscribe((data: any)=>{
      this.spin=false
      this.product = data[0].fields.products
      this.category = data[1].fields
      console.log(this.product)
    })
  }

  fetchProducts() {
    this.spin=true
    this.fs.getAllFoods().subscribe((data: any)=>{
      this.spin=false
      this.product = data[0].fields.products
      this.category = data[1].fields
      console.log(this.product)
    })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.fetchProducts();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchProducts();
  }
  ngOnChanges(): void {
  }
}
