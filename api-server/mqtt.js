const mqtt = require('mqtt')
  , request = require('request-promise')
  , config = require('./config/config');

const client = mqtt.connect(`mqtt://${config.broker.host}`);

const rfidPingTopic = '/controle/ping';
const rfidPongTopic = '/controle/pong';

client.on('connect', () => {
  console.log(`Connection successfully to ${config.broker.host}`);
  client.subscribe(rfidPingTopic);
});

const authorizeRfid = (topic, tag, place) => {
  request(`${config.api.endpoints.tags}tag/${tag}/${place}`)
    .then((data) => JSON.parse(data))
    .then((result) => formatPayload(result))
    .then((payload) => createLog(payload, place))
    .then((status) => sendPong(status))
    .catch((err) => console.log(err));
};

client.on('message', (topic, message) => {
  if (rfidPingTopic !== topic) return;
  console.log('Tag: '+ message)
  const msg = (message.toString()).split("-", 2);
  const tag = msg[0];
  const place = msg[1]

 authorizeRfid(topic, tag, place);
});


const formatPayload = (result) => {
  const payload = {
    'data': result,
    'status': 0,
    'access': 2
  };
  if (!result.tag || result.state === 0) {
    return payload;
  }
  payload.status = 1;
  return payload;
};

const createLog = (payload, place) => {
  if (!payload.data.tag) return payload.status;
  let access = 0
  if (payload.data.access !== 1)
        access = 1

  const log = {
    user_id: payload.data.user_id,
    tag_id: payload.data.id,
    status: payload.status,
    place_id: place,
    access_type: access
  };

  const options = {
    method: 'POST',
    uri: config.api.endpoints.log,
    body: log,
    json: true
  };

  request(options)
    .then((res) => (res))
    .catch((err) => console.log('err'));

  return payload.status;
};

const sendPong = (state) => {
  console.log(`Acesso ${state ? 'permitido' : 'bloqueado'}!`);
  client.publish(rfidPongTopic, state.toString());
};
