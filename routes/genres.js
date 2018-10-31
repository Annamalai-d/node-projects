const express = require('express');
const Joi = require('joi');
const router = express.Router();

const genres = [
    {id:1, name:'Action'},
    {id:2, name:'Comedy'},
    {id:3, name:'Drama'},
    {id:4, name:'Mystery'},
    {id:5, name:'Sports'},
    {id:6, name:'Technology'},
];
// get all geners
router.get('/', (req, res) => {
	res.send(genres);
});

// get genres by id
router.get('/:id', (req, res) => {
	// validating presence of the genre in array 
	const genre = genres.find(g => g.id === parseInt(req.params.id));
	if(!genre) return res.status(404).send('No Such Id found!');
	res.send(genre);
});

// creating new genre
router.post('/', (req, res) => {
	// validating
	const {error} = ValidateGenre(req.body);
	if(error) return res.send(error.details[0].message);
	// add the new genre to the list
	const genre = {
		id: genres.length + 1,
		name: req.body.name
	}
	genres.push(genre);
	res.send(genre);
});

// updating a genre
router.put('/:id', (req, res) => {
	// validating presence of the genre in array 
	const genre = genres.find(g => g.id === parseInt(req.params.id));
	if(!genre) return res.status(404).send('No Such Id found!');
  // validating the name of genre
	const {error} = ValidateGenre(req.body);
	if(error) return res.send(error.details[0].message);
	// updating the genres array
	genre.name = req.body.name;
	res.send(genre);
});

// deleting a genre
router.delete('/:id', (req, res) => {
	// validating presence of the genre in array
	const genre = genres.find(g => g.id === parseInt(req.params.id));
	if(!genre) return res.status(404).send('No Such Id found!');
	// Deleting the genre
	const index = genres.indexOf(genre);
	genres.splice(index, 1);
	res.send(genre);
});
// validating genre
function ValidateGenre(genre) {
	const schema = {
		name: Joi.string().min(4).required()
	}
	return Joi.validate(genre, schema);
}
module.exports = router;