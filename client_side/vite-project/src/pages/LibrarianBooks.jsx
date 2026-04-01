import React, { useEffect, useState, useRef } from "react";
import { getBooks, addBook, deleteBook } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import bg1 from '../assets/Images/bg11.jpg';
import classicImg from '../assets/Images/book5.jpg';
import novelImg from '../assets/Images/book3.jpg';
import literatureImg from '../assets/Images/book18.jpg';
import book1 from '../assets/Images/book1.jpg';
import book2 from '../assets/Images/book2.jpg';
import book3 from '../assets/Images/book3.jpg';
import book4 from '../assets/Images/book4.jpg';
import book5 from '../assets/Images/book6.jpg';
import book6 from '../assets/Images/book7.jpg';
import book7 from '../assets/Images/book8.jpg';
import book8 from '../assets/Images/book9.jpg';
import book10 from '../assets/Images/book10.jpg';
import book11 from '../assets/Images/book11.jpg';
import book12 from '../assets/Images/book12.jpg';
import book13 from '../assets/Images/book13.jpg';
import book14 from '../assets/Images/book14.jpg';
import book15 from '../assets/Images/book15.jpg';
import book16 from '../assets/Images/book16.jpg';
import book17 from '../assets/Images/book17.jpg';
import book18 from '../assets/Images/book18.jpg';
import book19 from '../assets/Images/book19.jpg';
import book20 from '../assets/Images/book20.jpg';
import book21 from '../assets/Images/book21.jpg';

