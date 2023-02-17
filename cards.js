import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardsData from "./CardsData";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/actions/action";

const Cards = () => {
  const [data, setData] = useState(CardsData);
  //console.log(data);

  const dispatch = useDispatch();

  const send = (e) =>{
   // console.log(e);~
   dispatch(ADD(e))
  }

  return (
    <>
      <div className="container mt-3">
        <h2 className="text-center mt-3">Add to Card Items</h2>

        <div className="row">
          {data.map((ele) => {
            return (
              <>
                <Card className="m-2" style={{ width: "18rem" }}>
                  <Card.Img className="mt-2" style={{width:250, height:160,  }} variant="top" src={ele.imgdata} />
                  <Card.Body>
                    <Card.Title>{ele.rname}</Card.Title>
                    <Card.Text>
                     Price: {ele.price}

                    </Card.Text>
                    <Button className="ms-75 w-100 text-center"
                     variant="primary" onClick={()=>send(ele)}
                     >Add To card</Button>
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Cards;
