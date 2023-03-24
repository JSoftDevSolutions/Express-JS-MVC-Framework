const base_model = require('../system/core/BaseModel');
const base_controller = require('../system/core/BaseController');
const config = require("../configs/base_config");

const _base_controller = new base_controller();
let post_data = {};

class Profiler{
    static display_profiler(req, res, next){
        const end_time = new Date().getMilliseconds();
        const memory_usage = process.memoryUsage().heapUsed / 1024 / 1024;
        const database_queries = base_model.latest_query();
        const session = req.session;
        const flash_data = res.locals.flashdata;
        const execution_time = end_time  - req.start_time;
        let uri_string = '';
        if(req.url.length > 1){
            uri_string = req.url.substring(1);
        }else{
            uri_string = req.url;
        }

        if(req.method === 'POST'){
            post_data =  req.body;
        }
        const originalSend = res.send;

        res.send = (body) => {
            let profiler_template = `
            <div class="container bg-secondary-subtle border mt-4 mb-4">
                <h1 class="fw-bold mt-4 mb-4">Express MVC Framework Profiler</h1>
                <h2 class="mt-4">Execution Time</h2>
                <div class="alert alert-primary" role="alert">${execution_time} ms</div>
                <h2 class="mt-4">Memory Usage</h2>
                <div class="alert alert-primary" role="alert">${memory_usage.toFixed(2)} MB</div>
                <h2 class="mt-4">POST Data</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Fields</th>
                            <th>Values</th>
                        </tr>
                    </thead>
                    <tbody>`;

            for(let x in post_data){
                profiler_template +=  `<tr>
                                <td>${x}</td>
                                <td>${post_data[x]}</td>
                            </tr>`;
            }
            profiler_template +=  `
                    </tbody>
                </table>
                <h2 class="mt-4">SESSION</h2>
                <div class="alert alert-primary" role="alert">${JSON.stringify(session)}</div>
                <h2 class="mt-4">FLASH DATA</h2>
                <div class="alert alert-primary" role="alert">${JSON.stringify(flash_data)}</div>
                <h2 class="mt-4">URI STRING</h2>
                <div class="alert alert-primary" role="alert">${uri_string}</div>
                <h2 class="mt-4">Latest Database Query</h2>
                <div class="alert alert-primary" role="alert">{${database_queries}}</div>
            </div>`;
            if (typeof body === 'string' && body.includes('</body>') && config.enable_profiler || _base_controller.profiler_status()) {
                _base_controller.enable_profiler(false);
                body = body.replace('</body>', `${profiler_template}</body>`);
                res.set('Content-Length', Buffer.byteLength(body));
            }
            post_data = {};
            return originalSend.call(res, body);
        };
        next();
    }
}

module.exports = Profiler.display_profiler;