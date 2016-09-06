var modules = {};

export default {

	get: function getModule(id) {
		return modules[id];
	},

	set: function setModule(id, module) {
		return modules[id] = module;
	}

}
