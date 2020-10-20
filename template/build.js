var fs = require('fs')
fs.writeFile('./try4.txt', 'HelloWorld', { 'flag': 'a' }, function(err) {
    if (err) {
        throw err;
    }
 
    console.log('Hello.');
 
    // 写入成功后读取测试
    fs.readFile('./try4.txt', 'utf-8', function(err, data) {
        if (err) {
            throw err;
        }
        console.log(data);
    });
});