import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import express from "express"
import userRoute from "./routes/user.route.js"
import connectDB from "./utils/db.js";
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"

dotenv.config({});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions))
const PORT = process.env.PORT || 3000;



// API endpoints 
app.use("/api/v1/user", userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)
// app.use("/api/v1/")




connectDB().then(() => {

    app.listen(PORT, () => {
        console.log(`server is running at port ${PORT}`);
    })
}).catch((error) => {
    console.log(error)
})




