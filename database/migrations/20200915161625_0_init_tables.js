exports.up = async function (knex) {
	await knex.schema.createTable('users', (table) => {
		table.increments('id');
		table.string('username').unique().notNullable();
		table.string('password').notNullable();
		table.string('email').unique().notNullable();
		table.string('userRole').notNullable();
		table.timestamp('dateCreated').defaultTo(knex.fn.now());
		table.timestamp('dateUpdated').defaultTo(knex.fn.now());
		table.string('avatarUrl');
		table.string('address_street');
		table.string('address_city');
		table.string('address_state');
		table.string('address_zip');
		table.string('address_country');
		table.string('firstName');
		table.string('lastName');
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists('users');
};
