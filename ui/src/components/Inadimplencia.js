import { useEffect, useState } from "react";
import axios from "axios";
import {
  Pagination,
  InputGroup,
  FormControl,
  Button,
  Table,
} from "react-bootstrap";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Inadimplencia = () => {
  const [clientes, setClientes] = useState([]);
  const [clientesFiltered, setClientesFiltered] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [order, setOrder] = useState("asc");
  const [lastOrderBy, setLastOrderBy] = useState("");

  const filterByNome = (e) => {
    e.preventDefault();
    let buscaNome;
    if (e.type === "click") {
      buscaNome = e.target.form[0].value.toLowerCase();
    } else {
      buscaNome = e.target[0].value.toLowerCase();
    }
    setClientesFiltered(() => {
      return clientes?.filter((cliente) => {
        const nome = cliente.nome.toLowerCase();
        return nome.includes(buscaNome);
      });
    });
  };

  const sortByNome = () => {
    setLastOrderBy("nome");
    setClientesFiltered((prevState) => {
      if (order === "asc") {
        setOrder("desc");
        return [...prevState]?.sort((a, b) => (a.nome > b.nome ? 1 : -1));
      } else {
        setOrder("asc");
        return [...prevState]?.sort((a, b) => (a.nome > b.nome ? -1 : 1));
      }
    });
  };

  const sortByValor = () => {
    setLastOrderBy("valor");
    setClientesFiltered((prevState) => {
      if (order === "asc") {
        setOrder("desc");
        return [...prevState]?.sort((a, b) => (a.valor > b.valor ? 1 : -1));
      } else {
        setOrder("asc");
        return [...prevState]?.sort((a, b) => (a.valor > b.valor ? -1 : 1));
      }
    });
  };

  const sortByDesde = () => {
    setLastOrderBy("desde");
    setClientesFiltered((prevState) => {
      if (order === "asc") {
        setOrder("desc");
        return [...prevState]?.sort((a, b) =>
          a.dataVencimento > b.dataVencimento ? 1 : -1
        );
      } else {
        setOrder("asc");
        return [...prevState]?.sort((a, b) =>
          a.dataVencimento > b.dataVencimento ? -1 : 1
        );
      }
    });
  };

  let items = [];
  for (
    let number = 1;
    number <=
    parseInt(clientesFiltered?.length > 8 ? clientesFiltered?.length / 8 : 1);
    number++
  ) {
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
        setClientesFiltered(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h1 className="title">Clientes Inadimplentes</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          filterByNome(e);
        }}
      >
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Buscar por nome"
            aria-label="Buscar por nome"
            aria-describedby="busca-por-nome"
            onKeyDown={(e) => {
              if (e.key === "enter") {
                filterByNome(e);
              }
            }}
          />
          <Button variant="outline-primary" onClick={(e) => filterByNome(e)}>
            Buscar
          </Button>
        </InputGroup>
      </form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="table-header" onClick={() => sortByNome()}>
              Nome do Cliente{" "}
              {lastOrderBy === "nome" ? (
                order === "desc" ? (
                  <i class="bi bi-arrow-down"></i>
                ) : (
                  <i class="bi bi-arrow-up"></i>
                )
              ) : undefined}
            </th>
            <th className="table-header" onClick={() => sortByValor()}>
              Valor{" "}
              {lastOrderBy === "valor" ? (
                order === "desc" ? (
                  <i class="bi bi-arrow-down"></i>
                ) : (
                  <i class="bi bi-arrow-up"></i>
                )
              ) : undefined}
            </th>
            <th className="table-header" onClick={() => sortByDesde()}>
              Desde{" "}
              {lastOrderBy === "desde" ? (
                order === "desc" ? (
                  <i class="bi bi-arrow-down"></i>
                ) : (
                  <i class="bi bi-arrow-up"></i>
                )
              ) : undefined}
            </th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltered?.map((cliente, index) => {
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
