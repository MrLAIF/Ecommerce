import { useContext } from "react"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"
import { ShoppingCartContext } from "../../Context"
import OrderCard from "../OrderCard"
import {totalPrice} from "../../utils"
import "./Styles.css"

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext)
    // console.log("Cart: ", context.cartProducts);
    // console.log("kldja:", context.productShow);

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(product => product.id != id)
        context.setCartProducts(filteredProducts);
    }

    const handleCheckout = () => {
        const orderToAdd = {
            date: "01.02.2023",
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts),
        }

        context.setOrder([...context.order, orderToAdd]);
        context.setCartProducts([]);
        context.setSearchByTitle(null);
    }


    return(
        <aside className={`${context.isCheckoutSideMenu ? "flex" : "hidden"} CheckoutSideMenu flex-col fixed right-0 border bg-white border-black rounded`}>
            <div className="flex justify-between items-center p-4">
                <h2 className="font-medium text-xl">Detail</h2>
                <XMarkIcon className="h-6 w-6 text-black" onClick={() => {
                        context.closeCheckoutSideMenu();
                    }}></XMarkIcon>
            </div>
            <div className="px-6 overflow-y-scroll flex-1">
                {
                    context.cartProducts.map(product=>(
                        <OrderCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            img={product.images}
                            price={product.price}
                            handleDelete = {handleDelete}
                        />
                    ))
                }
            </div>

            <div className="px-6">
                <p className="flex justify-between items-center">
                    <span className="font-light">Total</span>
                    <span className="font-medium text-2xl">${totalPrice(context.cartProducts)}</span>
                </p>
                <Link to="/my-orders/last">
                    <button className="w-full bg-green-400 py-3 my-3 text-white rounded-lg" onClick={() => handleCheckout()}>Checkout</button>
                </Link>
            </div>
        </aside>
    )
}

export default CheckoutSideMenu