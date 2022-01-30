
/**
 * Represents a list of users.
 */
 export class Watcher {
    constructor(json: any) {
      if (json) {
        this.userId = json.userId;
      }
    }
    userId: string;
 }  