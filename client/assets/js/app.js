const apiPath = 'http://localhost:3000/api';

const endpoints = {
  users: `${apiPath}/users`,
  tags: `${apiPath}/tags`,
  logs: `${apiPath}/logs`,
};


const mqttConfig = {
  broker: 'broker.hivemq.com',
  //broker: 'broker.iot-br.com',
  topic: '/controle/ping',
  port: 8000
};

const http = axios.create({
  headers: {'Cache-Control': 'no-cache'}
});

const alert = $('#alert');

const successMessage = (message) => {
  alert.removeClass('hidden').addClass('is-success').find('.message-text').html(message);
};
const dangerMessage = (err) => {
  alert.removeClass('hidden').addClass('is-danger').find('.message-text').html('Erro:: ' + err);
};

$(document).ready(() => {
  $('.delete').on('click', function () {
    $(this).parent().hide();
  });
});
