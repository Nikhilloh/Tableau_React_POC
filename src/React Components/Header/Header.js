import React from "react";
import Title from "./Title";
import './Header.css';

export default class Header extends React.Component {
    render() {
      return (
          <header>
            <Title />
          </header>
      );
    }
  }
