import { Request,Response } from "express";
const fs=require('fs');
const path= require('path');
const dataPath= path.join(__dirname, "/", "data.json");
console.log(dataPath);
//const dataPath="../data.json";
//utility functions 
const saveAccountData=(data:JSON)=>{
    const stringifyData=JSON.stringify(data);
    fs.writeFileSync(dataPath,stringifyData);
}

const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);   
    console.log(jsonData);
}
//CRUD
//Create:
//Each Account in the JSON database should have a unique id to identify each account easily. 
//We will generate a 6 digit number using Javascript math.random, 
//then assign the 6 digit number to a variable newAccountId 
//and set the new Id to whatever we get from our body. 
//Our JSON data is now updated with the latest information of the new account created. 
//We'll use the saveAccountData util function to write the new data into our JSON file.
export const createUser= async (req: Request,res:Response): Promise<Response>=>{
    try{
    var existAccounts = getAccountData()
    const newAccountId = Math.floor(100000 + Math.random() * 900000)
    existAccounts[newAccountId] = req.body;
    saveAccountData(existAccounts);
    return res.json(existAccounts);
}
catch(e){
    console.log(e);
    return res.status(500).json("Internal server error");
}
}




//Read
export const getUsers= async(req:Request,res:Response):Promise<Response>=>{
try{
    const response=await getAccountData();
    return res.status(200).json(response); 
}
catch(e){
    console.log(e);
    return res.status(500).json("Internal server error");
}
}

export const updateUser= async (req: Request,res:Response): Promise<Response>=>{
    var existAccounts = getAccountData()
    const accountId=req.params['id'];
    fs.readFile(dataPath, 'utf8', (err:any, data:any) => {
      existAccounts[accountId] = req.body;
      saveAccountData(existAccounts);
    
    }, true);
return res.status(200).json(`accounts with id ${accountId} has been updated`);   
}

//delete
export const deleteUser= async (req: Request,res:Response): Promise<Response>=>{
    const userId = req.params['id'];
    fs.readFile(dataPath, 'utf8', (err:any, data:any) => {
        var existAccounts = getAccountData()
        delete existAccounts[userId]; 
        saveAccountData(existAccounts);
      }, true);
    return res.json(`accounts with id ${userId} has been deleted`);

}
