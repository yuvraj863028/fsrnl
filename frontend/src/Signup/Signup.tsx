import React, { useEffect, useState } from 'react'
import { Form, Button, Col, Row, Container } from "react-bootstrap"
import { signup } from '../services/apiRequest';

function Signup() {
    interface Validator {
        lowercase: boolean;
        uppercase: boolean;
        number: boolean;
        symbol: boolean;
        length: boolean;
    }
    const initValidator: Validator = {
        uppercase: false,
        length: false,
        lowercase: false,
        number: false,
        symbol: false
    };
    const pattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\$@!#\%\^\&\*\(\)\-\+\=]).{8,}/;
    const [password, setpassword] = useState('');
    const [validator, setValidator] = useState<Validator>(initValidator);
    const [focus, setfocus] = useState(false);
    const {uppercase,lowercase,length,number,symbol} = validator;

    const [username, setusername] = useState("");
    const [name, setname] = useState("");

    const [isValid, setIsValid] = useState(false);
    const validatePassword =(password)=>{
        const lowerCasePattern = /(?=.*[a-z])/;
        const upperCasePattern = /(?=.*[A-Z])/;
        const numberPattern = /(?=.*[0-9])/;
        const symbolPattern = /(?=.*[\$@!#\%\^\&\*\(\)\-\+\=])/;
        const currentState:Validator ={
            length:password.length>=8,
            lowercase:lowerCasePattern.test(password),
            uppercase:upperCasePattern.test(password),
            number:numberPattern.test(password),
            symbol:symbolPattern.test(password)
        }
        setValidator(currentState);
    };

    useEffect(() => {
        const regexTest = pattern.test(password);
        const isFormDataValid = name.length>0 && username.length>0 && regexTest;
        setIsValid(isFormDataValid);
    }, [username,name,password])
    
    const validate = e=>{
        const pwd = e.target.value;
        setpassword(pwd);
        validatePassword(pwd);
    }

    const signupUser = async (e:any)=>{
        e.preventDefault();
        const payload = {name,username,password};
        const response = await (await signup(payload)).data;
        console.log(response);
        
    }
    return (
        <>
            <Container>
                <Row>
                    <Col md="6" className="offset-3">
                        <Form>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control  placeholder="Enter name" onChange = {e=>setname(e.target.value)} />
                                
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control  placeholder="Enter username" onChange = {e=>setusername(e.target.value)} />
                                <Form.Text className="text-muted">
                                    We'll never share your data with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                onKeyUp={validate} onFocus={()=>setfocus(true)} onBlur = {()=>setfocus(false)} />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick = {signupUser} disabled = {!isValid}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col md="6" className="offset-3">
                        {(focus || password.length!==0)?<>
                        <div className={lowercase?'text-success':'text-danger'}>lowerCase letter</div>                    
                        <div className={uppercase?'text-success':'text-danger'}>uppercase letter</div>                    
                        <div className={number?'text-success':'text-danger'}>number</div>                    
                        <div className={symbol?'text-success':'text-danger'}>symbol</div>                    
                        <div className={length?'text-success':'text-danger'}>Atleast 8 characters</div>                    
                        </>:null}
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default Signup