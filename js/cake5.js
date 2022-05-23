google.charts.load('current', { 'packages': ['corechart', 'bar', 'table'] });
google.charts.setOnLoadCallback(drawChartP);

function drawChartP() {
    var fecha = document.getElementById("Fecha").value;
    fetch("https://localhost:7295/api/Movements/TopTrimestre?fecha="+fecha, { method: 'get' })
        .then(response => response.json())
        .then(json => {
            var data = new google.visualization.DataTable();
            var data2 = new google.visualization.DataTable();
            
            data.addColumn('string', 'Nombre');
            data.addColumn('number', 'Ventas');

            data2.addColumn('string', 'Nombre');
            data2.addColumn('number', 'Ventas');

            for (var i = 0; i < json.length; i++) {
                data.addRow([json[i].nombre, json[i].cantidad]);
                data2.addRow([json[i].nombre, json[i].cantidad]);
            }

            var options = {
                title: 'Ventas Anuales'
            };

            var chart = new google.visualization.BarChart(document.getElementById('cake-top'));
            chart.draw(data, options);

            var table = new google.visualization.Table(document.getElementById('table-top'));
            table.draw(data2, { showRowNumber: true, width: '100%', height: '100%' });
        })
        .catch(error => console.error());
}