export default function BooksPage() {
  
  const [books,setBooks]=useState([]);
  const [form,setForm]=useState({});

  useEffect(()=>{
    load();
  },[]);

  const load=async()=>{
    const res=await getBooks();
    setBooks(res.data);
  };

  const submit=async(e)=>{
    e.preventDefault();
    await addBook(form);
    load();
    alert("New book added successfully!");
  };

  const newCollection = useRef(null);
  const topChoices = useRef(null);
  const classicCollection = useRef(null);
  const novelCollection = useRef(null);
  const literatureCollection = useRef(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const scrollToNewCollection = () => {
    newCollection.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTopChoices = () => {
    topChoices.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToClassicCollection = () => {
    classicCollection.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToNovelCollection = () => {
    novelCollection.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLiteratureCollection = () => {
    literatureCollection.current.scrollIntoView({ behavior: 'smooth' });
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
  
       const ClassicCollection = [
         { id: 5, name: "Hamlet", author: "William Shakespeare", category: "Classic",  image: book10 },
         { id: 6, name: "The Alchemist", author: "Paulo Coelho", category: "Classic",  image: book11 },
         { id: 7, name: "Wind And Peace", author: "Leo Tolstoy", category: "Classic",  image: book12 },
         { id: 8, name: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic",  image: book13 },
       ];
  
       const NovelCollection = [
         { id: 5, name: "To Kill A Mockingbird", author: "Harper Lee", category: "Novel",  image: book14 },
         { id: 6, name: "The Black Madonna", author: "Stella Riley", category: "Novel",  image: book15 },
         { id: 7, name: "The Westing Game", author: "Ellen Raskin", category: "Novel",  image: book16 },
         { id: 8, name: "Into The Wilderness", author: "Sara Donati", category: "Novel",  image: book17 },
       ];
  
       const LiteratureCollection = [
         { id: 5, name: "Timeless Classics of English", author: "G & V Classics", category: "Literature",  image: book18 },
         { id: 6, name: "English Literature", author: "William J. Long", category: "Literature",  image: book19 },
         { id: 7, name: "English Literature II", author: "William J. Long", category: "Literature",  image: book20 },
         { id: 8, name: "Wuthering Heights", author: "Emily Bronte", category: "Literature",  image: book21 },
       ];

  const allBooks = [...NewCollection, ...TopChoices, ...ClassicCollection, ...NovelCollection, ...LiteratureCollection];

  const handleSearch = () => {
    const results = allBooks.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);
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
        
        .add-book {margin-left: 150px; margin-top: 100px; margin-right: 100px;}

        .books-section-2 { padding: 50px 10%; background: #ffffff; }
        .books-section-2 h2 { font-size: 35px; color: #333; margin-bottom: 50px; font-weight: bold; }
        .books-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-top: 20px; }
        .book-card-2 { background: #333; border: 1px solid #333; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.08); }
        .book-card-2 img { width: 100%; height: 200px; object-fit: cover; }
        .book-details-2 { padding: 15px; }
        .book-details-2 h3 { font-size: 20px; margin-bottom: 20px; color: #ffa1a1; font-weight: bold;}
        .book-details-2 p { margin: 4px 0; font-size: 16px; color: #ffe3e3; }
        .book-card-2:hover { transform: scale(1.05);}
        .book-btn-2 { background: #fff; color: #620909; padding: 10px 25px; border: none; border-radius: 15px; font-weight: bold; margin-top: 15px; cursor: pointer; }
        
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
              placeholder="Search Books..." 
              className="search-input" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
        <div className="event-categories">
          <Link to="/librarian"><button className="category-btn">Home</button></Link>
          <button className="category-btn" onClick={scrollToTopChoices}>Top Choices</button>
          <button className="category-btn" onClick={scrollToNewCollection}>New Colllection</button>
          <Link to="/librarianstudents"><button className="category-btn" onClick={scrollToNewCollection}>Students</button></Link>
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
     
      <section className="explore-section">
        <h2>Explore Categories</h2>
        <br />
        <div className="explore-grid">
          <div className="explore-card" onClick={scrollToClassicCollection}><img src={classicImg} alt="Classic" /><h3>Classic</h3></div>
          <div className="explore-card" onClick={scrollToNovelCollection}><img src={novelImg} alt="Novels" /><h3>Novels</h3></div>
          <div className="explore-card" onClick={scrollToLiteratureCollection}><img src={literatureImg} alt="Literature" /><h3>Literature</h3></div>
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
                <button className="book-btn" onClick={() => navigate("/reserve", { state: { book: bo } })}>Reserve</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="add-book">
           <h3 style={{fontSize: "40px", color: "#333", marginBottom: "50px", fontWeight: "bold",}}>➕ Add Books</h3>
           <form onSubmit={submit}>
             <input className="form-control mb-2" placeholder="Book Name" style={{padding: "0.75rem", borderRadius: "8px", border: "2px solid #090f62", backgroundColor: "#d8d9ff", color: "#000000", marginTop: "10px",}}
               onChange={(e)=>setForm({...form,name:e.target.value})}/>
             <input className="form-control mb-2" placeholder="Author" style={{padding: "0.75rem", borderRadius: "8px", border: "2px solid #090f62", backgroundColor: "#d8d9ff", color: "#000000", marginTop: "1.5rem",}}
               onChange={(e)=>setForm({...form,author:e.target.value})}/>
             <button className="btn btn-primary" style={{marginTop:"1rem", padding: "0.75rem", borderRadius: "8px", border: "2px solid #090f62", backgroundColor: "#1b31c4", color: "#ffffff", fontWeight: "bold", width: "100px", fontSize: "16px",}}>Add</button>
           </form>
           <br /><br />
           <h3 className="mt-4">New Books List</h3>
           <br />
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
          <button
            className="btn btn-info"
            style={{ marginRight: "1rem" }}
            onClick={() => navigate("/reserve", { state: { book: b } })}
          >
            Reserve
          </button>
          <button
            className="btn btn-danger"
            onClick={async () => {
              await deleteBook(b.id);
              load();
              alert("Book removed successfully!");
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


           <br /><br /><br />
         </div>

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
      </section>

         <section className="books-section-2" ref={classicCollection}>
                 <br />
                 <h2>🔥 Classic Collection</h2>
                 <br />
                 <div className="books-grid-2">
                   {ClassicCollection.map(bo => (
                     <div key={bo.id} className="book-card-2">
                       <img src={bo.image} alt={bo.name} />
                       <div className="book-details-2">
                         <h3>{bo.name}</h3> 
                         <p><b>Author:</b> {bo.author}</p>
                         <p><b>Category:</b> {bo.category}</p>
                         <button className="book-btn" onClick={() => navigate("/reserve", { state: { book: bo } })}>Reserve</button>
                       </div>
                     </div>
                   ))}
                 </div>
               </section>
         
               <section className="books-section-2" ref={novelCollection}>
                 <br />
                 <h2>🔥 Novel Collection</h2>
                 <br />
                 <div className="books-grid-2">
                   {NovelCollection.map(bo => (
                     <div key={bo.id} className="book-card-2">
                       <img src={bo.image} alt={bo.name} />
                       <div className="book-details-2">
                         <h3>{bo.name}</h3> 
                         <p><b>Author:</b> {bo.author}</p>
                         <p><b>Category:</b> {bo.category}</p>
                         <button className="book-btn" onClick={() => navigate("/reserve", { state: { book: bo } })}>Reserve</button> 
                       </div>
                     </div>
                   ))}
                 </div>
               </section>
         
               <section className="books-section-2" ref={literatureCollection}>
                 <br />
                 <h2>🔥 Literature Collection</h2>
                 <br />
                 <div className="books-grid-2">
                   {LiteratureCollection.map(bo => (
                     <div key={bo.id} className="book-card-2">
                       <img src={bo.image} alt={bo.name} />
                       <div className="book-details-2">
                         <h3>{bo.name}</h3> 
                         <p><b>Author:</b> {bo.author}</p>
                         <p><b>Category:</b> {bo.category}</p>
                         <button className="book-btn" onClick={() => navigate("/reserve", { state: { book: bo } })}>Reserve</button>  
                       </div>
                     </div>
                   ))}
                 </div>
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