"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const validation_1 = require("./validation");
const authMiddleware_1 = require("./authMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
let db;
(0, db_1.connectToDb)((err) => {
    if (!err) {
        db = (0, db_1.getDb)();
        app.listen(3000, () => {
            console.log('app listening on port 3000');
        });
    }
    else {
        console.error('Failed to connect to the database:', err);
    }
});
app.use((req, res, next) => {
    if (!db) {
        return res.status(503).json({ error: 'Database connection not available' });
    }
    next();
});
// Use the authentication middleware
app.use(authMiddleware_1.authenticate);
// Fetch all students -> Tested through Postman
app.get('/students', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield db.collection('students').find().toArray();
        res.status(200).json(students);
    }
    catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Could not fetch the documents' });
    }
}));
// Fetch a student by ID-> Tested through Postman
app.get('/students/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield db.collection('students').findOne({ _id: new mongodb_1.ObjectId(req.params.id) });
        if (student) {
            res.status(200).json(student);
        }
        else {
            res.status(404).json({ error: 'Document not found' });
        }
    }
    catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).json({ error: 'Could not fetch the document' });
    }
}));
// POST route with field validation middleware
app.post('/students', validation_1.validatePostFieldsMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.collection('students').insertOne(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        console.error('Error creating document:', error);
        res.status(500).json({ error: 'Could not create a new document' });
    }
}));
// Update a student by ID -> Tested through Postman
app.patch('/students/:id', validation_1.validatePatchFieldsMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = req.body;
        const result = yield db.collection('students').updateOne({ _id: new mongodb_1.ObjectId(req.params.id) }, { $set: updates });
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Document updated successfully' });
        }
        else {
            res.status(404).json({ error: 'Document not found' });
        }
    }
    catch (error) {
        console.error('Error updating document:', error);
        res.status(500).json({ error: 'Could not update the document' });
    }
}));
// DELETE route
app.delete('/students/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.collection('students').deleteOne({ _id: new mongodb_1.ObjectId(req.params.id) });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Document deleted successfully' });
        }
        else {
            res.status(404).json({ error: 'Document not found' });
        }
    }
    catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ error: 'Could not delete the document' });
    }
}));
exports.default = app;
