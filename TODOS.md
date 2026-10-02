- Dar estilos a los componentes actuales
  - checkear especificidad de la clase active-filters
  - utilizar class binding `[class.active-filter]`
- Implementar filtros y ordenamientos del listado
  - simplificar two-way data-binding con template reference variables `#nameInput` / `#categorySelect`, vincular `[value]` y `(change)`para el `<select>` / `(input)` para el `<input>`
  - agregar una señal computada para modificar el texto del boton que limpia los filtros
- Dar estilo a la grilla de productos
  - agregar un `<ul>` con `class="product-grid"`, agregar elementos `<li>`
  ```css
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr));
    gap: 1rem;
    list-style: none;
  }
  ```
  - agregar `[style.color]` para modificar los colores de las partes de la tarjeta sin tener que agregar clases innecesarias
  - agregar la clase description para truncar el contenido de las tarjetas y que todas tengan **el mismo alto**
  ```css
  .description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
  }
  ```
- Dar estilo a la vista de detalles
- Refactorizar rutas para centralizar las cadenas literales
- Refactorizar formularios para usar SignalForms
- Refactorizar ventanas de confirmación/alerta por modales
- Refactorizar el acceso a datos para incluir almacén de estado
- Implementar interceptores http
