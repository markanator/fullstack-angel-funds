exports.up = async function (knex) {
	await knex.schema.createTable('projects', (table) => {
		table.increments('id');
		table.timestamp('dateCreated').defaultTo(knex.fn.now());
		table.timestamp('dateUpdated').defaultTo(knex.fn.now());
		table
			.timestamp('goalFundingDate')
			.notNullable()
			.defaultTo(knex.fn.now());
		table.string('projectTitle').notNullable();
		table.string('projectStory').notNullable();
		table.string('projectHeroImage');
		table.integer('goalFunding').notNullable();
		table.integer('currentFunding').defaultTo(0);

		table
			.integer('userID')
			.unsigned()
			.references('id')
			.inTable('users')
			.notNullable()
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists('projects');
};
