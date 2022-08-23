class OrderModel {

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

    public static convertToFormData(order: OrderModel): FormData {
        const myFormData = new FormData();
        myFormData.append("name", order.name);
        myFormData.append("category", order.categoryId);
        myFormData.append("price", order.price.toString());
        // myFormData.append("stock", order.stock.toString());
        if(order.image) myFormData.append("image", order.image.item(0));
        return myFormData;
    }

}

export default OrderModel;