"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const fs = require('fs');
const index_controller_1 = require("../controllers/index.controller");
//CRUD:
router.get('/users', index_controller_1.getUsers); //read All 
//router.get('/users/:id',getById); //Read one by one
router.post('/users/addaccount', index_controller_1.createUser); //Create
router.put('/users/update/:id', index_controller_1.updateUser); ///Update
router.delete('/users/delete/:id', index_controller_1.deleteUser); // Delete
exports.default = router;
