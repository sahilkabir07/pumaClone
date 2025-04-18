import { useState, useEffect } from "react";

const useLikes = () => {
    const userEmail = localStorage.getItem("userEmail"); // get current user
    const storageKey = `likedProducts_${userEmail}`;

    const [likedItems, setLikedItems] = useState(() => {
        const storedLikes = localStorage.getItem(storageKey);
        return storedLikes ? JSON.parse(storedLikes) : {};
    });

    useEffect(() => {
        if (userEmail) {
            localStorage.setItem(storageKey, JSON.stringify(likedItems));
        }
    }, [likedItems, storageKey]);

    const toggleLike = (item) => {
        setLikedItems((prevLikes) => {
            const updatedLikes = { ...prevLikes };
            if (updatedLikes[item.id]) {
                delete updatedLikes[item.id];
            } else {
                updatedLikes[item.id] = item;
            }
            return updatedLikes;
        });
    };

    return { likedItems, toggleLike };
};

export default useLikes;
