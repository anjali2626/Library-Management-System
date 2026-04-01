import React, { useEffect, useState, useRef } from "react";
import { getStudents, addStudent, deleteStudent, getReservedBooks, } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import bg1 from '../assets/Images/bg11.jpg';
import book1 from '../assets/Images/book1.jpg';
import book2 from '../assets/Images/book2.jpg';
import book3 from '../assets/Images/book3.jpg';
import book4 from '../assets/Images/book4.jpg';
import book5 from '../assets/Images/book6.jpg';
import book6 from '../assets/Images/book7.jpg';
import book7 from '../assets/Images/book8.jpg';
import book8 from '../assets/Images/book9.jpg';

export default function LibrarianStudents() {

  const [students,setStudents]=useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [form, setForm] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
   const [reservedBooks, setReservedBooks] = useState([]);
    const [loadingReserved, setLoading] = useState(true);
    
    const fetchReservedBooks = async () => {
    try {
      const res = await getReservedBooks();
      console.log("Reserved books from MySQL:", res.data);
      setReservedBooks(res.data); 
    } catch (err) {
      console.error("Failed to fetch reserved books", err);
    } finally {
      setLoading(false);
    }
  };
  
    useEffect(() => {
      fetchReservedBooks();
      load();
    }, []);
  
  const load=async()=>{
    const res=await getStudents();
    setStudents(res.data);
    setFilteredStudents(res.data);
  };
  
  const submit=async(e)=>{
    e.preventDefault();
    await addStudent(form);
    load();
    alert("New student added successfully!");
  };  
  
  const newCollection = useRef(null);
  const topChoices = useRef(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    const results = students.filter(student =>
      student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(results);
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

  const thStyle = { padding: "16px", textAlign: "left", marginLeft: "1rem" };
  const tdStyle = { padding: "15px", borderBottom: "1px solid #ddd", marginLeft: "1rem" };

  return (
    <div className="home-page">
      <style>{`
        .home-page { font-family: 'Segoe UI'; sans-serif; width: 100%; color: #333; backgound-color: #d3d3d3; }
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
        
        .add-students {margin-left: 150px; margin-top: 100px; margin-right: 100px;}

        .site-footer { background: #530707; display: flex; justify-content: space-around; flex-wrap: wrap; padding: 40px 20px; color: #fff; }
        .site-footer input{ background: #f1f1f1; padding:5px; }
        .footer-copy { width: 100%; text-align: center; margin-top: 40px; font-weight: bold; color: #fafafa; }
        

      `}</style>

     
      <section className="hero" >
        <div class="hero-card">
        <h1 className="hero-title">Welcome to ESSSL Institute Library Management</h1>
        <div className="search-bar">
            <input
              type="text"
              placeholder="Search Students..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn" onClick={handleSearch}>Search</button>
          </div>
        <div className="event-categories">
          <Link to="/librarian"><button className="category-btn">Home</button></Link>
          <Link to="/librarianbooks"><button className="category-btn">All Books</button></Link>
          <Link to="/librarianstudents"><button className="category-btn" >Students</button></Link>
          <button className="category-btn" onClick={logout}>Logout</button>
        </div>
        </div>
      </section>

      
      <div className="add-students" >
            <h3 style={{fontSize: "40px", color: "#333", marginBottom: "50px", fontWeight: "bold",}}>➕ Add Students</h3>
            <form onSubmit={submit}>
              <input className="form-control mb-2" placeholder="First Name" style={{padding: "0.75rem", borderRadius: "8px", border: "2px solid #090f62", backgroundColor: "#d8d9ff", color: "#000000", marginTop: "10px",}}
                onChange={(e)=>setForm({...form,first_name:e.target.value})}/>
              <input className="form-control mb-2" placeholder="Last Name" style={{padding: "0.75rem", borderRadius: "8px", border: "2px solid #090f62", backgroundColor: "#d8d9ff", color: "#000000", marginTop: "1.5rem",}}
                onChange={(e)=>setForm({...form,last_name:e.target.value})}/>
              <input className="form-control mb-2" placeholder="Email" style={{padding: "0.75rem", borderRadius: "8px", border: "2px solid #090f62", backgroundColor: "#d8d9ff", color: "#000000", marginTop: "1.5rem",}}
                onChange={(e)=>setForm({...form,email:e.target.value})}/>
              <button className="btn btn-success" style={{marginTop:"1rem", padding: "0.75rem", borderRadius: "8px", border: "2px solid #090f62", backgroundColor: "#1b31c4", color: "#ffffff", fontWeight: "bold", width: "100px", fontSize: "16px",}}>Add</button>
            </form>
            <br /><br />
            <h3 className="mt-4">Students List</h3>
            <br />
            <table style={{ width: "100%", background: "#fff", borderRadius: "10px", borderCollapse: "collapse",}}>
                      <thead  style={{ background: "#620909", color: "#fff" }}><tr><th style={thStyle}>First Name</th><th style={thStyle}>Last Name</th><th  style={thStyle}>Email</th><th style={thStyle}>Remove</th></tr></thead>
                      <tbody>
                        {filteredStudents.map(s => (
                          <tr key={s.id}>
                            <td style={tdStyle}>{s.first_name}</td>
                            <td style={tdStyle}>{s.last_name}</td>
                            <td style={tdStyle}>{s.email}</td>
                            <td style={tdStyle}>
                              <button className="btn btn-danger" onClick={() => { deleteStudent(s.id); load(); alert("Denied Student Access Successfully!"); }}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <br /><br /><br />
          </div>

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
          </tr>
        </thead>
        <tbody>
          {reservedBooks.map((rb) => (
            <tr key={rb.id}>
              <td style={tdStyle}>{rb.student_name}</td>
              <td style={tdStyle}>{rb.book_name}</td>
              <td style={tdStyle}>{rb.author}</td>
              <td style={tdStyle}>{rb.reserved_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</section>

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

