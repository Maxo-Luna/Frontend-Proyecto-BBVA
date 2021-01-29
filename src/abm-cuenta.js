import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "./shared-styles.js";
import "@material/mwc-textfield";
import "@material/mwc-button";
import "@material/mwc-icon";
import "@polymer/iron-ajax/iron-ajax.js";
import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";

class AccountAbm extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <h2>Saldo de la Cuenta</h2>
        <p>
          <app-location route="{{route}}"></app-location>
          <iron-ajax
            id="ActualizarCuenta"
            method="PUT"
            handle-as="json"
            on-response="handleUserResponse"
          >
          </iron-ajax>

          <iron-ajax
            id="GrabarMovimiento"
            method="POST"
            content-type="application/json"
            handle-as="json"
            on-response="handleUserResponse"
          >
          </iron-ajax>

          <iron-ajax
            id="ValidarMail"
            method="GET"
            content-type="application/json"
            handle-as="json"
            on-response="handleUserResponseValidarMail"
          ></iron-ajax>

          <iron-ajax
            id="AjaxObtenerSaldo"
            method="GET"
            handle-as="json"
            last-response="{{cuentas}}"
          ></iron-ajax>
        

          <iron-ajax
            id="AjaxVerMovimientos"
            method="GET"
            handle-as="json"
            last-response="{{movimientos}}"
          ></iron-ajax>
        </p>

        <div>
          <template is="dom-repeat" items="[[cuentas]]">
            <h2>$ [[item.saldo]]</h2>
          </template>
        </div>

        <p>
          <mwc-textfield
            id="Importe"
            class="left right"
            ;
            required
            validationMessage="Importe obligatorio"
            label="Importe a transferir "
            outlined
          >
          </mwc-textfield>

          <mwc-textfield
            id="email"
            class="left right"
            ;
            required
            validationMessage="El correo es un campo obligatorio"
            label="Mail destino"
            type="email"
            iconTrailing="alternate_email"
            outlined
          >
          </mwc-textfield>

          <mwc-button raised label="Validar E-mail" on-click="Validar"></mwc-button>
          <mwc-button raised label="Realizar Transferencia" on-click="Transferir"></mwc-button>
        </p>

        <!-- <p>
          <mwc-button
            raised
            label="Ver Movimientos"
            on-click="VerMovimientos"
          ></mwc-button>
        </p>
        -->
        <h2>Lista de Movimientos</h2>

        <body>
          <div class="container">
            <div class="col-12">
              <div class="row">
                <div class="col-12">
                  <table
                    class="table table-bordered dataTable"
                    id="dataTable"
                    width="60%"
                    cellspacing="1"
                    role="grid"
                    border="1"
                    aria-describedby="dataTable_info"
                    style="text-align:center;"
                  >
                    <thead>
                      <tr>
                        <th>Usuario debito</th>
                        <th>Importe</th>
                        <th>Usuario credito</th>
                        <th>Fecha movimiento</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template is="dom-repeat" items="[[movimientos]]">
                        <tr>
                          <td>[[item.mailDebito]]</td>
                          <td>[[item.importe]]</td>
                          <td>[[item.mailCredito]]</td>
                          <td>[[item.fechaMovimiento]]</td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
    `;
  }

  
  static get properties() {
    return {
      active: {
        type: Boolean,
        observer: "_activeChanged",
      },
    };
  }

  _activeChanged(newValue, oldValue) {
    if (newValue) {
      console.log("entro");
      let email = localStorage.getItem("usuarioLogin");
      this.$.AjaxObtenerSaldo.url =
        "http://localhost:3000/apirest/cuentas/" + email;
      this.$.AjaxObtenerSaldo.generateRequest();

      this.$.AjaxVerMovimientos.url =
        "http://localhost:3000/apirest/movimientos";
      this.$.AjaxVerMovimientos.generateRequest();
    } else {
      this.formData = {};
    }
  }

  //-> Valido el mail (que exista en DB)
  Validar() {
    let email = this.$.email.value;
    this.$.ValidarMail.url = "http://localhost:3000/apirest/usuarios/" + email;
    this.$.ValidarMail.generateRequest();
  }
  //-> Transferir el importe informado
  Transferir() {
    let email = localStorage.getItem("usuarioLogin");
    let opcion = "D";
    let importe = this.$.Importe.value;
    this.$.ActualizarCuenta.url =
      "http://localhost:3000/apirest/cuentas/" +
      email +
      "&" +
      opcion +
      "&" +
      importe;
    this.$.ActualizarCuenta.generateRequest();
    console.log("Seguimiento_3");
    email = this.$.email.value;
    opcion = "C";

    this.$.ActualizarCuenta.url =
      "http://localhost:3000/apirest/cuentas/" +
      email +
      "&" +
      opcion +
      "&" +
      importe;
    this.$.ActualizarCuenta.generateRequest();
    console.log("Seguimiento_4");
    this.$.GrabarMovimiento.url = "http://localhost:3000/apirest/movimientos/";
    this.$.GrabarMovimiento.body = {
      mailDebito: localStorage.getItem("usuarioLogin"),
      mailCredito: this.$.email.value,
      importe: this.$.Importe.value,
    };
    this.$.GrabarMovimiento.generateRequest();
    //  location.reload();
    this.formData = {};
  }

  handleUserResponse(event) {
    console.log("Ingreso_ok");
  }

  handleUserResponseValidarMail(event) {
    var response = event.detail.response;
    if (!response.email) {
      alert(response.mensaje);
    }
  }
}

window.customElements.define("abm-cuenta", AccountAbm);
