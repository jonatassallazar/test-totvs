import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";

const Inadimplencia = () => {
  const [clientes, setClientes] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [order, setOrder] = useState("asc");

  const sortByNome = () => {
    setClientes((prevState) => {
      if (order === "asc") {
        setOrder("desc");
        return [...prevState].sort((a, b) => (a.nome > b.nome ? 1 : -1));
      } else {
        setOrder("asc");
        return [...prevState].sort((a, b) => (a.nome > b.nome ? -1 : 1));
      }
    });
  };

  const sortByValor = () => {
    setClientes((prevState) => {
      if (order === "asc") {
        setOrder("desc");
        return [...prevState].sort((a, b) => (a.valor > b.valor ? 1 : -1));
      } else {
        setOrder("asc");
        return [...prevState].sort((a, b) => (a.valor > b.valor ? -1 : 1));
      }
    });
  };

  const sortByDesde = () => {
    setClientes((prevState) => {
      if (order === "asc") {
        setOrder("desc");
        return [...prevState].sort((a, b) => (a.dataVencimento > b.dataVencimento ? 1 : -1));
      } else {
        setOrder("asc");
        return [...prevState].sort((a, b) => (a.dataVencimento > b.dataVencimento ? -1 : 1));
      }
    });
  };

  let items = [];
  for (let number = 1; number <= parseInt(clientes.length / 8); number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => setActivePage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/clientes-inadimplentes")
      .then((res) => {
        setClientes(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h1>Clientes Inadimplentes</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => sortByNome()}>Nome do Cliente</th>
            <th onClick={() => sortByValor()}>Valor</th>
            <th onClick={() => sortByDesde()}>Desde</th>
          </tr>
        </thead>
        <tbody>
          {clientes?.map((cliente, index) => {
            const desde = moment(cliente.dataVencimento)
              .add("1", "day")
              .format("DD/MM/YY");

            const pageNumber = parseInt((index + 8) / 8);

            if (pageNumber !== activePage) {
              return <></>;
            }

            return (
              <>
                <tr key={`${cliente.nome}_${index}`}>
                  <td>{cliente.nome}</td>
                  <td>{`R$ ${(cliente.valor / 100)
                    .toFixed(2)
                    .replace(".", ",")}`}</td>
                  <td>{desde}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
      <div>
        <Pagination>{items}</Pagination>
      </div>
    </div>
  );
};

export default Inadimplencia;
