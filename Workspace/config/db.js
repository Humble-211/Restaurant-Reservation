const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected')
    } catch (err) {
        console.log(`can't connect to mongo db` )
        console.error(err.message)
        process.exit(1) // exit if fail
    }
}
module.exports = connectDB