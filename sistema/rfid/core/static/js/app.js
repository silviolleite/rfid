const apiPath = 'http://localhost:3000/api';

const endpoints = {
    tags: `${apiPath}/tags`,
    logs: `${apiPath}/logs`,
};


const mqttConfig = {
    broker: 'broker.hivemq.com',
    //broker: 'broker.iot-br.com',
    topic: '/controle/ping',
    topic2: '/controle/pong',
    port: 8000
};

const http = axios.create({
    headers: {'Cache-Control': 'no-cache'}
});

