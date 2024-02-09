import Dexie from 'dexie';

// Define your database
class RubiksCubeDB extends Dexie {
  sessions: Dexie.Table<Session, number>; // `number` is the type of the primary key

  constructor() {
    super('RubiksCubeDB');
    this.version(1).stores({
      sessions: '++id, startDate, attempts',
    });
    // Define the sessions table
    this.sessions = this.table('sessions');
  }
}

interface Attempt {
  id?: number;
  startDate: Date;
  isValid: boolean;
  totalTime: number | null;
  timeToCross: number | null;
}

interface Session {
  id?: number;
  startDate: Date;
  attempts: Attempt[];
}

const db = new RubiksCubeDB();

export default db;
