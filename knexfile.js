// Update with your config settings.
require('dotenv').config();

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './database/dev.sqlite3',
		},
		migrations: {
			directory: './database/migrations',
		},
		seeds: { directory: './database/seeds' },
		useNullAsDefault: true,
		pool: {
			afterCreate: (conn, done) => {
				// runs after a connection is made to the sqlite engine
				conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
			},
		},
	},

	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		pool: {
			min: 0,
			max: 10,
		},
		migrations: {
			directory: './database/migrations',
		},
		seeds: { directory: './database/seeds' },
	},
};
