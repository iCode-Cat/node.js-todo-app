const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const doSchema = new Schema({
    task: String
})

const Do = mongoose.model(`Do`, doSchema);
module.exports = Do;