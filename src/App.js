// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import Statusdefault from './pages/Statusdefault';
// import User from './pages/User';
// // import Contact from '.pages/Contact';
// import Priority from './pages/Priorities';


// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <DropdownMenu />
//         {/* Routing */}
//         <Routes>
//           <Route exact path="/" element={<Statusdefault />} />
//           <Route path="/user" element={<User />} />
//           <Route path="/priority" element={<Priority />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// // Dropdown menu component
// function DropdownMenu() {
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     navigate(e.target.value);
//   };

//   return (
//     <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
//       <label for="cars">Display</label>
//       <select onChange={handleChange}>
//         <option value="/">--------</option>
//         <option value="/">Status</option>
//         <option value="/user">User</option>
//         <option value="/priority">Priority</option>
//       </select>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Statusdefault from './pages/Statusdefault';
import User from './pages/User';
import Priority from './pages/Priorities';
import { ReactComponent as DisplayIcon } from './icons/Display.svg';
import { ReactComponent as DownIcon } from './icons/down.svg';


function App() {
  return (
    <Router>
      <div className="App">
        <DropdownMenu />
        {/* Routing */}
        <Routes>
          <Route exact path="/" element={<Statusdefault />} />
          <Route path="/user" element={<User />} />
          <Route path="/priority" element={<Priority />} />        
        </Routes>
      </div>
    </Router>
  );
}

// Dropdown menu component
function DropdownMenu() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);


  // Toggles the popup on button click
  const handleDisplayClick = () => {
    setModalOpen(prevState => !prevState); // Toggle the modal's open/close state
  };

  const handleSubmit = (grouping, ordering) => {
    setModalOpen(false);  // Close the modal after form submission
  
    // Navigate to the correct route based on grouping
    if (grouping === 'user') navigate(`/user?grouping=${grouping}&ordering=${ordering}`);
    if (grouping === 'status') navigate(`/?grouping=${grouping}&ordering=${ordering}`);
    if (grouping === 'priority') navigate(`/priority?grouping=${grouping}&ordering=${ordering}`);
  
    // Reload the page after navigation
    window.location.reload();
  };
  

  return (
    <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
      <button style={{ padding: '2px 15px', border: '1px solid #ddd',
            borderRadius: '4px', backgroundColor: 'white',}} onClick={handleDisplayClick}>
        <DisplayIcon width='20'/> Display <DownIcon width='20'/>
      </button>
      {isModalOpen && <PopupForm onSubmit={handleSubmit} />}
      
    </div>
  );
}


// Popup form component with automatic submit on input changes
function PopupForm({ onSubmit }) {
  const [grouping, setGrouping] = useState('');
  const [ordering, setOrdering] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(grouping, ordering);
  };

  // Automatically submit the form when both fields have values
  useEffect(() => {
    if (grouping && ordering) {
      handleFormSubmit(new Event('submit'));  // Simulate submit event
    }
  }, [grouping, ordering]);

  return (
    <div style={popupStyle}>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Grouping : </label>
          <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
            <option value="">----</option>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div>
          <label>Ordering  : </label>
          <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
            <option value="">----</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </form>
    </div>
  );
}

// Component to handle redirection and displaying selected values
function DisplayRedirect() {
  const queryParams = new URLSearchParams(window.location.search);
  const grouping = queryParams.get('grouping');
  const ordering = queryParams.get('ordering');
}

// Simple styles for popup form
const popupStyle = {  
  top: '40px',
  left: '70px',
  backgroundColor: 'white',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.5)',
};

export default App;





