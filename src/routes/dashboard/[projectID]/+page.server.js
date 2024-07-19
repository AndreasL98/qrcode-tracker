import Project from '$db/models/project';
import Visit from '$db/models/visit';

export async function load({ request, cookies, params }) {
	const { projectID } = params;

	const unSerializedProject = await Project.findById(projectID);
	const project = JSON.parse(JSON.stringify(unSerializedProject));

	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	const year = new Date().getFullYear();

	const unSerializedVisits = await Visit.find({
		project: projectID,
		month: { $in: months },
		year
	});
	const visits = JSON.parse(JSON.stringify(unSerializedVisits));

	// SUMMARIZE THE AMOUNT OF VISITS PER HOUR TO SHOW MOST POPULAR HOURS
	const visitsByTime = {};
	for (let monthlyVisits of visits) {
		for (let timeOfVisit of Object.keys(monthlyVisits.times)) {
			if (!visitsByTime[timeOfVisit]) {
				visitsByTime[timeOfVisit] = monthlyVisits.times[timeOfVisit];
			} else {
				visitsByTime[timeOfVisit] += monthlyVisits.times[timeOfVisit];
			}
		}
	}

	return {
		project,
		visits,
		visitsByTime
	};
}
