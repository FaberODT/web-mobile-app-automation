var zipper = require('zip-local');

zipper.sync.zip("./{{provide the folder path here}}").compress().save("pack.zip");