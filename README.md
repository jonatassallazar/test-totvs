# Test Totvs - Jonatas Sallazar

O tete foi realizado seguindo o documento de apoio enviado.

## Clonar o Projeto

Primeiro clone a pasta do projeto ou baixe o arquivo zip.

## Execução

O projeto foi realizado com o auxílio da ferramenta [Docker](https://docs.docker.com/docker-for-windows/install/), logo para ser executado, é necessário toda a configuração prévia da ferramenta na máquina.

Com a configuração necessária, abra a pasta raiz do projeto, onde se encontra o arquivo docker-compose.yml, e rode o seguinte comando no terminal:

    docker-compose up --build

Se utilizar a ferramenta [VS Code](https://code.visualstudio.com/download), com o auxílio da extensão [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker), é possível executar o projeto via interface GUI.

Após alguns minutos, o projeto rodará automaticamente nas portas [API:8080](http://localhost:8080/clientes-inadimplentes) e [React:3000](http://localhost:3000)

### API

A API está rodando em Node.js, e possuí o caminho /clientes-inadimplentes com o comando GET que entregará uma lista com todos os clientes que estão devendo, de acordo com a data do dia atual e o dia do vencimento.

### React

O Web App está em Reactjs, e trará a lista dos clientes inadimplentes, com a opção de filtrar por nome com o campo de busca, e ordenar pelas colunas Nome, Valor e Desde.

## Parar Docker

Assim que concluído o uso com os serviços, rode o seguinte via terminal para interromper o funcionamento do Docker Composer.

    docker-compose down

Também pode ser feito via interface pelo VS Code e extensão do Docker.

*Teste realizado por Jonatas Sallazar*
