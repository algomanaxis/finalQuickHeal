import React, { useEffect, useState, createContext, useContext } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { ReactComponent as NoPrioIcon } from '../icons/No-priority.svg';
import { ReactComponent as UrgentIcon } from '../icons/SVG - Urgent Priority colour.svg';
import { ReactComponent as HighPrioIcon } from '../icons/Img - High Priority.svg';
import { ReactComponent as MediumPrioIcon } from '../icons/Img - Medium Priority.svg';
import { ReactComponent as LowPrioIcon } from '../icons/Img - Low Priority.svg';
import { ReactComponent as AddIcon } from '../icons/add.svg';
import { ReactComponent as ThreeDotIcon } from '../icons/3 dot menu.svg';
import CardUserPrio from '../components/CardUserPrio';

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
const Priorities = () => {
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
  const renderTasks = (priority) => {

    const queryParams = new URLSearchParams(window.location.search);
    const ordering = queryParams.get('ordering');
    // Filter the tasks and store the filtered array in a variable
    const filteredTasks = tickets.filter((task) => task.priority == priority);
    // Store the size of the filtered array in 'i'
    let i = filteredTasks.length;
    if (ordering === 'priority') {
      const sortedTasks = filteredTasks.sort((a, b) => b.priority - a.priority);
      return sortedTasks.map((task) => (
        <div key={task.id}>
          {/* Render each task using the Card component */}
          <CardUserPrio id={task.id} title={task.title} tag={task.tag.join(', ')} uname={getUserName(task.userId)} sts={task.status} />
        </div>
      ));

    }else {
      const sortedTasks = filteredTasks.sort((a, b) => a.title.length - b.title.length);
      return sortedTasks.map((task) => (
        <div key={task.id}>
          {/* Render each task using the Card component */}
          <CardUserPrio id={task.id} title={task.title} tag={task.tag.join(', ')} uname={getUserName(task.userId)} sts={task.status} />
        </div>
      ));

    }

    



  };




  const findLength = (priority) => {
    const filteredTasks = tickets.filter((task) => task.priority == priority);
    let i = filteredTasks.length;
    return i;
  }


  return (
    <div style={styles.board}>
      <div style={styles.column}>
        <h2 style={styles.Cat}><NoPrioIcon style={{ marginRight: '10px' }} width="18" height="18" />No priority <span style={{ color: 'grey', fontSize: '20px', marginLeft: '15px' }}>{findLength('0')} </span> <span style={styles.addIcon}><AddIcon width="20" height="20" />   <ThreeDotIcon /></span></h2>
        {renderTasks('0')}
      </div>
      <div style={styles.column}>
        <h2 style={styles.Cat} > <UrgentIcon style={{ marginRight: '10px' }} width="18" height="18" />Urgent<span style={{ color: 'grey', fontSize: '20px', marginLeft: '15px' }}>{findLength('4')}</span><span style={{ marginLeft: "200px" }}><AddIcon width="20" height="20" />   <ThreeDotIcon /></span></h2>
        {renderTasks('4')}
      </div>
      <div style={styles.column}>
        <h2 style={styles.Cat}><HighPrioIcon style={{ marginRight: '10px' }} width="18" height="18" />High<span style={{ color: 'grey', fontSize: '20px', marginLeft: '15px' }}>{findLength('3')}</span><span style={{ marginLeft: "200px" }} ><AddIcon width="20" height="20" />   <ThreeDotIcon /></span></h2>
        {renderTasks('3')}
      </div>
      <div style={styles.column}>
        <h2 style={styles.Cat}><MediumPrioIcon style={{ marginRight: '10px' }} width="18" height="18" />Medium <span style={{ color: 'grey', fontSize: '20px', marginLeft: '15px' }}>{findLength('2')}</span><span style={{ marginLeft: "170px" }}><AddIcon width="20" height="20" />   <ThreeDotIcon /></span></h2>
        {renderTasks('2')}
      </div>
      <div style={styles.column}>
        <h2 style={styles.Cat}><LowPrioIcon style={{ marginRight: '10px' }} width="18" height="18" />Low <span style={{ color: 'grey', fontSize: '20px', marginLeft: '15px' }}>{findLength('1')}</span><span style={{ marginLeft: "180px" }}><AddIcon width="20" height="20" />   <ThreeDotIcon /></span></h2>
        {renderTasks('1')}
      </div>

    </div >
  );
};

export default Priorities;
