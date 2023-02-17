import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DLT , ADD, REMOVE} from "../redux/actions/action";


const CardDetails = () => {
  const [data, setData] = useState([]);
  // console.log(data);

  const { id } = useParams();
  //console.log(id);

  const history = useNavigate();

  const dispatch = useDispatch()

  const getdata = useSelector((state) => state.cartreducer.carts);
  // console.log(getdata);

  const compare = () => {
    let comparedata = getdata.filter((e) => {
      return e.id == id;
    });
    setData(comparedata);
  };

  //add data

  const send = (e) =>{
   // console.log(e);
    dispatch(ADD(e));
  }

  const dtl = (id) => {
    dispatch(DLT(id));
    history("/");
  }

  //remove one
  const remove = (item) =>{
    dispatch(REMOVE(item))
  }

  useEffect(() => {
    compare();
  }, [id]);

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center"> Card Items</h2>

        <section className="container mt-3">
          <div className="itemsdetails">
            {data.map((ele) => {
              return (
                <>
                  <div className="item img m-2">
                    <img
                      style={{ width: 250, height: 230 }}
                      src={ele.imgdata}
                      alt=""
                    />
                  </div>

                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <p><strong>Restaurant</strong>: {ele.rname}  </p>
                          <p> <strong>Price</strong>:{ele.price} </p>
                          <p> <strong>Dishes</strong>: {ele.address} </p>
                          <p> <strong>Total</strong>: {ele.price * ele.qnty} </p>
                          <div style={{width:100, cursor:"pointer", background:"#ddd", color:"#111"}} className="mt-5 d-flex justify-content-between align-content-center ">
                              <span style={{fontSize:24}} onClick={ele.qnty<=1 ? ()=>dtl(ele.id):()=>remove(ele)}>-</span>
                              <span style={{fontSize:22}}>{ele.qnty}</span>
                              <span  style={{fontSize:24}}  onClick={()=>send(ele)}>+</span>
                          </div>
                        </td>
                        <td>
                          <p><strong>Rating :</strong><span className="text-light" style={{ background: "green", borderRadius: 4 }}>3.5 * </span> </p>
                          <p> <strong>Order Reveiw :</strong> <span> {ele.somedata}</span> </p>
                          <p> <strong>Remove :</strong><span><i className="fas fa-trash" onClick={()=>dtl(ele.id)} style={{  color: "red",    cursor: "pointer", fontSize: 22, }} ></i> </span> </p>
                        </td>
                      </tr>
                    </Table>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardDetails;
