#!/usr/bin/env node

import express from "express";
import asyncHandler from 'express-async-handler';
import { errorHandler, logHandling } from "@crosslab/service-common";
import fetch from 'node-fetch';
import { openfgaOpaData, update_relations } from "./openfga";

const app = express()
logHandling(app)
app.use(express.json())
app.use('/authorize', asyncHandler(async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any={
        subject: req.query.subject,
        action: req.query.action,
        object: req.query.object,
    }
    // try{
    //     body=req.body
    // }catch(e){
    //     // ignore
    // }
    // if input is not an array, make it an array
    const arrayInput=Array.isArray(body)
    if(!Array.isArray(body)){
        body=[body]
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const outputPromise=body.map((input: any)=>
        fetch('http://localhost:8181/v1/data/crosslab/allow', {
            method: 'POST',
            body: JSON.stringify({input: {...input, ...openfgaOpaData}}),
        }).then(response => response.json()).then(json => json.result ?? false)
    )
    const output=await Promise.all(outputPromise)
    res.contentType('application/json')
    if (arrayInput){
        res.send(output)
    }else{
        res.send(output[0])
    }
}))

app.post('/relations/update', asyncHandler(async (req, res) => {
    const input=req.body
    const add=input.add??[]
    const remove=input.remove??[]
    await update_relations(add, remove)
    res.send()
}))

app.use(errorHandler)

export default app