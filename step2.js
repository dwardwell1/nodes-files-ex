const { default: axios } = require('axios');
const fs = require('fs');

function cat(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log('Ya blew it...ERROR', err);
			process.kill(1);
		}
		console.log(data);
	});
}

async function webCat(path) {
	try {
		data = await axios.get(path);
		console.log(data.data);
	} catch (e) {
		console.log('bad URL', e);
	}
}

const argv = process.argv;

if (argv[2]) {
	if (argv[2].includes('http')) {
		webCat(argv[2]);
	} else {
		cat(argv[2]);
	}
}
