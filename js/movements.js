$(document).ready(function () {
    $('#example').DataTable({
        columns: [
            { data: 'id' },
            { data: 'date' },
            { data: 'type' },
            { data: 'warehouse' },
            { data: 'action', orderable: false}
        ],
        responsive: true,
        buttons: [
            'copy', 'excel', 'pdf'
        ],
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json'
        }
    });
});