import { Socket, io } from 'socket.io-client';
// import ProductModel from '../Models/ProductModel';
// import { addProductAction, deleteProductAction, updateProductAction } from '../Redux/ProductsState';
// import productsStore from '../Redux/Store';
import { environment } from 'src/environments/environment';
import ProductModel from '../models/product.model';
// import ProductModel from '../models/product.model';
import { productAddedAction, productDeletedAction, productsDownloadedAction, productUpdatedAction } from '../redux/products-state';
import store from '../redux/store';



class SocketIoService {

    private socket: Socket;

    public connect(): void {

        // Connect to socket server: 
        this.socket = io(environment.socketServer);
        console.log("Socket - socket is connected")

        // if i'm an admin - return here
        // If(isAdmin()) return;

        // Listen to adding a product by admin:
        this.socket.on("admin-add-product", (product: ProductModel) => {
            // productsStore.dispatch(addProductAction(product));
            console.log("Socket - admin-add-product - the product:", product)
            console.log("Socket - admin-add-product")
            store.dispatch(productAddedAction(product));
            
        });
        
        // Listen to updating a product by admin:
        this.socket.on("admin-update-product", (product: ProductModel) => {
            // productsStore.dispatch(updateProductAction(product));
            console.log("Socket - admin-update-product - the product:", product)
            console.log("Socket - admin-update-product")
            store.dispatch(productUpdatedAction(product));
            
        });
        
        // Listen to deleting a product by admin:
        this.socket.on("admin-delete-product", (id: string) => {
            // productsStore.dispatch(deleteProductAction(id));
            console.log("Socket - admin-delete-product - product id:", id)
            console.log("Socket - admin-delete-product")
            store.dispatch(productDeletedAction(id));
            
        });
    }

    public disconnect(): void {
        console.log("Socket - socket is disconnected")

        this.socket.disconnect();
    }
}

const socketIoService = new SocketIoService();

export default socketIoService;