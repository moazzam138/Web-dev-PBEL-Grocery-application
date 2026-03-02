import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

// Place order: /api/order/place
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address, paymentType, amount } = req.body;

    console.log("=== ORDER REQUEST ===");
    console.log("userId:", userId);
    console.log("items count:", items?.length);
    console.log("items:", JSON.stringify(items, null, 2));
    console.log("address:", JSON.stringify(address, null, 2));
    console.log("paymentType:", paymentType);
    console.log("amount:", amount);
    console.log("====================");

    // Validate request
    if (!address || !items || items.length === 0 || !amount) {
      console.log("Validation failed");
      return res
        .status(400)
        .json({ message: "Invalid order details", success: false });
    }

    // Convert items to proper format and validate
    const orderItems = [];
    let calculatedAmount = 0;

    console.log("Processing items...");
    for (const item of items) {
      console.log(`Processing item: ${item._id}, qty: ${item.quantity}`);
      
      let product = null;
      try {
        // Try to find product in database (only works if ID is a valid ObjectId)
        product = await Product.findById(item._id);
      } catch (err) {
        // Product ID is not a valid ObjectId (likely a dummy product), skip DB lookup
        console.log(`Item ${item._id} is not a valid ObjectId, using client data`);
      }
      
      // Use database product if found, otherwise use client data
      const price = product?.offerPrice || item.offerPrice || item.price || 0;
      const qty = item.quantity || 1;
      const itemPrice = price * qty;
      calculatedAmount += itemPrice;

      // Always store product details for order display (exclude large image array)
      const productDetails = {
        _id: item._id,
        name: product?.name || item.name || "Unknown",
        category: product?.category || item.category || "Unknown",
        image: (item.image && Array.isArray(item.image)) ? [item.image[0]] : [], // Only store first image
      };

      const orderItem = {
        product: product ? product._id : null,
        quantity: qty,
        price: price,
        productDetails,
      };
      
      console.log(`Order item created:`, JSON.stringify(orderItem, null, 2));
      orderItems.push(orderItem);
    }

    console.log("All items processed. OrderItems count:", orderItems.length);

    // Add shipping fee if applicable
    let finalAmount = amount;

    console.log("Creating order with:");
    console.log("- userId:", userId);
    console.log("- items count:", orderItems.length);
    console.log("- amount:", finalAmount);
    console.log("- paymentType:", paymentType);

    // Create order document
    const order = await Order.create({
      userId,
      items: orderItems,
      address: {
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        country: address.country || "",
        postalCode: address.postal_code || address.postalCode || "",
      },
      amount: finalAmount,
      paymentType: paymentType || "COD",
      isPaid: paymentType === "Online" ? false : false,
      status: "Order Placed",
    });

    console.log("✓ Order created successfully:", order._id);

    // Clear user's cart after successful order
    await User.findByIdAndUpdate(userId, { cartItems: {} });

    res.status(201).json({
      message: "Order placed successfully",
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error in placeOrderCOD:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Full error:", error);
    res.status(500).json({ message: error.message || "Internal Server Error", success: false });
  }
};

// order details for individual user: /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    console.log("getUserOrders called for userId:", req.user);
    const userId = req.user;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .sort({ createdAt: -1 });
    console.log("Found orders:", orders.length);
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error in getUserOrders:", error);
    res.status(500).json({ message: error.message || "Internal Server Error", success: false });
  }
};

// get all orders for seller: /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    res.status(500).json({ message: error.message || "Internal Server Error", success: false });
  }
};