import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel,js";
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// place order
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "npr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 134
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "npr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 5 * 100 * 134
            },
            quantity: 1
        })

    } catch (error) {

    }
}

export { placeOrder }