import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCartPlus, FaRegHeart, FaHeart, FaThumbsUp } from "react-icons/fa";
import useLikes from "../Liked/Liked";
import addToCartAPI from "../../../utils/addToCart";

const SportsCards = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { likedItems, toggleLike } = useLikes();
    const [addedToCart, setAddedToCart] = useState({});
    const [sportsData, setSportsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSportsProducts = async () => {
            try {
                const res = await axios.get(`${BASE_URL}api/products/sports`);
                console.log("Fetched sports products:", res.data);
                setSportsData(res.data);
            } catch (err) {
                console.error("Error fetching sports products:", err);
                setError("Error fetching sports products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSportsProducts();
    }, []);

    const handleAddToCart = async (item) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to add items to the cart.");
            return;
        }

        const payload = {
            productId: item._id,
            name: item.name,
            img: item.img,
            price: item.price,
            quantity: 1,
        };

        console.log("Payload for adding to cart:", payload);

        try {
            await addToCartAPI(token, payload);
            setAddedToCart((prev) => ({ ...prev, [item._id]: true }));

            setTimeout(() => {
                setAddedToCart((prev) => ({ ...prev, [item._id]: false }));
            }, 3000);
        } catch (err) {
            alert("Failed to add to cart. Try again.");
            console.error("Error adding to cart:", err);
        }
    };

    const formatPrice = (price) => `₹${price.toLocaleString()}`;

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-10">
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 p-2 bg-blue-500 text-white rounded-md"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="ml-12 h-40 flex-col flex justify-center">
                <p className="mt-10 text-4xl font-bold hover:bg-gradient-to-r hover:from-green-500 hover:to-pink-800 hover:text-transparent hover:bg-clip-text">
                    SPORTS
                </p>
                <p className="font-bold text-xl mt-10 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-blue-500 hover:text-transparent hover:bg-clip-text">
                    {sportsData.length} Products
                </p>
            </div>
            <div className="flex">
                <div className="flex-wrap gap-4 p-4 flex items-center justify-center">
                    {sportsData.map((item) => (
                        <div
                            className="w-[250px] bg-white shadow-md rounded-lg p-4 flex flex-col transform transition-transform duration-300 hover:scale-110"
                            key={item._id}
                        >
                            <div className="text-center">
                                <img
                                    src={item.img}
                                    className="w-full h-48 object-cover rounded-md mt-2"
                                    alt={item.name}
                                />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-gray-800 font-semibold">{formatPrice(item.price)}</p>
                                    <div className="flex gap-3 items-center">
                                        <button
                                            className={`p-2 rounded-md flex items-center justify-center transition-all ${addedToCart[item._id]
                                                ? "bg-green-500 text-white"
                                                : "hover:text-red-500"
                                                }`}
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            {addedToCart[item._id] ? (
                                                <FaThumbsUp />
                                            ) : (
                                                <FaCartPlus />
                                            )}
                                        </button>
                                        <button
                                            className="p-2 rounded-md flex items-center justify-center"
                                            onClick={() => toggleLike(item)}
                                        >
                                            {likedItems[item._id] ? (
                                                <FaHeart className="text-red-500" />
                                            ) : (
                                                <FaRegHeart className="text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SportsCards;
