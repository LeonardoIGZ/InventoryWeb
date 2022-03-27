$(document).ready(function () {
    $('#example').DataTable({
        columns: [
            { data: 'id' },
            { data: 'product', responsivePriority: '1'},
            { data: 'category' },
            { data: 'stock' },
            { data: 'level' },
            { data: 'action', orderable: false}
        ],
        "createdRow": function (row, data, dataIndex) {
            if (parseInt(data.level,10) > parseInt(data.stock,10)) {
                $(row).addClass("bg-danger bg-opacity-25");
            }
        },
        responsive: true,
        buttons: [
            'copy', 'excel', 'pdf'
        ],
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json'
        }
    });
});