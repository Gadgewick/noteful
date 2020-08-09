import React from 'react';

const NotefulContext = React.createContext({
  notes: [],
  folder: [],
  error: null,
  handleDelete: () => {},
  handleAddFolder: () => {},
  handleAddNote: () => {}  
});

export default NotefulContext;