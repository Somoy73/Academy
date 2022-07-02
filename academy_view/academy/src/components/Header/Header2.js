import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";

import "./Header.css";

const Header = (props) => {
  const pathName = props?.location?.pathName;
  return (
    <Navbar sticky="top" expand="lg" className="header">
      <Nav.Link to="/" as={NavLink} className={"p-0 m-0"}>
        <Navbar.Brand className="header_home">
          <HomeRoundedIcon />
        </Navbar.Brand>
      </Nav.Link>

      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="header-left">
          <Nav.Link
            to="/home"
            as={NavLink}
            className={pathName === "/" ? "header-link-active" : "header-link"}
          >
            Home
          </Nav.Link>
          <Nav.Link
            to="/employees"
            as={NavLink}
            className={
              pathName === "/employees" ? "header-link-active" : "header-link"
            }
          >
            Employees
          </Nav.Link>
        </Nav>
        {/* <Box className="header-right">
          {Object.keys(resumeDetails.socials).map((key, index) => {
            return (
              <a
                href={resumeDetails.socials[key].link}
                target="_blank"
                rel="noreferrer"
                key={index}
              >
                {resumeDetails.socials[key].icon}
              </a>
            );
          })}
        </Box> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
