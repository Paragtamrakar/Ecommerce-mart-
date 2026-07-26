import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    // Will be enabled after Google Login
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },

    // Temporary user snapshot for MVP
    user: {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      address: {
        type: String,
        required: true,
        trim: true,
      },

      // Future
      // email: {
      //   type: String,
      //   default: "",
      // },
    },

    // Future Serial Number (OGM-1001)
    // orderNumber: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   index: true,
    // },


    // Delivery Verification Code
    orderCode: {
      type: String,
      required: true,
    },

    // Legacy Fields (Replaced by user object)
    // customerName: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },

    // deliveryPhone: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },

    // deliveryAddress: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },

    items: [
      {
        productId: {
          type: String,
          ref: "Product",
        },

        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "packing",
        "out-for-delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    deliveryPartner: {
      id: {
        type: String,
        default: "",
      },

      name: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        default: "",
      },
    },

    paymentType: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },

    deliveredAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);