import PubSub from 'pubsub-js'

export default class className {
  publicaErros(erros) {
    for (let i = 0; i < erros.errors.length; i++) {
      const element = erros.errors[i];
      PubSub.publish('erro-validacao', element)
    }
  }
};
