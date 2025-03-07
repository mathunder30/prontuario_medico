import express, {Request, Response, Router} from 'express';
import { promisePool } from './BancoDados';
import cors from 'cors';
import router from './routes/Routes';
import bodyParser from 'body-parser';
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}))


app.set('views', path.resolve(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, '..', 'public')))

promisePool.getConnection()
.then(() => console.log('Conectado ao MySQL'))
.catch((error) => {console.error(`Erro ao conectar ao MySQL ${error}`)
    process.exit(1);
});

app.use('/api/paciente', router);

// Rota para o formulário
app.get('/info_pessoais_paciente', (req: Request, res: Response) => {
    console.log('Acessando a rota do formulário');
    res.render('info_pessoais_paciente'); 
  });

app.get('/hist_medico', (req: Request, res: Response) => {
    console.log('Acessando a rota do formulário');
    res.render('hist_medico'); 
  });

app.get('/medicacao', (req: Request, res: Response) => {
    console.log('Acessando a rota do formulário');
    res.render('medicacao'); 
  });

app.get('/obs_med', (req: Request, res: Response) => {
    console.log('Acessando a rota do formulário');
    res.render('obs_med'); 
  });

app.get('/pagina_visualizacao', (req: Request, res: Response) => {
    console.log('Acessando a rota do formulário');
    res.render('pagina_visualizacao'); 
  });
  

app.listen(port, () =>{
    console.log(`Servidor rodando em http://localhost:${port}`)
});