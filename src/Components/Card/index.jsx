import { useContext } from "react"
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { CheckIcon } from "@heroicons/react/24/solid"
import { ShoppingCartContext } from "../../Context"


const Card = (data) => {
    const context = useContext(ShoppingCartContext)

    const showProduct = (productDetail) => {
        context.openProductDetail();
        context.setProductShow(productDetail);
    }

    const addProductsToCart = (event, productData) => {
        event.stopPropagation();
        context.setCount(context.count + 1);
        context.setCartProducts([...context.cartProducts, productData]);
        context.closeProductDetail();
        context.openCheckoutSideMenu();
    }

    const renderIcon = (id) =>{
        const isInCart = context.cartProducts.filter(product => product.id === id).length > 0;

        if (isInCart){
            return (
                <div className="absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1" >
                    <CheckIcon className="h-6 w-6 text-white"></CheckIcon>
                </div>
            )
        } else {
            return (
                <div 
                    className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1" 
                    onClick={(event)=>{
                    addProductsToCart(event, data.data)}}>
                    <PlusIcon className="h-6 w-6 text-black"></PlusIcon>
                </div>
            )
        }
    }

    return (
        <div 
        className="bg-gray-100 cursor-pointer w-[180px] h-[240px] rounded-lg mt-4 mb-4 p-2"
        onClick={() =>{
            showProduct(data.data);
        }}>
            <figure className="relative mb-4 w-full h-4/5 flex items-center">
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-2.5 py-0.5">{data.data.category.name}</span>
                <img className="w-full object-cover rounded-lg" src={data.data.images[0]} alt="headphones" />
                {renderIcon(data.data.id)}
            </figure>
            <p className="flex justify-between">
                <span className="text-xs font-light">{data.data.title}</span>
                <span className="text-sm font-medium">${data.data.price}</span>
            </p>
        </div>
    )
}

export default Card