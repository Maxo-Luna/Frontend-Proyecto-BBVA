import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "./shared-styles.js";
import "@material/mwc-textfield";
import "@material/mwc-button";
import "@material/mwc-icon";
import "@polymer/iron-ajax/iron-ajax.js";
import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";
import "@polymer/paper-spinner/paper-spinner.js";

class Quotation extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <p id="prueba">
          <iron-ajax
            auto
            url="https://www.dolarsi.com/api/api.php?type=valoresprincipales"
            handle-as="json"
            last-response="{{cotiz}}"
            loading="{{cargando}}"
          ></iron-ajax>
        </p>
        <body>
        
            <paper-spinner
              alt="Cargando la cotizacion..."
              active="[[cargando]]"
            ></paper-spinner>
        

          <ul>
            <template is="dom-repeat" items="[[cotiz]]">
              <h2>[[item.casa.nombre]]</h2>
              <li>Cotizacion de Venta: [[item.casa.venta]]</li>
              <li>Cotizacion de Compra: [[item.casa.compra]]</li>
            </template>
          </ul>
        </body>
      </div>
    `;
  }
}

window.customElements.define("cotiz-usd", Quotation);
