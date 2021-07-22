const mongoose = require("mongoose");

const CheckedItemsSchema = new mongoose.Schema({
    content : String,
    user_id: {
        type: String,
        required: true,
        }
})
const CheckedItem = mongoose.model("CheckedItem" , CheckedItemsSchema);

module.exports = CheckedItem;