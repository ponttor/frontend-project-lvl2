import path from 'path';

const getPath = (name) => path.join(__dirname, name);
const plain1 = getPath('file_source/file1.json');
const plain2 = getPath('file_source/file2.json');
console.log(plain1);
console.log(plain2);
