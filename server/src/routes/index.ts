import { Router } from "express";
const router=Router();
const fs=require('fs');

import {getUsers,createUser,updateUser,deleteUser} from '../controllers/index.controller';
//CRUD:
router.get('/users',getUsers);//read All 
//router.get('/users/:id',getById); //Read one by one
router.post('/users/addaccount',createUser); //Create
router.put('/users/update/:id',updateUser);///Update
router.delete('/users/delete/:id',deleteUser);// Delete
 export default router;