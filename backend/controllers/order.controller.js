import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

// Place order: /api/order/place
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address, paymentType, amount } = req.body;

    // Validate request
    if (!address || !items || items.length === 0 || !amount) {
      return res
        .status(400)
        .json({ message: "Invalid order details", success: false });
    }

    // Convert items to proper format and validate
    const orderItems = [];
    let calculatedAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item._id);
      if (!product) {
        // Product not found in DB — fallback to using client-provided item data (useful for local/dev dummy products)
        console.warn(`Product ${item._id} not found in DB, using client-provided data`);
        const price = item.offerPrice || item.price || 0;
        const qty = item.quantity || 1;
        const itemPrice = price * qty;
        calculatedAmount += itemPrice;
        orderItems.push({
          product: item._id,
          quantity: qty,
          price,
        });
        continue;
      }

      const itemPrice = product.offerPrice * (item.quantity || 1);
      calculatedAmount += itemPrice;

      orderItems.push({
        product: item._id,
        quantity: item.quantity || 1,
        price: product.offerPrice,
      });
    }

    // Add shipping fee if applicable
    let finalAmount = amount;

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
      isPaid: paymentType === "Online" ? false : false, // Default false for COD
      status: "Order Placed",
    });

    // Clear user's cart after successful order
    await User.findByIdAndUpdate(userId, { cartItems: {} });

    res.status(201).json({
      message: "Order placed successfully",
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error in placeOrderCOD:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
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
      .populate("items.product")
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
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};