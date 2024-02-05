import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const initializeLocalStorage = () => {
    const accountInLocalStorage = localStorage.getItem("account");
    const signOutInLocalStorage = localStorage.getItem("sign-out");
    let parsedAccount;
    let parsedSignOut;

    if(!accountInLocalStorage){
        localStorage.setItem("account", JSON.stringify({}));
        parsedAccount = {};
    } else {
        parsedAccount = JSON.parse(accountInLocalStorage);
    }

    if(!signOutInLocalStorage){
        localStorage.setItem("sign-out", JSON.stringify(false));
        parsedSignOut = false;
    } else {
        parsedSignOut = JSON.parse(signOutInLocalStorage);
    }
}

export const ShoppingCartProvider = ({children}) => {
    const [account, setAccount] = useState({});

    const [signOut, setSignOut] = useState(false);



    const [count, setCount] = useState(0);

    //IsProductDetailOpen ??
    //Checks product detail sidebar state
    const [isPDOpen, setisPDOpen] = useState(false);
    const openProductDetail = () => setisPDOpen(true);
    const closeProductDetail = () => setisPDOpen(false);

    //Show the info of selected product in sidebar
    const [productShow, setProductShow] = useState({});

    //Shopoping cart . Add procuts to cart
    const [cartProducts, setCartProducts] = useState([]);


    const [isCheckoutSideMenu, setisCheckoutSideMenu] = useState(false);
    const openCheckoutSideMenu = () => setisCheckoutSideMenu(true);
    const closeCheckoutSideMenu = () => setisCheckoutSideMenu(false);

    //Shopping cart . Order
    const [order, setOrder] = useState([]);

    //fetch data from Platzi fake API
    const [items, setItems] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);

    useEffect(() => {
      fetch("https://api.escuelajs.co/api/v1/products")
      .then(response => response.json())
      .then(data => {setItems(data)})
    }, [])

    
    //Get products by title
    const [searchByTitle, setSearchByTitle] = useState(null);

    const filteredItemsByTitle = (items, searchByTitle) =>{
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    //Get products by category
    const [searchByCategory, setSearchByCategory] = useState(null);
    
    const filteredItemsByCategory = (items, searchByCategory) =>{
        return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    }
    
    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if(searchType === "BY_TITLE"){
            return filteredItemsByTitle(items, searchByTitle)
        }

        if(searchType === "BY_CATEGORY"){
            return filteredItemsByCategory(items, searchByCategory)
        }

        if(searchType === "BY_TITLE_AND_CATEGORY"){
            return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }

        if(!searchType){
            return items;
        }

    }

    useEffect(() => {
        if(searchByTitle && searchByCategory) setFilteredItems(filterBy("BY_TITLE_AND_CATEGORY", items, searchByTitle, searchByCategory))
        if(searchByTitle && !searchByCategory) setFilteredItems(filterBy("BY_TITLE",items, searchByTitle, searchByCategory))
        if(!searchByTitle && searchByCategory) setFilteredItems(filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory))
        if(!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
        
    }, [items, searchByTitle, searchByCategory]);
    
    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            isPDOpen,
            openProductDetail,
            closeProductDetail,
            productShow,
            setProductShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenu,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            searchByCategory,
            setSearchByCategory,
            account,
            setAccount,
            signOut,
            setSignOut,
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}