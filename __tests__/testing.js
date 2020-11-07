import path from 'path';

const getPath = (name) => path.join(__dirname, name);
const filePath1 = getPath('file_source/file1.json');
const filePath2 = getPath('file_source/file2.json');
console.log(filePath1);
console.log(filePath2);
