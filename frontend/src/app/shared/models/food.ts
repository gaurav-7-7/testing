export class Foods {
    id!:number;
    price!:number;
    name!:any;
    favorite:boolean=false;
    stars:number=0;
    tags?:string[];
    imageUrl!:string;
    cookTime!:String;
    origins!:string[]; 
}