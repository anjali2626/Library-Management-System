const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

const bcrypt = require("bcryptjs");
const { Sequelize, DataTypes } = require("sequelize");
const multer = require("multer");
const path = require("path");

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("ESSSL Library Backend Running Successfully");
});

const sequelize = new Sequelize("library_db", "root", "", {
  host: "localhost",
  dialect: "mysql"
});


const Student = sequelize.define("student", {
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
  profile_image: {
    type: DataTypes.STRING,
    defaultValue: "profile.png"
  }
});

const Librarian = sequelize.define("librarian", {
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING
});

const Book = sequelize.define("book", {
  name: DataTypes.STRING,
  author: DataTypes.STRING,
  image: DataTypes.STRING
});

const ReservedBook = sequelize.define("reserved_book", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  student_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  book_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reserved_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  timestamps: true
});

const BorrowedBook = sequelize.define("borrowed_book", {
  student_id: DataTypes.INTEGER,
  book_id: DataTypes.INTEGER,
  borrowed_date: DataTypes.DATE
});

sequelize.sync().then(() => {
  console.log("Database synced");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


app.post("/api/auth/register", async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    if (role === "librarian") {
      await Librarian.create({ first_name, last_name, email, password: hashed });
    } else {
      await Student.create({ first_name, last_name, email, password: hashed });
    }
    res.json({ message: "Registered successfully" });
  } catch {
    res.status(400).json({ message: "Email already exists" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await Librarian.findOne({ where: { email } });
  let role = "librarian";

  if (!user) {
    user = await Student.findOne({ where: { email } });
    role = "student";
  }

  if (!user) return res.status(401).json({ message: "Access Denied" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    id: user.id,
    first_name: user.first_name,
    role
  });
});


app.get("/api/books", async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

app.post("/api/books", upload.single('image'), async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
});


app.delete("/api/books/:id", async (req, res) => {
  await Book.destroy({ where: { id: req.params.id } });
  res.json({ message: "Book Removed" });
});


app.get("/api/students", async (req, res) => {
  const students = await Student.findAll();
  res.json(students);
});

app.get("/api/students/:id", async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  res.json(student);
});

app.post("/api/students", async (req, res) => {
  const { first_name, last_name, email } = req.body;
  const password = await bcrypt.hash("123456", 10);

  await Student.create({
    first_name,
    last_name,
    email,
    password
  });

  res.json({ message: "Student Added" });
});

app.put(
  "/api/students/update/:id",
  upload.single("profile_image"),
  async (req, res) => {
    const { first_name, last_name, email } = req.body;

    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.first_name = first_name;
    student.last_name = last_name;
    student.email = email;

    if (req.file) {
      student.profile_image = req.file.filename;
    }

    await student.save();

    res.json({ message: "Profile updated successfully" });
  }
);

app.delete("/api/students/:id", async (req, res) => {
  await Student.destroy({ where: { id: req.params.id } });
  res.json({ message: "Student removed" });
});


app.post("/api/reserved-books", async (req, res) => {
  try {
    const { student_name, book_name, author, reserved_date } = req.body;

    const reserve = await ReservedBook.create({
      student_name,
      book_name,
      author,
      reserved_date
    });

    res.json({ message: "Book reserved successfully", reserve });
  } catch (error) {
    res.status(500).json({ message: "Error reserving book" });
  }
});

app.get("/api/reserved-books", async (req, res) => {
  try {
    const reserved = await ReservedBook.findAll({
      order: [["reserved_date", "DESC"]],
    });
    res.json(reserved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch reserved books" });
  }
});

app.post("/api/borrow", async (req, res) => {
  const borrow = await BorrowedBook.create({
    ...req.body,
    borrowed_date: new Date()
  });
  res.json(borrow);
});



app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
