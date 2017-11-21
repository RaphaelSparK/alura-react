import React, { Component } from 'react'
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado'
import ButtonSubmit from './componentes/ButtonSubmit';
import TratadorErros from './TratadorErros';
import PubSub from 'pubsub-js'

class FormularioAutor extends Component {

  constructor() {
    super();
    this.state = {nome: '', email: '', senha: '' }
    this.enviaForm = this.enviaForm.bind(this);

    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  enviaForm(e) {
    console.log('oi')
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "https://cdc-react.herokuapp.com/api/autores",
      contentType: 'application/json',
      data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
      dataType: "json",
      success: function (response){
        PubSub.publish('atualiza-lista-autores',response.reverse().slice(0, 10))
        this.setState({nome:'',senha:'',email:''})
      }.bind(this),
      error: function (response){
        if(response.status === 400){
          new TratadorErros().publicaErros(response.responseJSON);
        }
      },
      beforeSend: function(){
        PubSub.publish('limpa-erros',{})
      }
    });
  }

  setNome(e) {
    this.setState({ nome: e.target.value });
  }

  setEmail(e) {
    this.setState({ email: e.target.value });
  }

  setSenha(e) {
    this.setState({ senha: e.target.value });
  }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
      <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="POST">
        <InputCustomizado
          label="Nome"
          id="nome"
          type="text"
          name="nome"
          value={this.state.nome}
          onChange={this.setNome}
        />
        <InputCustomizado
          label="Email"
          id="email"
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.setEmail}
        />
        <InputCustomizado
          label="Senha"
          id="senha"
          type="password"
          name="senha"
          value={this.state.senha}
          onChange={this.setSenha}
        />
        <ButtonSubmit
          title="Gravar"
        />
      </form>

    </div>
    )
  }
}

class TabelaAutores extends Component {

  render() {
    return (
      <div>
      <table className="pure-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.lista.map((autor, index) => {
              return (
                <tr key={index}>
                  <td>{autor.nome}</td>
                  <td>{autor.email}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
    )
  }
}

export default class AutorBox extends Component {

  constructor() {
    super();
    this.state = { lista: [] }
  }
  

   componentDidMount() {
    $.ajax({
      url: "https://cdc-react.herokuapp.com/api/autores",
      dataType: "json",
      success: function (response) {
        this.setState({ lista: response.reverse().slice(0, 10) });
      }.bind(this)
    });

    PubSub.subscribe('atualiza-lista-autores', function(topico,novalista){
      this.setState({lista:novalista})
    }.bind(this))
  }

  render() {
    return (
      <div className="content" id="content">
        <FormularioAutor />
        <TabelaAutores lista={this.state.lista} />
      </div>
    );
  }
}
