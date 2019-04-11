var omdb = require('../index');
var should = require('should');

describe('node-omdb', function () {
	it('should find me some movies', function (done) {
		omdb.find('Forrest', 'movie').then(function (d) {
			(d).should.be.a.Array;
			d[0].Title.should.be.exactly('Forrest Gump');
			done()
		}, function (err) {
			console.log(err);
			done(err);
		});
	});

	it('should get a specific serie', function (done) {
		omdb.get('Breaking Bad', 'series').then(function (serie) {
			serie.Title.should.be.exactly('Breaking Bad');
			serie.should.have.properties({
				Response: 'True'
			});
			done();
		});
	});
});