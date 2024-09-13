import React, { useEffect, useState, createContext, useContext } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { ReactComponent as TodoIcon } from '../icons/To-do.svg';
import { ReactComponent as Backlog } from '../icons/Backlog.svg';
import { ReactComponent as DoneIcon } from '../icons/Done.svg';
import { ReactComponent as CancelledIcon } from '../icons/Cancelled.svg';
import { ReactComponent as InprogessIcon } from '../icons/in-progress.svg';
import { ReactComponent as AddIcon } from '../icons/add.svg';
import { ReactComponent as ThreeDotIcon } from '../icons/3 dot menu.svg';

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
    marginLeft: "160px",
  }
};

// Create Context to share data across components
const TicketContext = createContext();

// Main component
const Statusdefault = () => {
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

  // Fetch data from the API using axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment'); // Replace with actual API
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
  const renderTasks = (status) => {
    const queryParams = new URLSearchParams(window.location.search);
    const ordering = queryParams.get('ordering');
    // Filter the tasks and store the filtered array in a variable
    const filteredTasks = tickets.filter((task) => task.status === status);
    // Store the size of the filtered array in 'i'
    let i = filteredTasks.length;
    


    if (ordering === 'priority') {
      const sortedTasks = filteredTasks.sort((a, b) => b.priority - a.priority);
      return sortedTasks.map((task) => (
        <div key={task.id}>
          {/* Render each task using the Card component */}
          <Card id={task.id} title={task.title} tag={task.tag.join(', ')} uname={getUserName(task.userId)} sts={status} prio={task.priority} />
        </div>
      ));
    }else {
      const sortedTasks = filteredTasks.sort((a, b) => a.title.length - b.title.length);
        return sortedTasks.map((task) => (
          <div key={task.id}>
            {/* Render each task using the Card component */}
            <Card id={task.id} title={task.title} tag={task.tag.join(', ')} uname={getUserName(task.userId)} sts={status} prio={task.priority} />
          </div>
        ));      
    }

  };




  const findLength = (status) => {
    const filteredTasks = tickets.filter((task) => task.status === status);
    let i = filteredTasks.length;
    return i;
  }


  return (
    <div style={styles.board}>
      <div style={styles.column}>
        <h2 style={styles.Cat}><Backlog style={{ marginRight: '10px' }} width="18" height="18" />Backlog <span style={{ color: 'grey', fontSize: '20px', marginLeft: '15px' }}>{findLength('Backlog')} </span> <span style={styles.addIcon}><AddIcon width="20" height="20" />   <ThreeDotIcon /></span></h2>
        {renderTasks('Backlog')}
      </div>
      <div style={styles.column}>
        <h2 style={styles.Cat} > <TodoIcon style={{ marginRight: '10px' }} width="18" height="18" />Todo<span style={{ color: 'grey', fontSize: '20px', marginLeft: '15px' }}>{findLength('Todo')}</span><span style={{ marginLeft: "200px" }}><AddIcon width="20" height="20" />   <ThreeDotIcon /></span></h2>
        {renderTasks('Todo')}
      </div>
      <div style={styles.column}>
        <h2 style={styles.Cat}><InprogessIcon style={{ marginRight: '10px' }} width="18" height="18" />In Progress<span style={{ color: 'grey', fontSize: '20px', marginLeft: '15px' }}>{findLength('In progress')}</span><span style={{ marginLeft: "140px" }} ><AddIcon width="20" height="20" />   <ThreeDotIcon /></span></h2>
        {renderTasks('In progress')}
      </div>
      <div style={styles.column}>
        <h2 style={styles.Cat}><DoneIcon style={{ marginRight: '10px' }} width="18" height="18" />Done<span style={{ color: 'grey', fontSize: '20px', marginLeft: '15px' }}>{findLength('Done')}</span><span style={{ marginLeft: "100px" }}><AddIcon width="20" height="20" />   <ThreeDotIcon /></span></h2>
        {renderTasks('Done')}
      </div>
      <div style={styles.column}>
        <h2 style={styles.Cat}><CancelledIcon style={{ marginRight: '10px' }} width="18" height="18" />Canceled<span style={{ color: 'grey', fontSize: '20px', marginLeft: '15px' }}>{findLength('Canceled')}</span><span style={{ marginLeft: "100px" }}><AddIcon width="20" height="20" />   <ThreeDotIcon /></span></h2>
        {renderTasks('Canceled')}
      </div>

    </div >
  );
};

export default Statusdefault;
