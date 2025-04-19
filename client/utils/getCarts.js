import axios from "axios";

const getCart = async (token) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  try {
    const res = await axios.get(`${BASE_URL}api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data;

    if (!data.cart) {
      throw new Error("Cart data is missing in the response.");
    }

    return data.cart;
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    throw error;
  }
};

export default getCart;
