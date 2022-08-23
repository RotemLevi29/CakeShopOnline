class CartModel {

    public id: string;
    public name: string;
    public categoryId: string;
    public price: number;
    // public stock?: number;
    public imageName: string;
    public category: {
        name: string;
    };
    public image: FileList;

    public static convertToFormData(cart: CartModel): FormData {
        const myFormData = new FormData();
        myFormData.append("name", cart.name);
        myFormData.append("category", cart.categoryId);
        myFormData.append("price", cart.price.toString());
        // myFormData.append("stock", cart.stock.toString());
        if(cart.image) myFormData.append("image", cart.image.item(0));
        return myFormData;
    }

}

export default CartModel;