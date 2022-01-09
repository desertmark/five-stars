import { Container, CosmosClient, Database } from "@azure/cosmos";
import { inject, injectable } from "inversify";
import { IConfig } from "./config";

@injectable()
export class CosmosManager {
  private client: CosmosClient;
  public watchLists: Container;

  constructor(@inject("config") private config: IConfig) {
    this.client = new CosmosClient(this.config.connectionString);
  }

  async init() {
    await this.createDatabase(this.config.dbName);
    this.watchLists = await this.createContainer(
      this.config.dbName,
      "WatchLists",
      "/pk"
    );
  }

  async createDatabase(databaseId: string): Promise<Database> {
    try {
      const { database } = await this.client.databases.createIfNotExists({
        id: databaseId,
      });
      console.log("DB is created, db id is", database.id);
      return database;
    } catch (error) {
      console.error("Failed to create DB", databaseId, error);
    }
  }

  async createContainer(
    databaseId: string,
    containerId: string,
    partitionKey: string
  ): Promise<Container> {
    try {
      const { container } = await this.client
        .database(databaseId)
        .containers.createIfNotExists(
          { id: containerId, partitionKey },
          { offerThroughput: 400 }
        );
      console.log("Container is created, Container id is", container.id);
      return container;
    } catch (error) {
      console.error(
        "Failed to create Container",
        databaseId,
        containerId,
        error
      );
    }
  }
}
