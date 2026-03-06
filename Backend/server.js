require("dotenv").config(); /// this should be in first line
const app = require("./src/app");
const connectToDB = require("./src/config/database");
const PORT = 3000;

connectToDB();

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    
})