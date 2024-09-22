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
        const {lado1, lado2, lado3, lado4} = req.query; // esse sao os parametros da url

 

        // Verifica se todos os parâmetros estão presentes
        if (lado1 === undefined || lado2 === undefined || lado3 == undefined || lado4 == undefined) { 
            throw new Error('Parâmetros insuficientes!');
        }

        // Converte os parâmetros para números
        const l1 = parseFloat(lado1);
        const l2 = parseFloat(lado2);
        const l3 = parseFloat(lado3);
        const l4 = parseFloat(lado4);


        // Verifica se os parâmetros são números válidos
        if (isNaN(lado1) || isNaN(lado2) || isNaN(lado3) || isNaN(lado4)) {
            throw new Error('Parâmetros inválidos!');
        }

        //calculo de area
        let area;
        area = l2 * l3;

        let result;
        //verifica se é um quadrado, um retangulo ou desocnecido
        if (l1 === l2 && l2 === l3 && l3 === l4) {
            result = `Os quatros lados são iguis portanto é um quadrado de área ${area}`;
        } else if (l1 === l2 & l3 === l4) {
            result = `Dois lados são diferentes dos outros dois, portanto é um retângulo de área ${area}`;
        } else {
            throw new Error('Figura desconhecida');
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
    console.log(`API rodando em http://192.168.0.22:${port}`); 
});