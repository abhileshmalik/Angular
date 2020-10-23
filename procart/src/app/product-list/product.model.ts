
export class Product {
    public id: number;
    public category: string;
    public name: string;
    public description: string;
    public imagePath: string;
    public price: number;
  
    constructor(
        id: number,
        category: string,
        name: string,
        description: string,
        imagePath: string,
        price: number) {
            
        this.id = id;
        this.category = category;
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.price = price;
    }
}