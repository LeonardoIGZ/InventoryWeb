google.charts.load('current', { 'packages': ['table'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    fetch("https://localhost:7295/api/Movementdetails/top5")
        .then(response => response.json())
        .then(json => {

            let category = "";
            let lastCategory = "";
            let cont = 0;
            let sum = 0;
            let dataArray = [];

            for (var i = 0; i < json.length; i++) {
                if (json[i].category != category) {
                    if (i != 0) {
                        lastCategory = category;
                        category = json[i].category;
                        var obj = {
                            category: lastCategory,
                            total: sum
                        };
                        dataArray.push(obj);
                        cont = 1;
                        sum = json[i].quantity1;
                        continue;
                    }
                    category = json[i].category;
                    cont = 1;
                    sum = json[i].quantity1;
                    continue;
                }
                if (cont < 5) {
                    cont++;
                    sum += json[i].quantity1;
                }
                if (cont == 5 && i == json.length-1){
                    cont = 0;
                    var obj = {
                        category: category,
                        total: sum
                    };
                    dataArray.push(obj);
                }
            }

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Categoria');
            data.addColumn('number', 'Ventas totales');


            for (var i = 0; i < dataArray.length; i++) {
                data.addRow([dataArray[i].category, dataArray[i].total]);
            }

            var options = {
                title: 'Ventas por categoria',
                showRowNumber: true,
                width: '100%',
                height: '100%'
            };

            var chart = new google.visualization.Table(document.getElementById('table-category'));
            chart.draw(data, options);
        })
        .catch(error => console.error());
}