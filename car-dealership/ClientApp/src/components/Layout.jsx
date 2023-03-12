import React, { Component } from "react";
import { Navbar } from "./NavBar";
import { Footer } from "./Footer";

export class Layout extends Component {
  static displayName = Layout.name;
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
