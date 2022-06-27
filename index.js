import http from 'http';


const host = '127.0.0.1';
const port = 8000;

const server = http.createServer((req, res) => {

    switch (req.method) {
        case 'GET':
            switch (req.url) {
                case '/one':
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Here we go again!');
                    break;
            }
            break;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello!');

});

server.listen(port, host, () => {
    console.log(`Server had been started at ${host}:${port}`);
});