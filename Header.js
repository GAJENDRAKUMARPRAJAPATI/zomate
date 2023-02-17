import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "@mui/material/Badge";
import { NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "@mui/material";
import { DLT } from "../redux/actions/action";


const Header = () => {

  const [price, setPrice]=useState(0);
  console.log(price);

  const getdata = useSelector((state) => state.cartreducer.carts);
 console.log(getdata);

  const dispatch= useDispatch();

  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const dtl = (id) => {
    dispatch(DLT(id))
  }

  const total = () =>{
    let price = 0;
    getdata.map((ele, k)=>{
    price = ele.price * ele.qnty + price
    });
   setPrice(price);
  }

  useEffect(()=>{
    total();
  },[total])



  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink to="/" className="text-decoration-none text-light p-2 ">
            Add to Cart
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light ">
              Home
            </NavLink>
          </Nav>

          <Badge
            badgeContent={getdata.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i
              class="fa-solid fa-cart-shopping text-light ms-4"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getdata.length ? (
            <div
              className="cart_details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Restaurant Name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    getdata.map((e)=>{
                      return(
                        <>
                         <tr>
                            <NavLink to ={`/card/${e.id}` }  onClick={handleClose}>
                              <img src={e.imgdata} style={{width:"5rem", height:"5rem"}} />
                            </NavLink>
                          
                           <td>
                             <p>{e.rname}</p>
                             <p>Price : {e.price}</p>
                             <p>Quantyti : {e.qnty}</p>
                             <p style={{color:"red" , fontSize:20, cursor:"pointer"}} onClick={()=>dtl(e.id)}>
                              <i className="fas fa-trash "></i>
                             </p>
                           </td>
                           <td className="" style={{color:"red" , fontSize:20, cursor:"pointer"}}  onClick={()=>dtl(e.id)}>
                             {/* <i className="fas fa-trash"></i> */}
                           </td>
                         </tr>
                        </>
                      )
                    })
                  }
                  <p className="text-center">Total :{price}</p>
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="card_details d-flex justify-content-center align-items-center ">
              <i
                onClick={handleClose}
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  top: 2,
                  fontSize: 20,
                  right: 22,
                }}
                className="fas  fa-close smallclose"
              ></i>
              <p style={{ fontSize: 18 }}> Your Empty Cart</p>
              <img
                style={{ width: 70, fontSize: 20, height: 60 }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR289TLh59hiBAi1f9BW-qI_O7FzSKaNjVNY15V23QN&s"
                alt=""
              />
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
