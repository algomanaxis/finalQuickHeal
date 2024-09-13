import React, { useEffect, useState, createContext, useContext } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { ReactComponent as TodoIcon } from '../icons/To-do.svg';
import { ReactComponent as Backlog } from '../icons/Backlog.svg';
import { ReactComponent as DoneIcon } from '../icons/Done.svg';
import { ReactComponent as CancelledIcon } from '../icons/Cancelled.svg';
import { ReactComponent as DisplayIcon } from '../icons/Display.svg';
import { ReactComponent as AddIcon } from '../icons/add.svg';
import { ReactComponent as ThreeDotIcon } from '../icons/3 dot menu.svg';
import CardUserPrio from '../components/CardUserPrio';
import CardOnlyUser from '../components/CardOnlyUser';

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '13px',
    padding: '20px',
    backgroundColor: '#F2F2F2',
  },
  board: {
    display: 'flex',
    gap: '0px',
  },
  column: {
    width: '380px',
    padding: '2px',
    borderRadius: '5px',
    margin:'5px'

  },
  taskCard: {
    backgroundColor: '#fff',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '10px',
  },

  Cat: {
    marginLeft: "10px"
  },

  addIcon: {
    marginLeft: "120px",
  }
};

// Create Context to share data across components
const TicketContext = createContext();

// Main component
const User = () => {
  
  return (
    <div style={styles.app}>
      <TicketProvider>
        <TaskBoard />
      </TicketProvider>
    </div>
  );
};

// Context provider component to fetch data and share it
const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState('priority');
  // Fetch data from the API using axios
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment'); 
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();


    // Component to handle redirection and displaying selected values
    const DisplayRedirect=()=>{
      const queryParams = new URLSearchParams(window.location.search);
      const grouping = queryParams.get('grouping');
      const ordering = queryParams.get('ordering');
      setOrder(ordering);
    }
    DisplayRedirect()    

  }, []);

  return (
    <TicketContext.Provider value={{ tickets, users }}>
      {children}
    </TicketContext.Provider>
  );
};

// Component for rendering the task board
const TaskBoard = () => {
  const { tickets, users } = useContext(TicketContext);


  // Helper function to find the user's name based on userId
  const getUserName = (userId) => {    
    const user = users.find((u) => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  // Filter tasks based on status/category
  const renderTasks = (id) => {
   
    const queryParams = new URLSearchParams(window.location.search);
    const ordering = queryParams.get('ordering');
    // const ordering = 'title';  
    if (ordering === 'priority') {
      // Filter tasks for the specific user ID
      const filteredTasks = tickets.filter((task) => task.userId === id);
  
      // Sort the filtered tasks based on their priority in descending order
      const sortedTasks = filteredTasks.sort((a, b) => b.priority - a.priority);
  
      // Render the sorted tasks
      return sortedTasks.map((task) => (
        <div key={task.id}>
          <CardOnlyUser 
            id={task.id} 
            title={task.title} 
            tag={task.tag.join(', ')} 
            uname={getUserName(task.userId)} 
            sts={task.status} 
            prio={task.priority} 
          />
        </div>
      ));
    } else {
      // Filter tasks for the specific user ID
      const filteredTasks = tickets.filter((task) => task.userId === id);       
      
      const sortedTasks = filteredTasks.sort((a, b) => a.title.length - b.title.length);
  
      // Render the sorted tasks
      return sortedTasks.map((task) => (
        <div key={task.id}>
          <CardOnlyUser 
            id={task.id} 
            title={task.title} 
            tag={task.tag.join(', ')} 
            uname={getUserName(task.userId)} 
            sts={task.status} 
            prio={task.priority} 
          />
        </div>
      ));
    }
  
    
    return null;
  };
  
  




  const findLength = (id) => {
    
    const filteredTasks = tickets.filter((task) => task.userId === id);
    let i = filteredTasks.length;
    return i;
  }

  return (
    <div style={styles.board}>
      {users.map((ind) => (
        <div key={ind.id} style={styles.column}>
          <h2 style={styles.Cat}>
            <TodoIcon style={{ marginRight: '10px' }} width="18" height="18" />
            {/* <DisplayIcon /> */}
            {ind.name}
            <span style={{ color: 'grey', fontSize: '20px', marginLeft: '15px' }}>
              {findLength(`${ind.id}`)}
            </span>
            <span style={styles.addIcon}>
              <AddIcon width="20" height="20" />
              <ThreeDotIcon />
            </span>
          </h2>
          {renderTasks(ind.id)}
        </div>
      ))}
    </div>
  );

};

export default User;
