import React from "react";
import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"
import { XMarkIcon } from "@heroicons/react/24/solid"
import "./Styles.css"

const ProductDetail = () => {
    const context = useContext(ShoppingCartContext)
    // console.log("kldja:", context.productShow)
    return(
        <aside className={`${context.isPDOpen ? "flex" : "hidden"} product-detail flex-col fixed right-0 border bg-white border-black rounded p-4 overflow-y-scroll`}>
            <div className="flex justify-between items-center p-4">
                <h2 className="font-medium text-xl">Detail</h2>
                <XMarkIcon className="h-6 w-6 text-black" onClick={() => {
                        context.closeProductDetail();
                    }}></XMarkIcon>
            </div>
            <figure>
                <img className="w-full h-full rounded-lg" src={context.productShow.images} alt="lol" />
            </figure>
            <p className="flex flex-col">
                <span className="font-medium">{`$${context.productShow.price}`}</span>
                <span className="font-medium">{context.productShow.title}</span>
                <span>{context.productShow.description}</span>
            </p>
        </aside>
    )
}

export default ProductDetail