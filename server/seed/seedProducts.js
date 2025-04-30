require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const menData = require("../data/MenProducts.json");
const womenData = require("../data/WomenCardsData.json");
const kidsData = require("../data/KidsProductsInfo.json");
const collaborationData = require("../data/CollaborationInfo.json");
const trendingData = require("../data/TrendingProducts.json");
const sportsData = require("../data/SportsData.json");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB...");
    seedProducts();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    console.log("Cleared existing products...");

    const cleanProductData = (product, category) => {
      let cleanedPrice = product.price;

      if (isNaN(cleanedPrice) || cleanedPrice <= 0) {
        console.error(
          `Invalid or non-positive price for product ${product.name}. Skipping product.`
        );
        cleanedPrice = 0;
      }

      // Store the price as a number in the DB, and add rupee symbol for display purposes
      const priceWithRupee = `₹${cleanedPrice}`;

      return {
        ...product,
        category: category || "uncategorized",
        price: cleanedPrice, // Store numeric value in the database
        displayPrice: priceWithRupee, // Add formatted price with symbol for display
      };
    };

    const menWithCategory = menData.map((product) => {
      const cleanedProduct = cleanProductData(product, "men");
      console.log("Cleaned Men Product:", cleanedProduct);
      return cleanedProduct;
    });
    const womenWithCategory = womenData.map((product) => {
      const cleanedProduct = cleanProductData(product, "women");
      console.log("Cleaned Women Product:", cleanedProduct);
      return cleanedProduct;
    });
    const kidsWithCategory = kidsData.map((product) => {
      const cleanedProduct = cleanProductData(product, "kids");
      console.log("Cleaned Kids Product:", cleanedProduct);
      return cleanedProduct;
    });
    const collaborationWithCategory = collaborationData.map((product) => {
      const cleanedProduct = cleanProductData(product, "collaboration");
      console.log("Cleaned Collaboration Product:", cleanedProduct);
      return cleanedProduct;
    });
    const trendingWithCategory = trendingData.map((product) => {
      const cleanedProduct = cleanProductData(product, "trending");
      console.log("Cleaned Trending Product:", cleanedProduct);
      return cleanedProduct;
    });
    const sportsWithCategory = sportsData.map((product) => {
      const cleanedProduct = cleanProductData(product, "sports");
      console.log("Cleaned Sports Product:", cleanedProduct);
      return cleanedProduct;
    });

    const allProducts = [
      ...menWithCategory,
      ...womenWithCategory,
      ...kidsWithCategory,
      ...collaborationWithCategory,
      ...trendingWithCategory,
      ...sportsWithCategory,
    ];

    await Product.insertMany(allProducts);
    console.log("Products seeded successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding products:", err);
    mongoose.connection.close();
  }
};
