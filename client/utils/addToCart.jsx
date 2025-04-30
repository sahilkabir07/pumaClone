import axios from "axios";

const addToCart = async (token, product) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL

    if (!token) {
        throw new Error("User must be logged in to add items to the cart");
    }

    try {
        const payload = {
            productId: product.productId || product._id,
            name: product.name,
            img: product.img,
            price: product.price,
            quantity: product.quantity > 0 ? product.quantity : 1,
        };

        console.log("🚀 Payload for cart:", payload);

        const response = await axios.post(
            `${BASE_URL}api/cart/add`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("✅ Product added to cart successfully:", response.data);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred while adding to the cart";
        console.error("❌ Error adding to cart:", errorMessage);
        throw new Error(errorMessage);
    }
};

export default addToCart;
