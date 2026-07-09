const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
const app = express();

// #region agent log
const { Sequelize } = require("sequelize");
const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    dialect: process.env.DB_DIALECT,
};
const sequelizeProbe = new Sequelize(dbConfig.database, dbConfig.user, process.env.DB_PASSWORD, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false,
});
sequelizeProbe.authenticate().then(() => {
    fetch('http://127.0.0.1:7615/ingest/c0e7ca6b-9699-44b8-8ee3-5190d97cfbf0',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'72a589'},body:JSON.stringify({sessionId:'72a589',runId:'dev-start',hypothesisId:'H1',location:'server.js:db-auth',message:'DB connection OK',data:dbConfig,timestamp:Date.now()})}).catch(()=>{});
}).catch((err) => {
    fetch('http://127.0.0.1:7615/ingest/c0e7ca6b-9699-44b8-8ee3-5190d97cfbf0',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'72a589'},body:JSON.stringify({sessionId:'72a589',runId:'dev-start',hypothesisId:'H1',location:'server.js:db-auth',message:'DB connection FAILED',data:{...dbConfig,error:err.message},timestamp:Date.now()})}).catch(()=>{});
});
// #endregion

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

/* Routes import */
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const clientRoutes = require("./routes/client");
const tableRoutes = require("./routes/table");
const orderRoutes = require("./routes/order");
const uploadRoutes = require("./routes/upload");

/* Routes */
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

const rootPath = path.resolve();

/* File folder */
app.use("/uploads", express.static(path.join(rootPath, "/uploads")));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(rootPath, "/frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(rootPath, "frontend", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running...");
    });
}

/* Error Handlers */
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // #region agent log
    fetch('http://127.0.0.1:7615/ingest/c0e7ca6b-9699-44b8-8ee3-5190d97cfbf0',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'72a589'},body:JSON.stringify({sessionId:'72a589',runId:'dev-start',hypothesisId:'H2',location:'server.js:listen',message:'Backend listening',data:{port:PORT,nodeEnv:process.env.NODE_ENV},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
});
