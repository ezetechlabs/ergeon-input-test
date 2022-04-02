import React from "react";
import ReactDOM from "react-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { Col, Container, Row } from 'react-bootstrap';
import Header from './components/Header';

import "./styles.css";


interface ZipcodeInputs {
  multipleErrorInput: number;
}

function App() {

  const { register, formState: { errors }, handleSubmit } = useForm<ZipcodeInputs>({criteriaMode: "all"});

  const onSubmit = (data: ZipcodeInputs) => alert(JSON.stringify(data));

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>American zip (postal)</h1>
            <input
              {...register("multipleErrorInput", {
                required: "This input is required.",
                pattern: {
                  value: /\d+/,
                  message: "This input is number only."
                },
                maxLength: {
                  value: 10,
                  message: "This input exceed maxLength."
                }
              })}
            />
            <ErrorMessage
              errors={errors}
              name="multipleErrorInput"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}
            />

            <input type="submit" />
          </form>
        </Row>
      </Container>
    </>
  );
}

export default App;
