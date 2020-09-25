const db = require('../../database/config');

function fetchAll() {
	return db('projects');
}

function findById(id) {
	return db('projects').where({ id }).first();
}

async function insert(projectData) {
	const [projectID] = await db('projects')
		.insert(projectData)
		.returning('id');
	return findById(projectID);
}

async function update(projectData, id) {
	await db('projects').update(projectData).where({ id });
	return findById(id);
}

function remove(id) {
	return db('projects').delete().where({ id });
}

function fetchByUserID(id) {
	return db('projects')
		.join('users', 'users.id', '=', 'projects.userID')
		.where('users.id', id)
		.select(
			'projects.id as projectID',
			'projects.dateCreated',
			'projects.goalFundingDate',
			'projects.projectTitle',
			'projects.projectStory',
			'projects.projectHeroImage',
			'projects.goalFunding',
			'projects.currentFunding',
			'users.id as userID',
			'users.username',
			'users.avatarUrl',
			'users.firstName',
			'users.lastName'
		);
}

module.exports = {
	fetchAll,
	findById,
	insert,
	update,
	remove,
	fetchByUserID,
};
