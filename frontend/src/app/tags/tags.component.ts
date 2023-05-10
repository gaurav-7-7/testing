import { Component, Input, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';
import { Router } from '@angular/router';
import { Tag } from '../shared/models/tag';
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit{
  product: any
  tags: any = {}
  tagKeys:any
  @Input() category: any
  @Input() foodPagetags?:string[];
  @Input() justifyContent:string = 'center';

  constructor(private fs: FoodService, private router: Router) { }

  ngOnChanges(): void {
    if(this.category) {
      this.tagKeys = this.category
    }
  }

  getTag(tag: any) {
    this.router.navigate(['/home'], { queryParams: { tag:tag } });
  }

  ngOnInit(): void {
  }

}
