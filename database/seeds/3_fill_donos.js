exports.seed = async function (knex) {
	await knex("donations").insert([
		{
			dateCreated: "2020-09-18 03:04:45",
			donationAmount: 123,
			projectID: 1,
			userID: 2,
		},
		{
			dateCreated: "2020-09-18 03:05:18",
			donationAmount: 456,
			projectID: 1,
			userID: 2,
		},
		{
			dateCreated: "2020-09-18 03:07:55",
			donationAmount: 789,
			projectID: 2,
			userID: 2,
		},
	]);
};
