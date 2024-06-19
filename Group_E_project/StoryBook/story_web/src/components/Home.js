import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  Link,
} from "@mui/material";

import "./Home.css";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios
      .get("http://localhost:5000/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };

  const handleDeleteBook = (title) => {
    axios
      .delete("http://localhost:5000/delete-book", { data: { title } })
      .then((response) => {
        console.log(response.data.message);
        fetchBooks();
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h1" color="white" className="title">
        Story web
      </Typography>
      <Box
        mb={3}
        display="flex"
        justify-content="center"
        flex-wrap="wrap"
        className="cards-wrapper">
        {books.map((book) => (
          <Card key={book.title} className="book-card">
            <Link
              href={`/read-book/${book.title}`}
              underline="none"
              color="black">
              {book.images[0].src ? (
                <CardMedia
                  component="img"
                  image={`http://localhost:5000${book.images[0].src}`}
                  alt={book.title}></CardMedia>
              ) : (
                <div className="placeholder-image">No Image Available</div>
              )}
              <Typography variant="h2" className="book-title">
                {book.title}
              </Typography>
            </Link>
            <CardContent>
              <Button
                variant="contained"
                onClick={() => handleDeleteBook(book.title)}
                color="error">
                刪除
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Link href="/add-book">
        <Button variant="contained">新增繪本</Button>
      </Link>
    </Box>
  );
};

export default Home;
