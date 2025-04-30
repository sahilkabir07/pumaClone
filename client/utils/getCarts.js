import axios from "axios";

const getCart = async (token) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  try {
    const response = await axios.get(`${BASE_URL}api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const cart = response.data.cart;

    if (!cart) {
      throw new Error("Cart data is missing in the response.");
    }

    return cart;
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    throw error;
  }
};

export default getCart;
