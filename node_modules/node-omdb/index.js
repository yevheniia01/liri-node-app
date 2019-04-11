var _ = require('lodash');
var Q = require('q');
var qs = require('querystring');
var http = require('http');

var defaults = this.defaults = {
	host: 'www.omdbapi.com',
	method: 'GET'
};

function req (options) {
	options = _.extend({}, defaults, options);

	var req = http.get(options);
	var data = '';
	var deferred = Q.defer();

	req.on('response', function (response) {
		response.setEncoding('binary');
		response.on('data', function (chunk) {
			data += chunk;
		}).on('end', function () {
			deferred.resolve(data);
		});
	}).on('error', function (err) {
		deferred.reject(err);
	}).end();

	return deferred.promise;
}

function request (params) {
	var config = _.extend({}, defaults, config);

	if(_.isObject(params)) {
		config.path = params = '/?' + qs.stringify(params);
	}

	return req(config).then(function (data) {
		return !_.isObject(data) ? JSON.parse(data) : data;
	});
}

module.exports = _.extend(function (params) {
	return request(params);
}, {
	get: function (id, type) {
		var params = {
			v: 1,
			r: 'json' // or 'xml'
		};

		if(_.isNumber(id)) {
			params.i = id;
		} else if(_.isString(id)) {
			params.t = id;
		}

		if(!_.isUndefined(type)) {
			params.type = type;
		}

		return request(params);
	},
	find: function (movieTitle, type) {
		var params = {
			v: 1,
			r: 'json' // or 'xml'
		};

		if(_.isObject(movieTitle)) {
			_.extend(params, movieTitle);
			movieTitle = undefined;
		}

		if(_.isString(movieTitle)) {
			params.s = movieTitle;
		}

		// If it's a number, then
		// you are searching for
		// the year of the release
		if(_.isNumber(type)) {
			params.y = type;
		}

		// Movie, series or episode
		if(!_.isUndefined(type)) {
			params.type = type;
		}

		return request(params).then(function (data) {
			if(!_.isUndefined(data.Search)) {
				data = data.Search;
			}

			return data;
		});
	}
});