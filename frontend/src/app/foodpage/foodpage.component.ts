import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { Foods } from '../shared/models/food';

@Component({
  selector: 'app-foodpage',
  templateUrl: './foodpage.component.html',
  styleUrls: ['./foodpage.component.css']
})
export class FoodpageComponent implements OnInit{
  food!:any
  param!:number;
  imageCount:number=0;
  spin: boolean =false
  @ViewChild('img', {read: ElementRef}) childElement!: ElementRef<HTMLElement>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fs: FoodService ){
      this.activatedRoute.params.subscribe((params)=>{
        if(params['id']){
        this.param = params['id']
        console.log(this.param)
        }
      })
    }
  ngOnInit(): void {
    this.spin= true
    this.fs.getFoodById(this.param).subscribe(data=>{
      this.spin= false
      this.food = data
      this.imageCount = data.images.length
      console.log(this.imageCount)
    })
  }

  addItem(food: any) {
    console.log(food)
    let obj = {
      id: food.id,
      item: food
    }
    this.fs.saveToCart(obj).subscribe(response=>{
      console.log('gfds')
    })
    this.gotoList();
  }

  gotoList() {
    // this.router.navigate(['/cart']);
  }

}
