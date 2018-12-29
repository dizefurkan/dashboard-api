import BaseService from 'services/base';


const endpoints = [
  {
    path: '/test',
    method: 'get',
    handlers: 'test' // or ['test']
  }
];


export class Test extends BaseService {
  test = async () => ({
    body: { message: 'Hello World!' },
    status: 200
  })
}


export default new Test({}, endpoints, {});
