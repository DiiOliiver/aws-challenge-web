# Case Técnico: Gerenciador de dispositivos

## Stack utilizada

**Front-end:** Node v22.14.0 e Angular v19.2.5

## Instalação

#### 1 - Clonando o projeto
```powershell
    git clone https://github.com/DiiOliiver/aws-challenge-web.git
    cd api
```

#### 2 - Apontando caminho para o backend
Dentro do arquivo src/environments/environment.development.ts\
encontrará o seguinte bloco de código, altere a porta conforme definido na api.
```text

    export const environment = {
        production: false,
        apiUrl: 'http://localhost:8081'
    };

```
Nota 1: Para clonar e configurar o backend, acesse o link [aws-challenge-api](https://github.com/DiiOliiver/aws-challenge-api/blob/main/README.md).
Nota 2: Para acessar o front-end, necessário começar com o clone e configuração da api.

#### 3 - Acessando e levantando o projeto:
Após a finalização do levantamento da api, execute no terminal do projeto aws-challenge-web o comando
```powershell
    npm run dev
```
Nota: O projeto front-end vai ser levantado em http://localhost:4200
