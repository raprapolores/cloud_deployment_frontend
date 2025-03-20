import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios'; // Adjust the axios import path as needed
import { TextField, Button, Grid, Typography, Card, CardContent, CardActions, Container, Box } from '@mui/material';
import Header from './Header';

const AdminPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(null); // Track if a book is being edited

  
  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch all books on page load
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/books', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  // Add new book
  const addBook = async () => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.post(
        '/books',
        { title, author },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setAuthor('');
      fetchBooks(); // Re-fetch the book list after adding a book
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // Edit book
  const editBook = async () => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.put(
        `/books/${editing.id}`,
        { title, author, id: editing.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditing(null); // Reset the editing state
      setTitle('');
      setAuthor('');
      fetchBooks(); // Re-fetch the book list after updating a book
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  // Delete book
  const deleteBook = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.delete(`/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBooks(); // Re-fetch the book list after deleting a book
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Select book for editing
  const selectBookForEditing = (book) => {
    setEditing(book);
    setTitle(book.title);
    setAuthor(book.author);
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
      <Header />
        <Typography variant="h4" gutterBottom align="center" marginTop="30px">
          Admin Page - Manage Books
        </Typography>

        {/* Add or Edit Book Form */}
        <Box
            sx={{
                marginBottom: '30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: 3, // Adding shadow for a lifted effect
                backgroundColor: '#f9f9f9', // Light background color
                maxWidth: '600px', // Restrict max width for better readability
                margin: 'auto', // Center the form horizontally
            }}
            >
            <Typography variant="h5" gutterBottom>
                {editing ? 'Edit Book' : 'Add New Book'}
            </Typography>

            <TextField
                label="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
                sx={{
                maxWidth: '100%',
                backgroundColor: 'white',
                borderRadius: '4px',
                boxShadow: 1,
                '& .MuiInputBase-root': {
                    borderRadius: '4px',
                },
                }}
            />

            <TextField
                label="Book Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                fullWidth
                margin="normal"
                sx={{
                maxWidth: '100%',
                backgroundColor: 'white',
                borderRadius: '4px',
                boxShadow: 1,
                '& .MuiInputBase-root': {
                    borderRadius: '4px',
                },
                }}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={editing ? editBook : addBook}
                sx={{
                marginTop: '20px',
                maxWidth: '200px',
                padding: '10px 20px',
                borderRadius: '20px',
                boxShadow: 3,
                '&:hover': {
                    boxShadow: 6, // Adding hover effect for the button
                    backgroundColor: '#1976d2',
                },
                }}
            >
                {editing ? 'Edit Book' : 'Add Book'}
            </Button>
            </Box>

        {/* Book List */}
        <Grid container spacing={3} sx={{ padding: '20px' }}>
            {books.map((book) => (
                <Grid item xs={12} sm={6} md={4} key={book.id}>
                <Card
                    sx={{
                    boxShadow: 6, // Stronger shadow for more lifted effect
                    borderRadius: '8px', // Rounded corners for the card
                    backgroundColor: '#fff', // Ensure the background is white
                    transition: 'transform 0.2s, box-shadow 0.2s', // Smooth hover effect
                    '&:hover': {
                        transform: 'translateY(-5px)', // Hover effect for card
                        boxShadow: 12, // Increase shadow on hover for interactive feel
                    },
                    }}
                >
                    <CardContent sx={{ padding: '16px' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }} gutterBottom>
                        {book.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Author: {book.author}
                    </Typography>
                    </CardContent>

                    <CardActions sx={{ padding: '8px 16px', justifyContent: 'space-between' }}>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => selectBookForEditing(book)}
                        sx={{
                        padding: '6px 12px',
                        fontSize: '0.9rem',
                        transition: 'background-color 0.3s',
                        '&:hover': {
                            backgroundColor: '#1976d2', // Hover effect for the button
                            color: '#fff',
                        },
                        }}
                    >
                        Edit
                    </Button>

                    <Button
                        size="small"
                        color="secondary"
                        onClick={() => deleteBook(book.id)}
                        sx={{
                        padding: '6px 12px',
                        fontSize: '0.9rem',
                        transition: 'background-color 0.3s',
                        '&:hover': {
                            backgroundColor: '#d32f2f', // Hover effect for the delete button
                            color: '#fff',
                        },
                        }}
                    >
                        Delete
                    </Button>
                    </CardActions>
                </Card>
                </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
};

export default AdminPage;
