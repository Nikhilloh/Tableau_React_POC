import React from "react";
import Title from "./Title";
import './Footer.css';

export default class Header extends React.Component {
    render() {
      return (
          <header>
            <Title />
            <link rel="icon" href="http://i58.tinypic.com/302rtyg.png" type="image/png"></link>
          </header>
      );
    }
  }
