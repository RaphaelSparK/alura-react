import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado'

class App extends Component {

  constructor() {
    super();
    this.state = { lista: [], nome: '', email: '', senha: '' }
    this.enviaForm = this.enviaForm.bind(this);

    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: "https://cdc-react.herokuapp.com/api/autores",
      dataType: "json",
      success: function (response) {
        this.setState({ lista: response.reverse().slice(0, 10) });
      }.bind(this)
    });
  }


  enviaForm(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "https://cdc-react.herokuapp.com/api/autores",
      contentType: 'application/json',
      data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
      dataType: "json",
      success: function (response) {
        this.setState({ lista: response.reverse().slice(0, 10) });
      }.bind(this),
      error: function (response) {
        console.log('erro');
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
      <div id="layout">

        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>
          <div className="content" id="content">
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
                <div className="pure-control-group">
                  <label></label>
                  <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                </div>
              </form>

            </div>
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
                    this.state.lista.map((autor, index) => {
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
          </div>
        </div>


      </div>
    );
  }
}

export default App;
