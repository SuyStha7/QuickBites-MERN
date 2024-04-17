import mongoose from 'mongoose'

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://user:user@cluster0.rbg8ccw.mongodb.net/food-del").then(() => {
        console.log("DB Connected")
    })
}