const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = new Pool({
  user: "shopuser",
  host: "localhost",
  database: "electronics_shop",
  password: "shop123",
  port: 5432
});

// Создание таблицы, если её нет
db.query(`
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  image TEXT
);`);


// Получить список товаров
app.get("/api/products", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Добавить товар
app.post("/api/products", async (req, res) => {
  const { name, price, image } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO products(name, price, image) VALUES ($1,$2,$3) RETURNING *",
      [name, price, image]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3000, () => console.log("PostgreSQL сервер: http://localhost:3000"));
