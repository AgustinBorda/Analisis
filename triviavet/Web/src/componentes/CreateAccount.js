import React,{Component} from "react";
import { Link } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {AsyncStorage} from "AsyncStorage";
import ReactDOM from "react-dom";
import Menu from './Menu';
import {StyleSheet, StyleResolver} from "style-sheet";


class CreateAccount extends Component{
	constructor(props) {
        super(props);
        this.state = {username: '', password: '', email:''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({username: event.target.username, password: event.target.password,
        	email: event.target.email});
      }

      handleSubmit(event) {
        alert('A user was submitted: ' + this.state.username);
        event.preventDefault();
      }

      componentDidMount(){

          fetch(process.env.REACT_APP_API_HOST+"/users",{
              method: 'POST',
              body: JSON.stringify({username: this.state.username, password: this.state.password,
               email: this.state.email}),
              mode: "no-cors"
            })
            .then(response => {
              console.log(response);
                AsyncStorage.setItem('userToken', response.config.headers.Authorization);
                ReactDOM.render(
                   <Menu/>,
                    document.getElementById('root')
                )
              })
              .catch(error => {
                console.log(error)
              });

      }


  render () {
    return (  
          <div className={StyleResolver.resolve([styles.app])}>
          
          <div className={StyleResolver.resolve([styles.layout, styles.container])}>
          
          <div css={{
              fontFamily: "monaco, monospace",
              color: "#1e252d"
            }}>
          <form onSubmit={this.handleSubmit}>
           <h1> CreateAccount</h1>
            <Form>
              <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="Username" placeholder="Enter Username" bsSize="large"
              username={this.state.username} onChange={this.handleChange}/>
              <Form.Text className="text-muted">

              </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                password={this.state.password} onChange={this.handleChange}/>
              </Form.Group>

               <Form.Group controlId="formBasicEmail" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email"
                password={this.state.email} onChange={this.handleChange}/>
              </Form.Group>

		       <Button variant="primary" type="submit">
                Crear Cuenta
           </Button>
           <p></p>
           <p></p>
           <Link to="/login" className="Login">
            <Button variant="primary" type="submit">
                 Atras
            </Button>
           </Link>
            </Form>
 		     </form>
         </div>
       </div>
     </div>
     );
  }
}


export default CreateAccount;
 const styles = StyleSheet.create({
    layout: {
      width: "100%",
      maxWidth: "640px"
    },
    container: {
      padding: "2em",
      border: "1px solid",
      borderRadius: "3px",

      backgroundColor: "rgba(114,137,218, 0.2)",
      boxShadow: "0 2px 30px 6px #000000",
      transition: "transform 0.2s ease-out",
      "&:hover": {
        transform: "scale(1.1)"
      }
    },
    app: {
      background: "radial-gradient(circle, rgba(35,39,42,1) 0%, rgba(44,47,51,1) 100%)",
      height: "100vh",
      width: "100vw",
      padding: "2rem",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  });