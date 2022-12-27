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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, "/", "data.json");
console.log(dataPath);
//const dataPath="../data.json";
//utility functions 
const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync(dataPath, stringifyData);
};
const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
    console.log(jsonData);
};
//CRUD
//Create:
//Each Account in the JSON database should have a unique id to identify each account easily. 
//We will generate a 6 digit number using Javascript math.random, 
//then assign the 6 digit number to a variable newAccountId 
//and set the new Id to whatever we get from our body. 
//Our JSON data is now updated with the latest information of the new account created. 
//We'll use the saveAccountData util function to write the new data into our JSON file.
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var existAccounts = getAccountData();
        const newAccountId = Math.floor(100000 + Math.random() * 900000);
        existAccounts[newAccountId] = req.body;
        saveAccountData(existAccounts);
        return res.json(existAccounts);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
    }
});
exports.createUser = createUser;
//Read
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getAccountData();
        return res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
    }
});
exports.getUsers = getUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var existAccounts = getAccountData();
    const accountId = req.params['id'];
    fs.readFile(dataPath, 'utf8', (err, data) => {
        existAccounts[accountId] = req.body;
        saveAccountData(existAccounts);
    }, true);
    return res.status(200).json(`accounts with id ${accountId} has been updated`);
});
exports.updateUser = updateUser;
//delete
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params['id'];
    fs.readFile(dataPath, 'utf8', (err, data) => {
        var existAccounts = getAccountData();
        delete existAccounts[userId];
        saveAccountData(existAccounts);
    }, true);
    return res.json(`accounts with id ${userId} has been deleted`);
});
exports.deleteUser = deleteUser;
