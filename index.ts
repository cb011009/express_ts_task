import express, { Request, Response, NextFunction } from 'express';
import { connectToDb, getDb } from './db';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import {validatePostFieldsMiddleware , validatePatchFieldsMiddleware} from './validation';
import { authenticate } from './authMiddleware'; 

dotenv.config();

const app = express();
app.use(express.json());

let db: any;

connectToDb((err) => {
    if (!err) {
        db = getDb();
        app.listen(3000, () => {
            console.log('app listening on port 3000');
        });
    } else {
        console.error('Failed to connect to the database:', err);
    }
});

app.use((req: Request, res: Response, next: NextFunction) => {
    if (!db) {
        return res.status(503).json({ error: 'Database connection not available' });
    }
    next();
});

// Use the authentication middleware
app.use(authenticate);

// Fetch all students -> Tested through Postman
app.get('/students', async (req: Request, res: Response) => {
    try {
        const students = await db.collection('students').find().toArray();
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Could not fetch the documents' });
    }
});

// Fetch a student by ID-> Tested through Postman
app.get('/students/:id', async (req: Request, res: Response) => {
    try {
        const student = await db.collection('students').findOne({ _id: new ObjectId(req.params.id) });
        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ error: 'Document not found' });
        }
    } catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).json({ error: 'Could not fetch the document' });
    }
});

// POST route with field validation middleware
app.post('/students', validatePostFieldsMiddleware, async (req: Request, res: Response) => {
    try {
        const result = await db.collection('students').insertOne(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating document:', error);
        res.status(500).json({ error: 'Could not create a new document' });
    }
});

// Update a student by ID -> Tested through Postman
app.patch('/students/:id',  validatePatchFieldsMiddleware, async (req: Request, res: Response) => {
    try {
        const updates = req.body;
        const result = await db.collection('students').updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates });
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Document updated successfully' });
        } else {
            res.status(404).json({ error: 'Document not found' });
        }
    } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).json({ error: 'Could not update the document' });
    }
});

// DELETE route
app.delete('/students/:id', async (req: Request, res: Response) => {
    try {
        const result = await db.collection('students').deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Document deleted successfully' });
        } else {
            res.status(404).json({ error: 'Document not found' });
        }
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ error: 'Could not delete the document' });
    }
});

export default app;


