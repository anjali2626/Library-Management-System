import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getReservedBooks, getBooks, deleteBook  } from "../services/api";
import bg1 from '../assets/Images/bg11.jpg';
import book1 from '../assets/Images/book1.jpg';
import book2 from '../assets/Images/book2.jpg';
import book3 from '../assets/Images/book3.jpg';
import book4 from '../assets/Images/book4.jpg';
import book5 from '../assets/Images/book6.jpg';
import book6 from '../assets/Images/book7.jpg';
import book7 from '../assets/Images/book8.jpg';
import book8 from '../assets/Images/book9.jpg';

export default function LibrarianDashboard() {
  const [books, setBooks] = useState([]);
  const [reservedBooks, setReservedBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loadingReserved, setLoading] = useState(true);

  const newCollection = useRef(null);
  const topChoices = useRef(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const savedReserved = localStorage.getItem("reservedBooks");
    const savedBorrowed = localStorage.getItem("borrowedBooks");

    if (savedReserved) setReservedBooks(JSON.parse(savedReserved));
    if (savedBorrowed) setBorrowedBooks(JSON.parse(savedBorrowed));

    fetchReservedBooks();
    load();
  }, []);

  const fetchReservedBooks = async () => {
    try {
      const res = await getReservedBooks();
      console.log("Reserved books from MySQL:", res.data);

      setReservedBooks(prev => {
        const merged = [...prev];

        res.data.forEach(rb => {
          if (!prev.find(p => p.id === rb.id)) {
            merged.push(rb); 
          }
        });

        localStorage.setItem("reservedBooks", JSON.stringify(merged));
        return merged;
      });
    } catch (err) {
      console.error("Failed to fetch reserved books", err);
    } finally {
      setLoading(false);
    }
  };

  const load = async () => {
    const res = await getBooks();
    setBooks(res.data);
  };


  const confirmReservation = (rb) => {
    const today = new Date().toISOString().split("T")[0];

    setReservedBooks(prev => {
      const updated = prev.map(item =>
        item.id === rb.id ? { ...item, status: "Confirmed" } : item
      );
      localStorage.setItem("reservedBooks", JSON.stringify(updated));
      return updated;
    });

    setBorrowedBooks(prev => {
      const updatedBorrowed = [
        ...prev,
        {
          ...rb,
          borrowed_date: today,
          returned_date: "",
          return_status: "Borrowed"
        }
      ];
      localStorage.setItem("borrowedBooks", JSON.stringify(updatedBorrowed));
      return updatedBorrowed;
    });
  };


  const returnBook = (id) => {
    const today = new Date().toISOString().split("T")[0];

    setBorrowedBooks(prev => {
      const updated = prev.map(book =>
        book.id === id
          ? { ...book, return_status: "Returned", returned_date: today }
          : book
      );
      localStorage.setItem("borrowedBooks", JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };


  const NewCollection = [
        { id: 1, name: "Beloved She My Daughter", author: "Toni Morrison", category: "Novel",  image: book1 },
        { id: 2, name: "The Wind in the Willows", author: "Kenneth Grahame", category: "Novel",  image: book2 },
        { id: 3, name: "The Secret History", author: "Donna Tartt", category: "Classic", image: book3 },
        { id: 4, name: "Another Country", author: "James Baldwin", category: "Classic",  image: book4 },
      ];
    
      const TopChoices = [
        { id: 5, name: "The Tea Rose", author: "Jennifer Donnelly", category: "Novel",  image: book5 },
        { id: 6, name: "Bridge To Terabithia", author: "Katherine Paterson", category: "Novel",  image: book6 },
        { id: 7, name: "Gone With The Wind", author: "Margaret Mitchell", category: "Classic",  image: book7 },
        { id: 8, name: "Popul Vuh", author: "Dennis Tedlook", category: "Classic",  image: book8 },
      ];

  const allBooks = [...NewCollection, ...TopChoices];

  const handleSearch = () => {
    const results = allBooks.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);
  };

  const thStyle = { padding: "12px", textAlign: "left" };
  const tdStyle = { padding: "10px", borderBottom: "1px solid #ddd" };

  const redBtn = {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  };

  const greenBtn = {
    ...redBtn,
    background: "#28a745"
  };

  return (
    <div className="home-page">
      <style>{`
        .home-page { font-family: 'Segoe UI'; sans-serif; width: 100%; color: #333; }
        .hero { background-image: url(${bg1}); center/cover no-repeat; color: white; text-align: center; padding: 100px 20px;  }
        .hero-card { padding: 20px; padding-bottom: 20px; width: 900px; margin-left: 300px;}
        .hero-title { font-size: 60px; font-weight: bold; margin-bottom: 40px; color: #620909;}
        .search-bar { display: flex; justify-content: center; margin-top: 15px;  }
        .search-input { padding: 12px; width: 300px; border: none; border-radius: 4px 0 0 4px; font-size: 16px; background: #ffffffc4; color: black;}
        .search-btn { padding: 12px 18px; background: #620909; color: white; border: none; border-radius: 0 4px 4px 0; cursor: pointer; }
        .event-categories { margin-top: 45px; margin-bottom: 30px;}
        .category-btn { margin: 0 8px; padding: 10px 25px; background: #fff; color: #620909; border: 2px solid #620909; border-radius: 25px; cursor: pointer; font-weight: bold; }
        .category-btn:hover {background: #620909; color: #fff ;}
        .selected { background: #620909; color: #fff; }

        .explore-section { padding: 60px 20px; text-align: center; background: #fafafa; }
        .explore-section h2 { color: #333; font-size: 35px; font-weight: bold;}
        .explore-section { font-size: 25px; margin-bottom: 30px; }
        .explore-grid { display: flex; justify-content: center; gap: 60px; flex-wrap: wrap; }
        .explore-card { background: #fff; border-radius: 12px; width: 280px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.3s; cursor: pointer; height: 420px;}
        .explore-card img { width: 100%; border-radius: 12px 12px 0 0; height: 360px; object-fit: cover; }
        .explore-card h3 { margin: 15px 0; font-size: 20px; color: #000000; font-weight: bold;  }
        .explore-card:hover { transform: translateY(-8px); background: #d8d9ff; color: #fff; }
        
        .books-section { padding: 50px 10%; background: #333; }
        .books-section h2 { font-size: 35px; color: #fff; margin-bottom: 50px; font-weight: bold; }
        .books-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-top: 20px; }
        .book-card { background: #fff; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.08); }
        .book-card img { width: 100%; height: 200px; object-fit: cover; }
        .book-details { padding: 15px; }
        .book-details h3 { font-size: 20px; margin-bottom: 8px; color: #620909; font-weight: bold;}
        .book-details p { margin: 4px 0; font-size: 16px; }
        .book-card:hover { transform: scale(1.05);}
        .book-btn { background: #620909; color: #fff; padding: 10px 25px; border: none; border-radius: 15px; font-weight: bold; margin-top: 15px; cursor: pointer; }
        .books-section-2 { padding: 50px 10%; background: #d3d3d3; }
        .books-section-2 h2 { font-size: 40px; color: #333; margin-bottom: 50px; font-weight: bold; }
        
        .get-book {margin-left: 150px; margin-top: 100px; margin-right: 100px;}

        .site-footer { background: #530707; display: flex; justify-content: space-around; flex-wrap: wrap; padding: 40px 20px; color: #fff; }
        .site-footer input{ background: #f1f1f1; padding:5px; }
        .footer-copy { width: 100%; text-align: center; margin-top: 40px; font-weight: bold; color: #fafafa; }
        

      `}</style>

     
      <section className="hero" >
        <div className="hero-card">
        <h1 className="hero-title">Welcome to ESSSL Institute Library Management</h1>
        <div className="search-bar">
          <input 
              type="text" 
              placeholder="Search Books..." 
              className="search-input" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
        <div className="event-categories">
          <Link to="/"><button className="category-btn">Home</button></Link>
          <Link to="/librarianbooks"><button className="category-btn">All Books</button></Link>
          <Link to="/librarianstudents"><button className="category-btn">Students</button></Link>
          <button className="category-btn" onClick={logout}>Logout</button>
        </div>
        </div>
      </section>
      {searchResults.length > 0 && (
        <section className="books-section">
          <h2>Search Results</h2>
          <div className="books-grid">
            {searchResults.map(book => (
              <div key={book.id} className="book-card">
                <img src={book.image} alt={book.name} />
                <div className="book-details">
                  <h3>{book.name}</h3>
                  <p><b>Author:</b> {book.author}</p>
                  <p><b>Category:</b> {book.category}</p>
                  <button className="book-btn" onClick={() => navigate("/reserve", { state: { book: bo } })}>Reserve</button>

                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="books-section-2">
  <h2>📌 Reserved Books</h2>

  {loadingReserved ? (
    <p style={{ color: "#fff" }}>Loading reserved books...</p>
  ) : reservedBooks.length === 0 ? (
    <p style={{ color: "#fff" }}>No reserved books yet.</p>
  ) : (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          background: "#fff",
          borderRadius: "10px",
          borderCollapse: "collapse",
        }}
      >
        <thead style={{ background: "#620909", color: "#fff" }}>
          <tr>
            <th style={thStyle}>Student Name</th>
            <th style={thStyle}>Book Name</th>
            <th style={thStyle}>Author</th>
            <th style={thStyle}>Reserved Date</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {reservedBooks.map((rb) => (
            <tr key={rb.id}>
              <td style={tdStyle}>{rb.student_name}</td>
              <td style={tdStyle}>{rb.book_name}</td>
              <td style={tdStyle}>{rb.author}</td>
              <td style={tdStyle}>{rb.reserved_date}</td>
              <td style={tdStyle}>
                    {rb.status === "Confirmed" ? (
                      <button style={greenBtn}>Confirmed</button>
                    ) : (
                      <button style={redBtn} onClick={() => confirmReservation(rb)}>
                        Confirm
                      </button>
                    )}
                  </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</section>

<section className="books-section-2">
        <h2>📚 Borrowed Books</h2>

        {borrowedBooks.length === 0 ? (
          <p style={{ color: "#fff" }}>No borrowed books yet.</p>
        ) : (
          <table style={{ width: "100%", background: "#fff" }}>
            <thead style={{ background: "#620909", color: "#fff" }}>
              <tr>
                <th style={thStyle}>Student Name</th>
                <th style={thStyle}>Book Name</th>
                <th style={thStyle}>Author</th>
                <th style={thStyle}>Borrowed Date</th>
                <th style={thStyle}>Returned Date</th>
                <th style={thStyle}>Return Status</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map(bb => (
                <tr key={bb.id}>
                  <td style={tdStyle}>{bb.student_name}</td>
                  <td style={tdStyle}>{bb.book_name}</td>
                  <td style={tdStyle}>{bb.author}</td>
                  <td style={tdStyle}>{bb.borrowed_date}</td>
                  <td style={tdStyle}>{bb.returned_date || "-"}</td>
                  <td style={tdStyle}>
                    {bb.return_status === "Returned" ? (
                      <button style={greenBtn}>Returned</button>
                    ) : (
                      <button style={redBtn} onClick={() => returnBook(bb.id)}>
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="books-section" ref={newCollection}>
              <br />
              <h2>🔥 New Collection</h2>
              <br />
              <div className="books-grid">
                {NewCollection.map(bo => (
                  <div key={bo.id} className="book-card">
                    <img src={bo.image} alt={bo.name} />
                    <div className="book-details">
                      <h3>{bo.name}</h3> 
                      <p><b>Author:</b> {bo.author}</p>
                      <p><b>Category:</b> {bo.category}</p>
                      <button className="book-btn" onClick={() => navigate("/reserve", { state: { book: bo } })}>Reserve</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
      
            <section className="books-section" ref={topChoices}>
      
              <h2>📅 Top Choices</h2>
              <br />
              <div className="books-grid">
                {TopChoices.map(bo => (
                  <div key={bo.id} className="book-card">
                    <img src={bo.image} alt={bo.name} />
                    <div className="book-details">
                      <h3>{bo.name}</h3>
                      <p><b>Author:</b> {bo.author}</p>
                      <p><b>Category:</b> {bo.category}</p>
                      <button className="book-btn" onClick={() => navigate("/reserve", { state: { book: bo } })}>Reserve</button>
                    </div>
                  </div>
                ))}
              </div>
               <br /> <br />
            </section>

            <div className="get-book">
              <h3 style={{fontSize: "40px", color: "#333", marginBottom: "50px", fontWeight: "bold",}}>New Books List</h3>
           
              <table className="table">
                <thead>
                  <tr>
                    <th>BookID</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((b, index) => (
                    <tr key={b.id}>
                      <td>{`B${101 + index}`}</td>
                      <td>{b.name}</td>
                      <td>{b.author}</td>
                      <td>
                        <button className="btn btn-info" style={{ marginRight: "1rem" }} onClick={() => navigate("/reserve", { state: { book: b } })}>Reserve</button>
                        <button className="btn btn-danger" onClick={async () => {await deleteBook(b.id);load();alert("Book removed successfully!");}}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <br /> <br /><br /> <br />
            </div>
         

      <footer className="site-footer">
        <div>
          <p><b>Contact Us</b></p>
          <p>Call: +91 345 654 6789</p>
          <p>Email: essslinstitute@gmail.com</p>
          <p>Reach Us: essslinstitute@lk.com</p>
        </div>
        <div>
          <p><b>Information</b></p>
          <ul>
            <li>New Collection</li>
            <li>Top Choices</li>
            <li>Classic Books</li>
            <li>Novels</li>
            <li>Literature</li>
          </ul>
        </div>
        <div>
          <p><b>Subscribe for Newsletter</b></p>
          <input type="email" placeholder="Enter email" className='input' style={{padding: "0.75rem", borderRadius: "8px", border: "2px solid #620909", backgroundColor: "#fed4d4", color: "#000000",}} />
          <button style={{marginLeft:"1rem", padding: "0.75rem", borderRadius: "8px", border: "2px solid #620909", backgroundColor: "#b32929", color: "#ffffff", fontWeight: "bold",}}>Sign Up</button>
        </div>
        <p className="footer-copy">2026 All Rights Reserved</p>
      </footer>
    </div>
  );
}


