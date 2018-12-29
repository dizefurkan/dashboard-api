import endpointify from 'utils/express/endpointify';


export default class BaseService {
  constructor(model, endpoints, defaultQueries = {}) {
    this.model = model;
    this.endpoints = endpoints;
    this.defaultQueries = defaultQueries;
  }

  getEndpoints = () => {
    const endpoints = Object.keys(this.endpoints).map((endpointKey) => {
      const settings = this.endpoints[endpointKey];
      const handlers = [];
      if (typeof (settings.handlers) === 'string') {
        handlers.push(this[setting.s.handlers]);
      } else {
        settings.handlers.forEach((handlerName) => {
          handlers.push(this[handlerName]);
        });
      }

      return endpointify({ ...settings, handlers });
    });

    return endpoints || [];
  }
}
