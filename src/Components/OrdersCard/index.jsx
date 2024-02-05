import { ChevronRightIcon } from "@heroicons/react/24/solid"

const OrdersCard = (props) => {
    const { totalPrice, totalProducts} = props;

    return(
        <div className="flex justify-between items-center mb-3 border border-black rounded-lg p-4 w-80">
            <div className="flex justify-between w-full">
                <p className="flex flex-col items-center">
                    <span className="font-light">01.02.2023</span>
                    <span className="font-light">{totalProducts} Articles</span>
                </p>
                <p className="flex items-center">
                    <span className="font-medium text-2xl">${totalPrice}</span>
                    <ChevronRightIcon className="h-6 w-6 text-black"></ChevronRightIcon>
                </p>
            </div>
        </div>
    )
}

export default OrdersCard