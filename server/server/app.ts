import http, { IncomingMessage, Server, ServerResponse } from "http";
/*
implement your server code here
*/

import fs from "fs"
let database = __dirname + '/database.json';
/*
implement your server code here
*/
const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {​
  if (req.method === "GET") {​
    let data = fs.readFileSync(database, 'utf-8')
    res.end(JSON.stringify(data));
  }​
  if (req.method === "POST") {​
    let body = {​
      organization: "node ninja",
      createdAt: "2020-08-12T19:04:55.455Z",
      updatedAt: "2020-08-12T19:04:55.455Z",
      products: ["developers", "pizza"],
      marketValue: "90%",
      address: "sangotedo",
      ceo: "cn",
      country: "Taiwan",
      id: 2,
      noOfEmployees: 2,
      employees: ["james bond", "jackie chan"]
    }​
    //let database = __dirname + '/database.json';
    if (!fs.existsSync(database)) {​
      fs.writeFileSync(database, JSON.stringify([(body)]))
      res.writeHead(201, {​ "content-Type": "application/json" }​)
      res.end(JSON.stringify({​ message: "Profile created successfully" }​))
    }​ else {​
      let dbObj = fs.readFileSync(database, 'utf-8')
      let objToWrite = JSON.parse(dbObj)
      let indexOfLastObj = objToWrite.length - 1;
      body.id = objToWrite[indexOfLastObj].id + 1;
      objToWrite.push(body)
      fs.writeFileSync(database, JSON.stringify(objToWrite, null, 2))
      res.writeHead(201, {​ "content-Type": "application/json" }​)
      res.end(JSON.stringify({​ message: "Profile written successfully" }​))
    }​
  }​
  if (req.method === "PUT") {​
    let urlWithId = req.url?.split('/')[1];
    console.log(urlWithId)
    if (!urlWithId) {​
      res.writeHead(201, {​ "content-Type": "application/json" }​)
      res.end(JSON.stringify({​ message: "User does not exist" }​))
      return
    }​ else {​
      let editOrgProfile = fs.readFileSync(database, 'utf-8')
      let orgObjArr = JSON.parse(editOrgProfile);
      let orgIdx = orgObjArr.findIndex((profile: any) => profile.id == urlWithId)
      console.log(orgIdx)
      orgObjArr[orgIdx].updatedAt = new Date();
      fs.writeFileSync(database, JSON.stringify(orgObjArr, null, 2))
      res.writeHead(200, {​ "content-Type": "application/json" }​)
      res.end(JSON.stringify({​ message: "Profile editted successfully" }​))
    }​
  }​
  if (req.method === "DELETE") {​
    let urlWithId = req.url?.split('/')[1];
    console.log(urlWithId)
    if (!urlWithId) {​
      res.writeHead(201, {​ "content-Type": "application/json" }​)
      res.end(JSON.stringify({​ message: "User does not exist" }​))
      return
    }​ else {​
      let editOrgProfile = fs.readFileSync(database, 'utf-8')
      let orgObjArr = JSON.parse(editOrgProfile);
      let orgIdx = orgObjArr.findIndex((profile: any) => profile.id == urlWithId)
      console.log(orgIdx)
      orgObjArr[orgIdx].updatedAt = orgObjArr.splice(orgIdx, 1);
      fs.writeFileSync(database, JSON.stringify(orgObjArr, null, 2))
      res.writeHead(200, {​ "content-Type": "application/json" }​)
      res.end(JSON.stringify({​ message: "Profile Deleted successfully" }​))
    }​
  }​
}​
);
server.listen(3000);​
    
    
  
  

