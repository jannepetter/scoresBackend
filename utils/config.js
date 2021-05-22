require('dotenv').config()
let PORT = process.env.PORT
let dburl = process.env.MONGOURL
const MONGOCONFIG = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
};

module.exports = {
    dburl,
    PORT,
    MONGOCONFIG
}