import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: [true, "Title is a required field"]
    },
    description: {
        type: String,
        required: [true, "Description is a required field"]
    },

},
    {
        _id: false
    }
);


const Product = mongoose.model('Product', productSchema)
export default Product