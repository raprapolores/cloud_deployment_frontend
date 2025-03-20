import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import { Grid, Card, CardContent, Typography, Button, Container, Box } from '@mui/material';
import Header from './Header';

const BookList = () => {
  const [books, setBooks] = useState([]);

  
  const fetchBooks = async () => {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('/books', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBooks(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const borrowBook = async (id) => {
    const token = localStorage.getItem('token');
    await axiosInstance.post(
      '/books/borrow',
      { bookId: id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchBooks();
  };

  const returnBook = async (id) => {
    const token = localStorage.getItem('token');
    await axiosInstance.post(
      '/books/return',
      { bookId: id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchBooks();
  };

  return (
    
    <Container maxWidth="lg" sx={{ padding: '20px' }}>
        <Header />
      <Typography variant="h4" gutterBottom align="center" marginTop="30px">
        Available Books
      </Typography>

      {/* Book List */}
      <Grid container spacing={3} sx={{ padding: '20px' }}>
        {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
                <Card
                    sx={{
                    maxWidth: 345,
                    borderRadius: '8px', // Rounded corners for the card
                    boxShadow: 4, // Soft shadow for a lifted effect
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition on hover
                    '&:hover': {
                        transform: 'translateY(-5px)', // Lift the card on hover
                        boxShadow: 12, // Stronger shadow on hover
                    },
                    }}
                >
                    <CardContent>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }} gutterBottom>
                        {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Author: {book.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: '8px' }}>
                        {book.available ? 'Available' : 'Not Available'}
                    </Typography>
                    </CardContent>

                    <Box sx={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
                    {book.available ? (
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={() => borrowBook(book.id)}
                        sx={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '20px', // Rounded corners for the button
                            fontWeight: 'bold',
                            '&:hover': {
                            backgroundColor: '#1976d2', // Darken blue on hover
                            boxShadow: 4,
                            },
                        }}
                        >
                        Borrow
                        </Button>
                    ) : (
                        <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => returnBook(book.id)}
                        sx={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '20px', // Rounded corners for the button
                            fontWeight: 'bold',
                            '&:hover': {
                            backgroundColor: '#f44336', // Darken red on hover
                            color: '#fff',
                            boxShadow: 4,
                            },
                        }}
                        >
                        Return
                        </Button>
                    )}
                    </Box>
                </Card>
            </Grid>
            ))}
        </Grid>
    </Container>
  );
};

export default BookList;
