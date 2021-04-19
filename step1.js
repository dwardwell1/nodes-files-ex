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

cat('one.txt');

const argv = process.argv;

if (argv[2]) {
	cat(argv[2]);
}
