const getCart = async (token) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  try {
    const res = await fetch(`${BASE_URL}api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure token is sent in the headers
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch cart: " + res.statusText); // More specific error message
    }

    const data = await res.json();

    // Ensure 'cart' exists in the response before returning
    if (!data.cart) {
      throw new Error("Cart data is missing in the response.");
    }

    return data.cart; // Return the cart items
  } catch (error) {
    console.error("Error fetching cart:", error.message); // Log error
    throw error; // Propagate error to the calling function
  }
};

export default getCart;
