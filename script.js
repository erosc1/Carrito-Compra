const carrito = [];

function agregarAlCarrito(nombre, precio) {
    const index = carrito.findIndex(item => item.nombre === nombre);

    if (index === -1) {
        // Producto nuevo
        carrito.push({ nombre, precio, cantidad: 1 });
    } else {
        // Incrementar cantidad
        carrito[index].cantidad++;
    }
    renderizarCarrito();
}

function eliminarDelCarrito(nombre) {
    const index = carrito.findIndex(item => item.nombre === nombre);

    if (index !== -1) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
        } else {
            carrito.splice(index, 1);
        }
    }
    renderizarCarrito();
}

function renderizarCarrito() {
    const carritoBody = document.getElementById('carrito-body');

    if (carrito.length === 0) {
        carritoBody.innerHTML = `<tr>
            <td colspan="5">Carrito vacío, empieza a comprar</td>
        </tr>`;
        return;
    }

    carritoBody.innerHTML = '';
    carrito.forEach(item => {
        const total = item.precio * item.cantidad;
        carritoBody.innerHTML += `
            <tr>
                <td>${item.cantidad}</td>
                <td>${item.nombre}</td>
                <td>${item.precio}€</td>
                <td>${total}€</td>
                <td>
                    <button class="btn-eliminar" onclick="eliminarDelCarrito('${item.nombre}')">Eliminar</button>
                    <button class="btn-eliminar-todo-producto" onclick="eliminarTodoDeProducto('${item.nombre}')">Eliminar Todo</button>
                </td>
            </tr>
        `;
    });
}
function pagar() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de pagar.");
        return;
    }

    // Calcular el total del carrito
    const total = carrito.reduce((acumulador, item) => acumulador + (item.precio * item.cantidad), 0);

    // Mostrar el alert con el total
    alert(`El total de tu pedido es: ${total}€\n¡Gracias por tu compra!`);

    // Vaciar el carrito después del pago
    carrito = [];
    renderizarCarrito();
}

function eliminarTodo() {
    if (carrito.length === 0) {
        alert('El carrito ya está vacío.');
        return;
    }

    const confirmar = confirm('¿Estás seguro de que deseas eliminar todos los artículos del carrito?');
    if (confirmar) {
        carrito.length = 0; // Vaciar el carrito
        renderizarCarrito();
        alert('Se han eliminado todos los productos del carrito.');
    }
}

function eliminarTodoDeProducto(nombre) {
    const index = carrito.findIndex(item => item.nombre === nombre);

    if (index !== -1) {
        const confirmar = confirm(`¿Estás seguro de que deseas eliminar todos los "${nombre}" del carrito?`);
        if (confirmar) {
            carrito.splice(index, 1); // Elimina completamente el producto del carrito
            renderizarCarrito();
            alert(`Se han eliminado todos los "${nombre}" del carrito.`);
        }
    }
}
