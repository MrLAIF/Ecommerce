import { useContext } from "react"
import Layout from "../../Components/Layout"
import Card from "../../Components/Card"
import ProductDetail from "../../Components/ProductDetail"
import React from "react"
import { ShoppingCartContext } from "../../Context"

function Home() {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if(context.filteredItems?.length > 0){
      return(
        context.filteredItems?.map(item => (
          <Card key={item.id} data={item} />
        ))
      )
    }else{
      return(
        <div>No Items Found</div>
      )
    }
    
  }

  return (
    <Layout>
      <div className="flex w-80 relative items-center justify-center mb-4">
          <h1 className="font-medium text-xl">Home</h1>
      </div>
      <input type="text" placeholder="Search a product" className="border border-black rounded-lg w-80 p-2 mb-4 focus:outline-none" 
        onChange={(event) => {
          context.setSearchByTitle(event.target.value)
        }}/>
      <div className="grid gap-2 grid-cols-4">
        {
          renderView()
        }
      </div>
      <ProductDetail />
    </Layout>
  )
}

export default Home

// useEffect(() => {
//   fetch("https://fakestoreapi.com/products")
//   .then(response => response.json())
//   .then(data => {setItems(data); 
//         console.log(data)})
// }, [])

// return (
//   <Layout>
//     Home
//     <div className="grid gap-2 grid-cols-4">
//       {
//         items?.map(item => (
//           <Card key={item.id} data={item} />
//         ))
//       }
//     </div>
//     <ProductDetail />
//   </Layout>
// )