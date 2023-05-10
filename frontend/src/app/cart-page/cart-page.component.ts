import { Component, OnChanges, OnInit } from '@angular/core'; 
import { Cart } from '../shared/models/Cart'
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{

constructor(private cart: CartService){}

cartItem!: any
cartLength:number = 0

ngOnInit() {
  this.cart.getCartItems().subscribe(data=>{
    this.cartLength = data.response.length
    this.cartItem = data.response
    this.cartItem = this.cartItem.map((data: any)=>{
      data.item = JSON.parse(data.item)
      return data
    })
    console.log(this.cartItem)
  }) 
}
  
}
