import express, { request, response } from "express";
import { PORT , mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoutes.js';
import cors from 'cors'
const app = express();

//middleware for parsing req body

app.use(express.json());
//default cors
app.use(cors());

//custom cors
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders: ['Content-Type']
// }))
app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send('welcome')
})

app.use('/books',booksRoute)

// //Routes for save a new book

// app.post('/books', async (request,response) => {
//     try {
//         if(
//             !request.body.title || 
//             !request.body.author || 
//             !request.body.publishYear
//         ) {
//             return response.status(400).send({
//                 message: 'send all req fields: title, author, publishYear'
//             });
//         }
//         const newBook = {
//             title: request.body.title,
//             author: request.body.author,
//             publishYear: request.body.publishYear
//         }
//         const book = await Book.create(newBook);
//         return response.status(201).send(book);
//     } catch (error){
//         console.log(error.message);
//         response.status(500).send({ message : error.message});
//     }
// });

// // Route for get all books from database

// app.get('/books', async (request,response) => {
//     try{
//         const books = await Book.find({});
//         return response.status(200).json({
//             count: books.length,
//             data:books
//         })
//     } catch (error){
//         console.log(error);
//         response.status(500)
//     }
// })

// //Route for get all books by id
// app.get('/books/:id', async (request,response) => {
//     try{
//         const { id } = request.params;
//         const book = await Book.findById(id);
//         return response.status(200).json(book)
//     } catch (error){
//         console.log(error);
//         response.status(500)
//     }
// })
// // Route for update a book

// app.put('/books/:id', async (request, response) => {
//     try{
//         if(!request.body.title ||
//             !request.body.author ||
//             !request.body.publishYear
//         ){
//             return response.status(400).send({
//                 message: 'send all req fields: title, author, publishYear'
//             })
//         }
//         const {id} = request.params;
//         const result = await Book.findByIdAndUpdate(id, request.body);
//         if(!result){
//             return response.status(404).json({message: 'Book not found'})
//         }
//         return response.status(200).send({message: 'Book Updated Successfully'})
//     }catch (error){
//         console.log(error);
//         response.status(500).send({message: error.message})
//     }
// });

// //Route to delete a book

// app.delete('/books/:id', async (request, response) => {
//     try{
//         const {id} = request.params;
//         const result = await Book.findByIdAndDelete(id);
//         if(!result){
//             return response.status(404).json({message: 'Book not found'})
//         }
//         return response.status(200).send({message: 'Book Deleted Successfully'})
//     }catch (error){
//         console.log(error);
//         response.status(500).send({message: error.message})
//     }
// });
mongoose
.connect(mongoDBURL)
.then(() =>{
    console.log("sucessfully connected to mongo");
    app.listen(PORT,()=> {
        console.log("app data:",`${PORT}`)
    })
})
.catch((err) => {
    console.log(err)
})