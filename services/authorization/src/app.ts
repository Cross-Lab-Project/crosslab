#!/usr/bin/env node

import express from "express";
import asyncHandler from 'express-async-handler';
import { errorHandler, logHandling } from "@crosslab/service-common";
import { query_relations, update_relations } from "./openfga";
import { CheckTuple } from "./types";
import { opa_check } from "./opa";
import { config } from "./config";

const app = express()
logHandling(app)
app.use((req, res, next) => {
    if (req.headers['x-authorization-psk'] !== config.PSK){
        res.status(401).send('Unauthorized');
        return;
    }
    next()
})
app.use(express.json())
app.get('/authorize', asyncHandler(async (req, res) => {
    if (typeof req.query.subject !== 'string') {res.send({result: false, reason: 'subject is not a string'}); return;}
    if (typeof req.query.action !== 'string') {res.send({result: false, reason: 'action is not a string'}); return;}
    if (typeof req.query.object !== 'string') {res.send({result: false, reason: 'object is not a string'}); return;}
    const check: CheckTuple = {
        subject: req.query.subject,
        action: req.query.action,
        object: req.query.object,
    }
    res.send((await opa_check([check]))[0])
}))

app.post('/authorize', asyncHandler(async (req, res) => {
    const checks=req.body
    if (!Array.isArray(checks)) {res.send({result: false, reason: 'checks is not an array'}); return;}
    if (checks.length === 0) {res.send({result: false, reason: 'checks is empty'}); return;}
    res.send(await opa_check(checks))
}))

app.post('/relations/update', asyncHandler(async (req, res) => {
    const input=req.body
    const add=input.add??[]
    const remove=input.remove??[]
    await update_relations(add, remove)
    res.send()
}))

app.post('/relations/query', asyncHandler(async (req, res) => {
    res.send(await query_relations(req.body.subject, req.body.relation, req.body.object))
}))


app.use(errorHandler)

export default app