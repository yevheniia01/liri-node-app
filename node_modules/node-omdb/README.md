# node-omdb

### Installation
```
npm install --save node-omdb
```

### Usage
```js
omdb.find('Forrest', 'movie').then(function (movie) {
	(movie).should.be.a.Array;
	movie[0].Title.should.be.exactly('Forrest Gump');
});

omdb.get('Breaking Bad', 'series').then(function (serie) {
	serie.Title.should.be.exactly('Breaking Bad');
	serie.should.have.properties({
		Response: 'True'
	});
});
```