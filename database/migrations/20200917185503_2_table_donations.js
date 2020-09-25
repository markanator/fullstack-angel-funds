exports.up = async function (knex) {
	await knex.schema.createTable("donations", (table) => {
		table.increments("id");
		table.timestamp("dateCreated").defaultTo(knex.fn.now());
		table.integer("donationAmount").notNullable();
		table
			.integer("projectID")
			.unsigned()
			.references("id")
			.inTable("projects")
			.notNullable()
			.onDelete("CASCADE")
			.onUpdate("CASCADE");
		table
			.integer("userID")
			.unsigned()
			.references("id")
			.inTable("users")
			.notNullable()
			.onDelete("CASCADE")
			.onUpdate("CASCADE");
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists("donations");
};
