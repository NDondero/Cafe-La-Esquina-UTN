# TODOS

## Por hacer

- Refactorizar ventanas de confirmación/alerta por modales
  - crear componente DialogModal
    - difnir output básico `readonly closed = output()`
    - definir `viewChild.required()` para la referencia al `<dialog>`
    - llamar al método `showModal()` en el hook `afterNextRender()` dentro del `constructor()`
    - agregar boton para cerrar en el template
    - agregar `<ng-content>` dentro del dialog para proyectar cualquier otro componente dentro
    - escuchar el evento `(close)` y emitir o llamar a un método `onClose()`
    - definir reglas de posicionamiento y modelo de caja y posicionar al boton de cierre
      ```css
      dialog {
        position: fixed;
        inset: 50% auto auto 50%;
        transform: translate(-50%, -50%);

        inline-size: fit-content;
        min-inline-size: min(42rem, calc(100vw - 2rem));
        max-block-size: calc(100vh - 2rem);

        padding: 1.5rem;
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        background: var(--bg-primary);
        color: var(--text-primary);

        button {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          min-inline-size: 44px;
          min-block-size: 44px;
        }
      }
      ```
  - crear componente ConfirmDialog
    - definir un output que emita `boolean`
    - difinir tantos inputs como se crean necesarios, mínimo el mensaje pero también se pueden definir inputs para los textos de los botones para mayor perzonalización. Se pueden definir valores por defecto también (y se recomienda a menos que los inputs sean requeridos, lo cual es más incómodo)
    - mismo juego que con el modal anterior para abrir el modal
    - reglas de css muy similares, si se quiere se pueden extraer a la hoja de estilos generales. modificar el `min-inline-size` para un valor más coherente con una ventana pequeña, por ejemplo `16rem`
    - el template debería tener al menos el mensaje y botones para cancelar o confirmar
    - escuchar el evento `(cancel)` en el `<dialog>` para emitir cancelación al cerrar con la tecla escape
    - opcionalmente escuchar el click en el backdrop para cerrar la ventana de confirmación
  - Consumir el componente el cualquier otro componente a elección
    - de todas las opciones, la más cómoda es una única señal que contenga un mensaje o `null`
    ```ts
    protected readonly confirmationRequest = signal<string | null>(null);
    ```
    - agregar un método que reciba un mensaje y retorne una `Promise<boolean>` en la que se modifique el mensaje de la señal. La parte extraña: agregar un miembro de clase que capture el resolve.
    ```ts
    private resolveConfirmation: ((confirmed: boolean) => void) | null = null;

    requestConfirmation(message: string) {
      return new Promise<boolean>((resolve) => {
        this.resolveConfirmation = resolve;
        this.confirmationRequestState.set(message);
      });
    }
    ```
    - agregar un método para resolver la confirmación
    ```ts
    onConfirmationClosed(confirm: boolean) {
      const resolve = this.resolveConfirmation;
      if (!resolve) return;

      this.resolveConfirmation = null;
      this.confirmationRequestState.set(null);
      resolve(confirm);
    }
    ```
    - agregar la funcionalidad en un template, por ejemplo:
    ```ts
    @if (confirmationRequest(); as message) {
      <!-- sintaxis en Control Flow en la documentación -->
      <app-confirm-dialog
        [message]="message"
        (closed)="onConfirmationClosed($event)"
      ></app-confirm-dialog>
    }
    ```
    - migrar a un servicio de confirmación: la misma funcionalidad hay que agregarla en `ProductForm`, `ProductDetails` y `ProductList`
    - conviene modificar la señal a privada y exponer públicamente `.asReadonly()`
  - crear componente NotificationHost y un servicio NotificationService
    - ahora que sabemos crear un servicio que está vinculado con el control de flujo de un componente aún sin conocerlo podemos armar un NotificationService con más confianza
    ```ts
    private readonly currentNotificationState = signal<string | null>(null);
    readonly current = this.currentNotificationState.asReadonly();
    private timeoutId: ReturnType<typeof setTimeout> | undefined;

    show(message: string) {
      clearTimeout(this.timeoutId);
      this.currentNotificationState.set(message);
      this.timeoutId = setTimeout(() => this.dismiss(), 4000);
    }

    dismiss() {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
      this.currentNotificationState.set(null);
    }
    ```
    - la parte más engorrosa de esto posicionar la notificación y que quede decente, no estamos manejando colas de mensajes, pero se podría extender el servicio para lograrlo. A modo de ejemplo, el componente quedaría así, habiendo inyectado el servicio:
    ```ts
    @if (notificationService.current(); as notification) {
      <section class="notification">
        <p>{{ notification }}</p>
        <button type="button" (click)="notificationService.dismiss()">
          Cerrar
        </button>
      </section>
    }
    ```
    ```css
    :host {
      position: fixed;
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 1rem;
    }

    .notification {
      position: fixed;
      inset: 80% 1rem auto auto;

      inline-size: fit-content;
      min-inline-size: min(16rem, calc(100vw - 2rem));
      max-block-size: calc(100vh - 2rem);

      overflow: auto;
      overscroll-behavior: contain;
      padding: 1.5rem;

      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background: var(--bg-primary);
      color: var(--text-primary);
      box-shadow: 0 0 1rem 1rem #0002;
    }
    ```
    - montar el NotificationHost en el componente raiz **porque es el único que no es destruído por enrutamiento**
- Refactorizar el acceso a datos para incluir almacén de estado
- Implementar interceptores http

## Completado

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
    min-block-size: 2lh;
  }
  ```
- Dar estilo a la vista de detalles
- Refactorizar rutas para centralizar las cadenas literales
- Refactorizar formularios para usar SignalForms
  - definir modelo de datos `signal<ProductFormModel>({ ... })`
  - inicializar el formulario con `form()`
    - primer parámetro `WritableSignal`
    - segundo parámetro función de validación de schema
    - tercer parámetro objeto de configuracion con clave `submission` que a su vez es un objeto con las claves `action` y opcionalmente `onInvalid`, ambas funciones que se ejecutan en cada caso
  - modificar lo que haga falta para compatibilizar el cambio de tipo de dato del formulario
  - cambiar las directivas y escucha de eventos del elemento `<form>` a `[formRoot]`
  - cambiar las directivas `formControlName` por `[formField]`
  - aprovechar la señal `submitting()` para el texto del botón 
  - cambiar los patrones de errores a otros más adecuados para el enfoque de SignalForms