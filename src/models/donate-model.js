const db = require("../../database/config");

// (create) insert
// inserts dono to table
async function insert(donation) {
	return db("donations").insert(donation);
}
// findById
// find a specfifc dono
async function findById(id) {
	return db("donations").where({ id }).first();
}

// findByUserID
// returns donations user invested
async function findByUserID(userID) {
	return db("donations").where({ userID });
}

// findByProjectID
// returns ALL donos for a project
async function findByProjectID(projectID) {
	return db("donations").where({ projectID });
}

module.exports = {
	insert,
	findById,
	findByUserID,
	findByProjectID,
};
