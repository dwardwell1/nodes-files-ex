const { default: axios } = require('axios');
const fs = require('fs');
const process = require('process');

function cat(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log('Ya blew it...ERROR', err);
			process.kill(1);
		}
		console.log(data);
		return data;
	});
}

async function webCat(path) {
	try {
		data = await axios.get(path);
		console.log(data.data);
		return data.data;
	} catch (e) {
		console.log('bad URL', e);
	}
}

const argv = process.argv;

if (argv.length > 2) {
	if (argv[2] === '-out') {
		if (argv[4].includes('http')) {
			let res = webCat(argv[4]);

			fs.appendFile(argv[3], res, 'utf8', (err) => {
				if (err) {
					console.log('errror dumbar', err);
					process.kill(1);
				}
				console.log('it worked');
			});
		} else {
			let resp = cat(`${argv[4]}`);
			console.log(argv[4]);
			fs.appendFile(argv[3], resp, 'utf8', (err) => {
				if (err) {
					console.log('errror dumbass', err);
					process.kill(1);
				}
				console.log('it worked');
			});
		}
	} else {
		if (argv[2].includes('http')) {
			webCat(argv[2]);
		} else {
			cat(argv[2]);
		}
	}
}

//THIS AINTWORKING
// 41 and 31 doesnt work
