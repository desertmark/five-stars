import { CosmosClient } from "@azure/cosmos";
import { config as dotenv } from "dotenv";
import path from 'path';
const rootPath = path.resolve(__dirname, "../");
const envPath = path.resolve(rootPath, ".env");
dotenv({ path: envPath });

const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);


client.databases.createIfNotExists({
  id: 'test'
}).then(database => {
  console.log('db created', database);
}).catch(error => {
  console.log(error);
})