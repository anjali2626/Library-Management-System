import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
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

export default function StudentDashboard() {
  
  const newCollection = useRef(null);
  const topChoices = useRef(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const studentId = localStorage.getItem("id");
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};


const [student, setStudent] = useState({
  first_name: "",
  last_name: "",
  email: "",
  
});

const [profileImage, setProfileImage] = useState(
  localStorage.getItem("profileImage") || "http://localhost:5000/uploads/profile.png"
);

const [selectedFile, setSelectedFile] = useState(null);


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

  const handleProfileUpdate = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("first_name", student.first_name);
  formData.append("last_name", student.last_name);
  formData.append("email", student.email);

  await axios.put(
    `http://localhost:5000/api/students/update/${studentId}`,
    formData
  );
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

const saveProfile = () => {
  if (selectedFile) {
    localStorage.setItem("profileImage", selectedFile);
    setProfileImage(selectedFile);
    alert("Profile details saved successfully!");
  }
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

        .profile-section { padding: 80px 10%; background: #f3f3f3; }
        .profile-section h2 { font-size: 40px; margin-bottom: 40px; font-weight: bold; }
        .profile-wrapper { display: flex; align-items: center; gap: 100px; }
        .profile-left img { width: 260px; height: 260px; border-radius: 50%; object-fit: cover; background: #ddd; }
        .profile-form { flex: 1; }
        .profile-row { display: flex; gap: 60px; margin-bottom: 25px; }
        .label {color: black; font-size: 18px; }
        .profile-input { margin-top: 10px; width: 350px; padding: 14px; border-radius: 30px; border: none; background: #7b7b7b; color: #fff; font-size: 15px;}
        .profile-input::placeholder { color: #fff; }
        .save-profile-btn { background: #620909; color: white; padding: 12px 30px; border-radius: 25px; border: none; cursor: pointer; font-weight: bold;}
        .save-profile-btn:hover { background: #ff3939; color: #fff; }

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
        
        .site-footer { background: #530707; display: flex; justify-content: space-around; flex-wrap: wrap; padding: 40px 20px; color: #fff; }
        .site-footer input{ background: #f1f1f1; padding:5px; }
        .footer-copy { width: 100%; text-align: center; margin-top: 40px; font-weight: bold; color: #fafafa; }
        

      `}</style>

     
      <section className="hero" >
        <div className="hero-card">
        <h1 className="hero-title">Welcome to ESSSL Institute Library!</h1>
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
          <Link to="/studentbooks"><button className="category-btn">All Books</button></Link>
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
                  <Link to="/login"><button className="book-btn" onClick={() => navigate("/login")}>Reserve</button></Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

   
<section className="profile-section">
  <h2>Update Profile</h2>

  <div className="profile-wrapper">
    <div className="profile-left">
      <img
        src={profileImage || "profile.png"}
        alt="profile"
      />
    </div>

    <form className="profile-form" onSubmit={handleProfileUpdate}>
      <div className="profile-row">
        <div>
          <label className="label">First Name</label><br />
          <input
            type="text"
            className="profile-input"
            placeholder={storedUser.first_name}
            onChange={(e) =>
              setStudent({ ...student, first_name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="label">Last Name</label><br />
          <input
            type="text"
            className="profile-input"
            placeholder={storedUser.last_name}
            onChange={(e) =>
              setStudent({ ...student, last_name: e.target.value })
            }
          />
        </div>
      </div>

      <div className="profile-row">
        <div>
          <label className="label">Email</label><br />
          <input
            type="email"
            className="profile-input"
            value={student.email}
            onChange={(e) =>
              setStudent({ ...student, email: e.target.value })
            }
          />
        </div>

        <div>
          <label className="label">Select Image</label><br />
          <input
            type="file" className="profile-input" onChange={handleImageChange}
          />
        </div>
      </div>

      <button type="submit" className="save-profile-btn" onClick={saveProfile}>
        Save Profile
      </button>
    </form>
  </div>
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
                      <button className="book-btn" onClick={() => navigate("/reserve")}>Reserve</button> 
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
                      <button className="book-btn" onClick={() => navigate("/reserve")}>Reserve</button>
                    </div>
                  </div>
                ))}
              </div>
               <br /> <br />
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

