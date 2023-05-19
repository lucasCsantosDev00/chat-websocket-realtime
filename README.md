# chat-websocket-realtime

# Instalação <h1>

git clone https://github.com/lucasCsantosDev00/chat-websocket-realtime.git

Em /backend:
-  npm i.
-  crie uma pasta 'upload' dentro de /src.
-  npm run dev.
- Importante: Não esqueça de ligar o mongo como serviço local.
  
Em /frontend:
 - npm i.
 - npm run dev.
  
  
Endpoints da api:
Método    | Rota     | Parâmetros            | 
--------- | ---------| ----------------------|
POST      | /register| name, email, password |         
POST      | /login   | email, password       |             

Endpoints do client:

Método    | Rota     | Parâmetros            | 
--------- | ---------| ----------------------|
GET       | /        | email, password       |         
GET       | /chat    |                       |


# configuração do model User, database: 'chatdb', no mongoose.

Campo     | Tipo     | Descrição                                  |     
--------- | ---------| -------------------------------------------|
userName  | String   | nome que identifica usuário das mensagens  |         
email     | String   | email do usuário                           |
password  | String   | senha do usuário                           |

  
# Sobre o projeto: <h1>
  - projeto fictício/prático.
  - Implementação de uma api express utilizando o protocolo http e Websocket.
  
#  Objetivo: <h1>
Implementar um chat em tempo real que permita o envio de arquivos: mp3, jpg e pdf para impulsionar meus conhecimentos usando Javascript/Node com foco no backend. Gerei um template através de uma IA para facilitar a visualização do projeto.
  
# Tecnologias/ bibliotecas da api: <h1>
 - Mongodb.
 - Node.
 - Socket.io
 - Mongoose
 
 client:
 - Next.js/react.js
 - tailwindcss
 
 
# Funcionalidades: <h1>
- registro
- login
- envio de mensagens em tempo real
- envio de arquivos: mp3, jpg e pdf.
 
 # Uso: <h1>
 - Após a instalação vc pode criar dois usuários enviando uma requisição para rota /register e registrar pelo menos dois usuários.
 - Exemplo usando curl:
 - curl -X POST -H "Content-Type: application/json" -d '{"userName":"joao", "email":"joao@gmail.com", "password":"senha123"}' http://localhost:3000/register
 
Após o cadastro dos usuários, faça o login no client, abra duas janelas no navegador acessando a rota '/' e digite o email e senha para se autenticar. Clique em login e será redirecionado para a página do chat.

  
  
