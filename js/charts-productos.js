google.charts.load('current', { packages: ['corechart', 'bar', 'table', 'controls', 'gauge'] });
//google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var productid = document.getElementById("productSelect").value;
    var fechaInicio = document.getElementById("inputInicio").value;
    var fechaLimite = document.getElementById("inputLimite").value;

    fetch("https://localhost:7295/api/Movements/comportamientoproducto?productid=" + productid + "&fechaInicio=" + fechaInicio + "&fechaLimite=" + fechaLimite, { method: 'get' })
        .then(response => response.json())
        .then(json => {
            console.log(json);

            var dashboard = new google.visualization.Dashboard(
                document.getElementById("dashboard_div"));

            var yearSlider = new google.visualization.ControlWrapper({
                'controlType': 'NumberRangeFilter',
                'containerId': 'filter_div',
                'options': {
                    'filterColumnIndex': 2,
                    'ui': {
                        'labelStacking': 'vertical',
                        'label': 'Año'
                    }
                }
            });

            var pieChart = new google.visualization.ChartWrapper({
                'chartType': 'PieChart',
                'containerId': 'chart_div',
                'options': {
                    'pieSliceText': 'value',
                    'legend': 'right'
                },
                'view': {'columns':[1,3]}
            });

            var data = new google.visualization.DataTable();
            var data2 = new google.visualization.DataTable();

            data.addColumn('string', 'Mes');
            data.addColumn('number', 'Cantidad');

            data2.addColumn('string', 'Producto');
            data2.addColumn('string', 'Mes');
            data2.addColumn('number', 'Año');
            data2.addColumn('number', 'Cantidad');

            for (var i = 0; i < json.length; i++) {
                if (json[i].mes == 1) {
                    data.addRow(["Ene-" + json[i].año, json[i].cantidad]);
                    data2.addRow([json[i].nombre, "Ene", json[i].año, json[i].cantidad]);
                }
                else if (json[i].mes == 2) {
                    data.addRow(["Feb-" + json[i].año, json[i].cantidad]);
                    data2.addRow([json[i].nombre, "Feb", json[i].año, json[i].cantidad]);
                }
                else if (json[i].mes == 3) {
                    data.addRow(["Mar-" + json[i].año, json[i].cantidad]);
                    data2.addRow([json[i].nombre, "Mar", json[i].año, json[i].cantidad]);
                }
                else if (json[i].mes == 4) {
                    data.addRow(["Abr-" + json[i].año, json[i].cantidad]);
                    data2.addRow([json[i].nombre, "Abr", json[i].año, json[i].cantidad]);
                }
                else if (json[i].mes == 5) {
                    data.addRow(["May-" + json[i].año, json[i].cantidad]);
                    data2.addRow([json[i].nombre, "May", json[i].año, json[i].cantidad]);
                }
                else if (json[i].mes == 6) {
                    data.addRow(["Jun-" + json[i].año, json[i].cantidad]);
                    data2.addRow([json[i].nombre, "Jun", json[i].año, json[i].cantidad]);
                }
                else if (json[i].mes == 7) {
                    data.addRow(["Jul-" + json[i].año, json[i].cantidad]);
                    data2.addRow([json[i].nombre, "Jul", json[i].año, json[i].cantidad]);
                }
                else if (json[i].mes == 8) {
                    data.addRow(["Ago-" + json[i].año, json[i].cantidad]);
                    data2.addRow([json[i].nombre, "Ago", json[i].año, json[i].cantidad]);
                }
                else if (json[i].mes == 9) {
                    data.addRow(["Sep-" + json[i].año, json[i].cantidad]);
                    data2.addRow([json[i].nombre, "Sep", json[i].año, json[i].cantidad]);
                }
                else if (json[i].mes == 10) {
                    data.addRow(["Oct-" + json[i].año, json[i].cantidad]);
                    data2.addRow([json[i].nombre, "Oct", json[i].año, json[i].cantidad]);
                }
                else if (json[i].mes == 11) {
                    data.addRow(["Nov-" + json[i].año, json[i].cantidad]);
                    data2.addRow([json[i].nombre, "Nov", json[i].año, json[i].cantidad]);
                }
                else if (json[i].mes == 12) {
                    data.addRow(["Dic-" + json[i].año, json[i].cantidad]);
                    data2.addRow([json[i].nombre, "Dic", json[i].año, json[i].cantidad]);
                }

            }

            var options = {
                chart: {
                    title: 'Comportamiento de un producto en el periodo: ' + fechaInicio + ' hasta ' + fechaLimite
                }
            };
            var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
            chart.draw(data, options);

            var table = new google.visualization.Table(document.getElementById('table_div'));
            table.draw(data2, { showRowNumber: true, width: '100%', height: '100%' });
            /*var options = {
                title: 'Comportamiento de un producto'
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechart'));
            chart.draw(data, options);*/
            dashboard.bind(yearSlider, pieChart);

            // Draw the dashboard.
            dashboard.draw(data2);
        })
        .catch(error => console.error());

}

