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
                if (log.status === 0){
                    log.status = 'Não autorizado'
                }else{
                    log.status = 'Acesso permitido'
                }
                if (log.access_type === 0){
                    log.access_type = 'Saída'
                }else{
                    log.access_type = 'Entrada'
                }
                table += `<tr>`;
                table += `<td>${log.id}</td>`;
                table += `<td>${log.id_user}</td>`;
                table += `<td>${log.id_tag}</td>`;
                table += `<td>${log.local}</td>`;
                table += `<td>${log.status}</td>`;
                table += `<td>${log.access_type}</td>`;
                table += `<td>${log.created_at}</td>`;
                table += `</tr>`;
            });
            logsTable.innerHTML = table;
        })
        .catch((err) => console.log);
};


$(document).ready(() => {
    updateTable();
});
