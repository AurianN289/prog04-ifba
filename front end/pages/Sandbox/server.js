// configura o express
const express = require("express");
const app = express();

// cria um servidor http pra q o websocket rode em cima
const http = require("http").createServer(app);

// coloca o websocket rodando no servidor http
const io = require("socket.io")(http);

// as coisas da pasta publico sao atualizadas em tempo real, as mensagens q vao ser enviadas vao ser atlz em rt 
// da para acessar os arquivos do publico por servidor 
app.use(express.static("publico"));

// qnd ocorre uma conexao esse evento e executado
io.on("connection", (socket) => 
    {
        // mostra o id do caba q se conectou
        console.log("Usuário conectado:", socket.id);

        // qnd o caba recebe um evento do tipo mansagem executa isso
        socket.on(
            "mensagem",
            (msg) => {
                socket.broadcast.emit("mensagem", msg);
            } // basicamente emite a msg pra todos(menos pra si mesmo), broadcast
        );
    }
)

// inicia o servidor na porta 3000
http.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});