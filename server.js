let express = require('express');
let app = express();

app.use(express.static(__dirname+'/dist/chek-front-test-s'));

app.get('/*', (req, resp) => {
    resp.sendFile(__dirname+'/dist/chek-front-test-s/index.html')
});

app.listen(process.env.PORT || 4200);
