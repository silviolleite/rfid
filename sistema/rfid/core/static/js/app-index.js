const lastTag = document.getElementById('last-tag');

const mqttConnect = () => {
  return new Paho.MQTT.Client(
    mqttConfig.broker,
    parseInt(mqttConfig.port),
    "DZ-" + Date.now()
  );
};

const onConnectionLost = (responseObject) => {
  const errorMessage = responseObject.errorMessage;
  console.log(`Status: ${errorMessage}`);
};

const onMessageArrived = (message) => {
  const uuid = message.payloadString;
  const topic = message.destinationName;
  console.log(`Topic -> ${topic} -> uuid -> ${uuid}`);

  if (topic === mqttConfig.topic) {
    lastTag.innerHTML = uuid;
  }
};

const mqtt = mqttConnect();
mqtt.onConnectionLost = onConnectionLost;
mqtt.onMessageArrived = onMessageArrived;

const onSuccess = () => {
  console.log('Brocker Connected')
  mqtt.subscribe(mqttConfig.topic, {qos: 1});
};

const onFailure = (message) => {
  console.log(`Connection failed: ${message.errorMessage}`);
};

const connect = () => {
  const options = {
    timeout: 3,
    keepAliveInterval: 5,
    onSuccess: onSuccess,
    onFailure: onFailure
  };
  mqtt.connect(options);
};

connect();
