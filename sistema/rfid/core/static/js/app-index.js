const lastTag = document.getElementById('last-tag');
const statusTag = document.getElementById('status');

const mqttConnect = () => {
    return new Paho.MQTT.Client(
        mqttConfig.broker,
        parseInt(mqttConfig.port),
        "DZ-" + Date.now()
    );
};

const mqttConnect2 = () => {
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
        updateTable()
    }
};

const onMessageArrived2 = (message) => {
    const status = message.payloadString;
    const topic2 = message.destinationName;
    if (topic2 === mqttConfig.topic2) {
            console.log(status)
            if(status === '0'){
              statusTag.innerHTML = '<div class="notification is-danger"><h1 style="font-size: 150% !important"><strong style="color: #ffffff">NÃO AUTORIZADO!</strong></h1></div>'
            }else{
                statusTag.innerHTML = '<div class="notification is-success"><h1 style="font-size: 150% !important"><strong style="color: #ffffff">AUTORIZADO!</strong></h1></div>'
            }
        }
};
const mqtt2 = mqttConnect2();
mqtt2.onMessageArrived = onMessageArrived2


const mqtt = mqttConnect();
mqtt.onConnectionLost = onConnectionLost;
mqtt.onMessageArrived = onMessageArrived;

const onSuccess = () => {
    console.log('Brocker Connected')
    mqtt.subscribe(mqttConfig.topic, {qos: 1});
};


const onSuccess2 = () => {
    mqtt2.subscribe(mqttConfig.topic2);
}

const onFailure2 = (message) => {
    console.log(`Connection failed: ${message.errorMessage}`);
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
    const options2 = {
        timeout: 3,
        keepAliveInterval: 5,
        onSuccess: onSuccess2,
        onFailure: onFailure2
    };
    mqtt.connect(options);
    mqtt2.connect(options2);
};

connect();
