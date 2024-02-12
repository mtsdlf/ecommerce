import axios from "axios";
export const processPreferenceMP = async (cart) => {
    try {
      const response = await axios.post("http://localhost:3000/create_preference", {
        products: cart.map(product => ({
          title: product.title,
          quantity: product.quantity,
          price: product.price
        }))
      })
      const { id } = response.data
      return id;
    }
    catch (error) {
      console.log(error)
    }
  
  }