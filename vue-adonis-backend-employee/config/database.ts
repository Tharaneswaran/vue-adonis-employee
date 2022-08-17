import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  // Default connection
  connection: Env.get('DB_CONNECTION'),

  // List of available connections
  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: Env.get('PG_HOST','localhost') as string,   
        port: Env.get('PG_PORT','5342'),
        user: Env.get('PG_USER','postgres') as string,
        password: Env.get('PG_PASSWORD', 'tharan1610') as string,
        database: Env.get('PG_DB_NAME','employeeAsses') as string,
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: true,
      debug: false,
    },
  }
}

export default databaseConfig
