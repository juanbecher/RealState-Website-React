import React, { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import $ from "jquery";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Contenedor = styled.div`
  margin: 0 1rem;
  margin-bottom: 2rem;
`;

const ContHeader = styled.div`
  display: flex;
  h3 {
    padding: 1rem;
  }
  .react-confirm-alert-body {
    h1 {
      color: red !important;
    }
  }
`;

const BotonEliminar = styled.button`
  padding: 0.5rem 1rem;
  margin: 1rem auto;
  background-color: #a63f5a;
  color: white;
  border-radius: 5px;
  margin-left: 5rem;
  border: none;
  :hover {
    background-color: #a22445;
    cursor: pointer;
  }
`;

const ListadoPropiedades = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [propiedades, GuardarPropiedades] = useState([]);

  const { usuario, firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerPropiedades = () => {
      firebase.db
        .collection("propiedades")
        .orderBy("creado", "desc")
        .onSnapshot(manejarSnapshot);
    };

    obtenerPropiedades();
    var altura = window.innerHeight - 180;
    console.log(altura)
    $(".ag-theme-alpine").css({ height: `${altura}px` });
  }, []);

  function manejarSnapshot(snapshot) {
    const propiedades = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    for (var i = 0; i < propiedades.length; i++) {
      let fecha = new Date(propiedades[i].creado);
      let day = fecha.getDate();
      let month = fecha.getMonth() + 1;
      let year = fecha.getFullYear();

      if (month < 10) {
        propiedades[i].creado = `${day}-0${month}-${year}`;
      } else {
        propiedades[i].creado = `${day}-${month}-${year}`;
      }
    }
    GuardarPropiedades(propiedades);
  }

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onCellValueChanged = (params) => {
    console.log(params);
    var colId = params.column.getId();


    const {
      propiedad,
      visible,
      tipo,
      destacado,
      operacion,
      ambiente,
      banio,
      m2,
      precio,
      ubicacion,
      descripcion,
      moneda,
      video
    } = params.data;
    const id = params.data.id;
    //  Actualizar en la BD
    firebase.db.collection("propiedades").doc(id).update({
      propiedad: propiedad,
      tipo: tipo,
      visible:visible,
      destacado: destacado,
      operacion: operacion,
      ambiente: ambiente,
      banio: banio,
      m2: m2,
      precio: precio,
      ubicacion: ubicacion,
      descripcion: descripcion,
      moneda:moneda,
      video:video,
    }).then( () => 
    NotificationManager.warning('Registro actualizado'));
  };

  const ConfirmarEliminar = () => {
    const BorrarPropiedad = () => {
      const eliminarPropiedad = async (pid, nombreimagen) => {
        if (usuario) {
          try {
            await firebase.db.collection("propiedades").doc(pid).delete();
            nombreimagen.map(imagen => {
              var desertRef = firebase.storage.ref("propiedades").child(imagen);
              desertRef.delete().then(function () {
                console.log("foto elim");
              })
              .catch(function (error) {
                console.log(error);
              });
            })
            
            console.log("Propiedd eliminada");
          } catch (error) {
            console.log(error);
          }
        }
      };

      const selectedNodes = gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const selectedDataStringPresentation = selectedData
        .map((node) => `${node.id} ${node.operacion}`)
        .join(", ");
      console.log(selectedData);
      selectedData.map((node) => eliminarPropiedad(node.id, node.nombreimagen));
      NotificationManager.success('Propiedad eliminada')
    };

    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    var cantidad = selectedData.length;
    console.log(selectedData);
    if (selectedData.length !== 0) {
      confirmAlert({
        title: "Borrar propiedad",
        message: `¿Esta seguro que desea eliminar las siguientes ${cantidad} propiedades?`,
        buttons: [
          {
            label: "Borrar",
            onClick: BorrarPropiedad,
          },
          {
            label: "Cancelar",
            onClick: () => console.log("cancelado..."),
          },
        ],
      });
    } else {
      confirmAlert({
        message: "Seleccione una propiedad",
        buttons: [
          {
            label: "Ok",
            onClick: () => console.log("ok..."),
          },
        ],
      });
    }
  };

  return (
    <Contenedor>
            <ContHeader>
          <h3>Propiedades: {propiedades.length}</h3>
          <BotonEliminar onClick={ConfirmarEliminar} className="test">
            Borrar
          </BotonEliminar>
        </ContHeader>
      <div
        className="ag-theme-alpine"
      >
        

        <AgGridReact
          onGridReady={onGridReady}
          rowData={propiedades}
          rowSelection="multiple"
          defaultColDef={{
            flex: 1,
            minWidth: 130,
            editable: true,
            resizable: true,
          }}
          onCellValueChanged={onCellValueChanged}
        >
          <AgGridColumn
            field="propiedad"
            sortable={true}
            filter={true}
            checkboxSelection={true}
            cellEditor="agSelectCellEditor"
            cellEditorParams={{
              values: ["Inmueble", "Emprendimiento"],
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="visible"
            sortable={true}
            filter={true}
            cellEditor="agSelectCellEditor"
            cellEditorParams={{
              values: ["si", "no"],
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="destacado"
            cellEditor="agSelectCellEditor"
            sortable={true}
            filter={true}
            cellEditorParams={{
              values: ["si", "no"],
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="tipo"
            sortable={true}
            filter={true}
            cellEditor="agSelectCellEditor"
            cellEditorParams={{
              values: [
                "Casa",
                "Quinta",
                "Campo",
                "Departamento",
                "Local",
                "Terreno",
              ],
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="operacion"
            cellEditor="agSelectCellEditor"
            cellEditorParams={{
              values: ["Venta", "Alquiler"],
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="ambiente"
            sortable={true}
            filter={true}
            editable={true}
          ></AgGridColumn>
          <AgGridColumn
            field="banio"
            sortable={true}
            filter={true}
            editable={true}
          ></AgGridColumn>
          <AgGridColumn
            field="m2"
            sortable={true}
            filter={true}
            editable={true}
          ></AgGridColumn>
          <AgGridColumn
            field="moneda"
            cellEditor="agSelectCellEditor"
            sortable={true}
            filter={true}
            cellEditorParams={{
              values: ["peso", "dolar"],
            }}
          ></AgGridColumn>
          <AgGridColumn
            field="precio"
            sortable={true}
            filter={true}
            editable={true}
          ></AgGridColumn>
          <AgGridColumn
            field="ubicacion"
            sortable={true}
            filter={true}
            editable={true}
          ></AgGridColumn>
          <AgGridColumn
            field="descripcion"
            sortable={true}
            filter={true}
            editable={true}
          ></AgGridColumn>
          <AgGridColumn
            field="creado"
            sortable={true}
            filter={true}
            editable={true}
          ></AgGridColumn>
          <AgGridColumn
            field="urlimagen"
            sortable={true}
            filter={true}
            editable={true}
          ></AgGridColumn>
          <AgGridColumn
            field="video"
            sortable={true}
            filter={true}
            editable={true}
          ></AgGridColumn>
          <AgGridColumn
            field="id"
            sortable={true}
            filter={true}
            editable={true}
          ></AgGridColumn>
        </AgGridReact>
      </div>
      <NotificationContainer/>
    </Contenedor>
  );
};

export default ListadoPropiedades;
