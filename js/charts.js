google.charts.load('current', { 'packages': ['table'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    fetch("https://localhost:7295/api/Movementdetails/top5")
        .then(response => response.json())
        .then(json => {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Producto');
            data.addColumn('string', 'Categoria');
            data.addColumn('number', 'Ventas');


            for (var i = 0; i < json.length; i++) {
                data.addRow([json[i].product, json[i].category, json[i].quantity1]);
            }

            var options = {
                title: 'Top 5 productos por categoria',
                showRowNumber: true,
                width: '100%',
                height: '100%'
            };

            var chart = new google.visualization.Table(document.getElementById('table-all'));
            chart.draw(data, options);
        })
        .catch(error => console.error());
}

/*String category = "";
            int cont = 0;
            int sum = 0;
            for (int i = 0; i < products.Count; i++)
            {
                if (products[i].Category != category)
                {
                    if (i != 0)
                    {
                        category = products[i].Category;
                        result.Add(new CategoryResult(products[i - 1].Category, sum));
                        cont = 1;
                        sum = products[i].Quantity1;
                        continue;
                    }
                    category = products[i].Category;
                    cont = 1;
                    sum = products[i].Quantity1;
                    continue;
                }
                if (cont < 5)
                {
                    cont++;
                    sum += products[i].Quantity1;
                }
            }
            */