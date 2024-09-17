const express = require('express');
const morgan = require('morgan');
const { swaggerUi, specs } = require('./swagger'); // Importe a configuração do Swagger
const app = express();
const port = 9090;

// Middleware para parsing de parâmetros de consulta
app.use(express.json());

// Configuração personalizada do morgan para incluir o IP do cliente
morgan.format('custom', ':remote-addr :method :url :status :response-time ms');
app.use(morgan('custom')); // Usa o formato personalizado para o log

// Rota para a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/area', (req, res, next) => {
    try {
        const {direita, esquerda, cima, baixo} = req.query; // esse sao os parametros da url

 

        // Verifica se todos os parâmetros estão presentes
        if (direita === undefined || esquerda === undefined || cima == undefined || baixo == undefined) {
            throw new Error('Parâmetros insuficientes!');
        }

        // Converte os parâmetros para números
        const di = parseFloat(direita);
        const es = parseFloat(esquerda);2
        const ci = parseFloat(cima);
        const ba = parseFloat(baixo);


        // Verifica se os parâmetros são números válidos
        if (isNaN(direita) || isNaN(esquerda) || isNaN(cima) || isNaN(baixo)) {
            throw new Error('Parâmetros inválidos!');
        }

        
        let area;
        area = di * ba;

        let result;
        if (di == es && es == ci && ci == ba) {
            result = `Os lados são iguais, portanto é um quadrado de area ${area}`
        } else if(ba == ci && di == es) {
            result = `Os lados são diferentes, portanto é um retângulo de área ${area}`
        } else {
            result = `Figura desconhecida`
        }
        

        res.json({ result });
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento
    }
});


// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack); // Log do erro
    res.status(400).json({ error: err.message }); // Responde com a mensagem de erro
});

app.listen(port, () => {
    console.log(`API rodando em http://172.16.7.1:${port}`);
});