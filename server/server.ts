import * as express from 'express'; 
import * as cors from 'cors';
import * as path from 'path'; 
import * as http from 'http'; 
import * as bodyParser from 'body-parser';
import { BackendApi } from './routes/backendapi';

class Server { 
    public app: express.Application; 
  
    public static bootstrap(): Server { 
        return new Server(); 
    } 
  
    constructor() { 
		// create expressjs application 
		this.app = express(); 
	  
		// configure application 
		this.config(); 
	  
		// configure routes 
		this.routes(); 
	}

	private config() { 
		// Parsers for POST data 
		this.app.use(bodyParser.json()); 
		this.app.use(bodyParser.urlencoded({ extended: false })); 
	  
		// Point static path to public folder 
		this.app.use(express.static(path.join(__dirname, 'public'))); 
	   
		// Use of CORS
		this.app.use(cors());


		/** 
		 * Get port from environment and store in Express. 
		 */
		const port = process.env.PORT || '3000'; 
		this.app.set('port', port); 
	  
		/** 
		 * Create HTTP server. 
		 */
		const server = http.createServer(this.app); 
	  
		/** 
		 * Listen on provided port, on all network interfaces. 
		 */
		server.listen(port, () => console.log(`API running on localhost:${port}`)); 
	}

	private routes() { 
		// get router 
		let router: express.Router; 
		router = express.Router(); 
	  
		// create routes 
		const api: BackendApi = new BackendApi(); 
	  
		// update task API 
		router.put('/api/tasks/:id', api.updateTask.bind(api.updateTask)); 
		// get all tasks API 
		router.get('/api/tasks', api.getTasks.bind(api.getTasks)); 
	  
		// use router middleware 
		this.app.use(router); 
	  
		// Catch all other routes and return the index file 
		this.app.get('*', (req, res) => { 
			res.sendFile(path.join(__dirname, 'public/index.html')); 
		}); 
	}

}

Server.bootstrap();