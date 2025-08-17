
var unCliente = () => {
    var clienteid = document.getElementById("ClientesModelId").value;
    //fetch("/api/ProductosApi/"+ clienteid)

    /*fetch(`/api/ClientesApi/${clienteid}`)
        .then(
            uncliente => {
                if (!uncliente.ok) {
                    alert("Error al obtener el cliente")
                }
                return uncliente.json();
            })
        .then(datos => {
            console.log(datos)
            document.getElementById("Correo").value = datos.email;
            document.getElementById("Cedula_RUC").value = datos.cedula_RUC;
            document.getElementById("Telefono").value = datos.telefono;
            document.getElementById("Direccion").value = datos.direccion;
        }).catch(
            error => {
                alert("Ocucion un error:", error)
            }
        )*/

    $.get(`/api/ClientesApi/${clienteid}`, (uncliente) => {
        document.getElementById("Correo").value = uncliente.email;
        document.getElementById("Cedula_RUC").value = uncliente.cedula_RUC;
        document.getElementById("Telefono").value = uncliente.telefono;
        document.getElementById("Direccion").value = uncliente.direccion;
    })
}


 

var Lista_Productos = () => {
    $.get(`/api/ProductosApi`,async (listaproductos) => {
        html = "";
        $.each(listaproductos, (index, producto) => {
            html += `<tr>
                <td> ${producto.nombre} </td>
                <td> ${producto.precio} </td>
                <td> <input type='number' min="1" value="0" id="qty_${producto.id}"/> </td>
                <td> <button type="button"
                data-id="${producto.id}"
                data-nombre="${producto.nombre}"
                data-precio="${producto.precio}"
                onclick="cargarproducto(this)"
                class="btn-success">+</button> </td>
            `;
        })
        await $("#Lista_prodcutos").html(html)
    })
}

var cargarproducto = (producto) => {
    const id = producto.dataset.id
    const nombre = producto.dataset.nombre
    const precio = parseFloat(producto.dataset.precio)
    const cantidad = document.getElementById(`qty_${id}`).value


    //const tabla = document.getElementById("productosTable")
   // const tbody = tabla.querySelector('tbody')
   // const btnAdd = document.getElementById("btnAgregarFila")
    //const subTotal = document.getElementById("Sub_total")
}


function Listar_Clientes() {
    $.ajax({
        url: '/api/ClientesApi/Activos', // Cambia esta URL según tu API
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var tbody = $('#clientes-tbody');
            tbody.empty();
            $.each(data, function (i, cliente) {
                var row = `<tr>
                    <td>${i + 1}</td>
                    <td>${cliente.nombres}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.cedula_RUC}</td>
                    <td>${cliente.telefono}</td>
                    <td>
                        <a class="btn btn-outline-primary" href="/ClienteQuery/Detalle/${cliente.id}"><i class="fa-solid fa-circle-info"></i></a>
                        <a class="btn btn-outline-success" href="/ClienteQuery/Editar/${cliente.id}"><i class="fa-solid fa-pen-to-square"></i></a>
                        <a class="btn btn-outline-danger" href="/ClienteQuery/Eliminar/${cliente.id}"><i class="fa-solid fa-trash"></i></a>
                    </td>
                </tr>`;
                tbody.append(row);
            });
        },
        error: function () {
            alert('Error al cargar los clientes.');
        }
    });
}


function Cargar_Cliente(id) {
    $.get(`/api/ClientesApi/${id}`, (cliente) => {
        $("#id").val(cliente.id);
        $("#nombre").text(cliente.nombres);
        $("#email").text(cliente.email);
        $("#telefono").text(cliente.telefono);
        $("#direccion").text(cliente.direccion);
        $("#cedula_RUC").text(cliente.cedula_RUC);
        $("#create_At").text(cliente.create_At);
        $("#update_At").text(cliente.update_At);
        $("#isDelete").text(cliente.isDelete);
    });
    $("#btnEditar").click(function () {
        window.location.href = `/ClienteQuery/Editar/${id}`;
    });
    $("#btnEliminar").attr("onclick", `Eliminar_Cliente(${id})`);

}


function Cargar_Cliente_Edicion(id) {
    $.ajax({
        url: '/api/ClientesApi/' + id,
        type: 'GET',
        success: function (data) {
            if (data) {
                $('#nombres').val(data.nombres);
                $('#email').val(data.email);
                $('#telefono').val(data.telefono);
                $('#direccion').val(data.direccion);
                $('#cedula_RUC').val(data.cedula_RUC);
                $('#id').val(data.id);
                $('#create_At').val(data.create_At);
                $('#update_At').val(data.update_At);
                $('#isDeleted').val(data.isDeleted);
               $("#btnEditar").attr("onclick", `Editar_Cliente(${id})`);
            }
        },
        error: function () {
            alert('Error al cargar los datos del cliente.');
        }
    });
}

function Eliminar_Cliente(id) {
    $.get(`/api/ClientesApi/${id}`, (cliente) => {
        console.log(cliente);
        cliente.isDelete = true;
        $.ajax({
            url: `/api/ClientesApi/${id}`,
            type: "PUT",
            data: JSON.stringify(cliente),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
        .done(function () {
            alert("Cliente eliminado exitosamente.");
            window.location.href = "/ClienteQuery/Index";
        })
        .fail(function (error) {
            alert("Error al eliminar cliente: ");
            console.error("Error details:", error);
        });
    });
}
 


function Editar_Cliente(id) {
    const cliente = {
        id: id,
        nombres: $("#nombres").val(),
        email: $("#email").val(),
        telefono: $("#telefono").val(),
        direccion: $("#direccion").val(),
        cedula_RUC: $("#cedula_RUC").val(),
        create_At: $("#create_At").val() || new Date().toISOString(),
        update_At: new Date().toISOString(),
        isDelete: $("#isDeleted").val() === "true" ? true : false
    };
    console.log(cliente);
    $.ajax({
        url: `/api/ClientesApi/${id}`,
        type: "PUT",
        data: JSON.stringify(cliente),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    })
    .done(function () {
        alert("Cliente actualizado exitosamente.");
        window.location.href = "/ClienteQuery/Index";
    })
    .fail(function (error) {
        alert("Error al actualizar cliente: ");
        console.error("Error details:", error);
    });
}
function Crear_Cliente(){
    const cliente = {
        nombres: $("#Nombres").val(),
        email: $("#Email").val(),
        telefono: $("#Telefono").val(),
        direccion: $("#Direccion").val(),
        cedula_RUC: $("#Cedula_RUC").val(),
        create_At: new Date().toISOString(),
        update_At: "0001-01-01",
        isDelete: false
    };

    $.ajax({
        url: "/api/ClientesApi",
        type: "POST",
        data: JSON.stringify(cliente),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    })
    .done(function () {  alert("Cliente creado exitosamente.");
            window.location.href = "/ClienteQuery/Index";
        })
        .fail(function (error) {
            alert("Error al crear cliente: " + error.responseText);
        });
}