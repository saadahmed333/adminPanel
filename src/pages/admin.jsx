import React, { useState, useEffect, useRef } from "react";
import "../css/admin.css";
import { AiOutlineArrowLeft, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import axios from "axios";
const Admin = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [data, setData] = useState([]);
  // console.log(process.env.REACT_APP_BASE_URL, '<==base url')
  const url = "http://192.168.50.245:3001/api/product";
  const asseturl = "http://192.168.50.245:3001/assets/";

  const getData = async () => {
    try {
      const res = await axios.get(url);
      // console.log(res.data.results, '<==== RES DATA RESULT')
      setData(res.data.results);
    } catch (e) {
      console.log(e, "<====== eror");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  let count = 0;

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [image, setImage] = useState();

  // const post = () => {
  //   console.log(name)
  //   console.log(image)
  //   axios.post(asseturl, {
  //     image
  //   })
  //   .then((res) => {
  //     console.log(res)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })

  //   axios.post(url, {
  //     name,
  //     description,
  //     price,
  //     quantity,
  //     image
  //   })
  //   .then( (response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }



  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();
  const input5 = useRef();



  return (
    <>
      <div className="back">
        <Link to={"/"}>
          <AiOutlineArrowLeft className="back-icon" />
        </Link>
      </div>
      <div className="Add">
        <button onClick={() => setModal2Open(true)}>Add</button>
      </div>

      {/* Add Modal  */}
      <div className="modal">
        <Modal
          title="Add Data"
          centered
          open={modal2Open}
          onOk={() => {
            // post()
            setModal2Open(false);
          }}
          onCancel={() => setModal2Open(false)}
        >
          <form>
            <div className="modal-data">
              <label htmlFor="">Name</label>
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="modal-data">
              <label htmlFor="">Description</label>
              <input
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="modal-data">
              <label htmlFor="">Price</label>
              <input
                type="number"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className="modal-data last">
              <label htmlFor="">Quantity</label>
              <input
                type="number"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </div>
            <div className="modal-data last">
              <label htmlFor="">Images</label>
              <input
                type="text"
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </div>
          </form>
        </Modal>
      </div>

      {/* update modal  */}
      <div className="modal">
        <Modal
          title="Add Data"
          centered
          open={modal1Open}
          onOk={() => {
            setModal1Open(false);
          }}
          onCancel={() => setModal1Open(false)}
        >
          <form>
            <div className="modal-data">
              <label htmlFor="">Name</label>
              <input
              type="text"
              />
            </div>
            <div className="modal-data">
              <label htmlFor="">Description</label>
              <input
              type="text"
              />
            </div>
            <div className="modal-data">
              <label htmlFor="">Price</label>
              <input
                type="number"
              />
            </div>
            <div className="modal-data last">
              <label htmlFor="">Quantity</label>
              <input
                type="number"
              />
            </div>
            <div className="modal-data last">
              <label htmlFor="">Images</label>
              <input
              type="text"
              />
            </div>
          </form>
        </Modal>
      </div>

      <div className="table-div">
        <table cellSpacing={20}>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
          {data.map((value, index) => {
            count = count + 1;
            return (
              <tr key={index}>
                <td>{"0" + count}</td>
                <td>{value.name}</td>
                <td>{value.description}</td>
                <th className="images">
                  {<img src={asseturl + value.images[0]} alt="" />}
                </th>
                <td>{value.price}</td>
                <td>{value.quantity}</td>
                <td className="actions-icon">
                  <span>
                    <AiFillEdit
                      className="edit"
                      onClick={() => setModal1Open(true)}
                    />
                  </span>
                  <span>
                    <AiFillDelete className="delete" />
                  </span>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Admin;
