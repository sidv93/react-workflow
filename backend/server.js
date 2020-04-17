import errorHandler from 'errorhandler';
import app from './index';

app.use(errorHandler());

const server = app.listen(app.get('port'), () => {
    console.log(`App is running in ${app.get('port')}`);
});

export default server;
