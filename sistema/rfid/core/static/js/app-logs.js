const logsTable = document.getElementById('logs-table');

const Logs = {
  all: () => {
    return http.get(endpoints.logs);
  }
};

const updateTable = () => {
  Logs.all()
    .then((logs) => logs.data)
    .then((logs) => {
      let table = '';

      logs.forEach((log) => {
        table += `<tr>`;
        table += `<td>${log.id}</td>`;
        table += `<td>${log.id_user}</td>`;
        table += `<td>${log.id_tag}</td>`;
        table += `<td>${log.status}</td>`;
        table += `</tr>`;
      });
      logsTable.innerHTML = table;
    })
    .catch((err) => console.log);
};


$(document).ready(() => {
  updateTable();
});
