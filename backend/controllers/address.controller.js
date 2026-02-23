import Address from "../models/address.model.js";

// add address: /api/address/add
export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.user;

    if (!address || !address.firstName || !address.lastName || !address.phone) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required address fields",
      });
    }

    const savedAddress = await Address.create({
      ...address,
      userId: userId,
    });

    res.status(201).json({
      success: true,
      address: savedAddress,
      message: "Address added successfully",
    });
  } catch (error) {
    console.error("Error in addAddress:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// get address: /api/address/get
export const getAddress = async (req, res) => {
  try {
    const userId = req.user;
    const addresses = await Address.find({ userId });
    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.error("Error in getAddress:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};