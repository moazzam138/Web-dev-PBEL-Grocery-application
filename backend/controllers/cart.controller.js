import User from "../models/user.model.js";

// update user cartData: /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const userId = req.user;
    const { cartItems } = req.body;

    if (!cartItems || typeof cartItems !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid cart data",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { cartItems },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error in updateCart:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};