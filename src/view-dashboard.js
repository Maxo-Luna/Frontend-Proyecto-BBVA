/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "./shared-styles.js";

class Dashboard extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <h1>¡Bienvenido!</h1>
        <h4>Seleccioná cualquiera de las opciones del Menú para iniciar tus gestiones.</h4>
        <h4><u>Operaciones</u>: en esta sección poder realizar la consulta de tu saldo, asi como también realizar y consultar tus tranferencias.</h4>
        <h4><u>Consulta de cotización</u>: en esta sección poder realizar la consulta de la cotización del dólar.</h4>
        <br></br>
        <img src=images/manifest/icon-192x192.png>
      </div>
    `;
  }
}

window.customElements.define("view-dashboard", Dashboard);
