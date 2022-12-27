import React, { useState } from "react";
import "../css/admin.css";
import { AiOutlineArrowLeft, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";
const Admin = () => {
  const [modal2Open, setModal2Open] = useState(false);
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
          onOk={() => setModal2Open(false)}
          onCancel={() => setModal2Open(false)}
        >
            <form> 
              <div className="modal-data">
                <label htmlFor="">Sports</label>
                <input type="text" />
              </div>
              <div className="modal-data">
                <label htmlFor="">Sports Image</label>
                <input type="text" />
              </div>
              <div className="modal-data">
                <label htmlFor="">Positions</label>
                <input type="text" />
              </div>
              <div className="modal-data last">
                <label htmlFor="">Additional Details</label>
                <input type="text" />
              </div>
            </form>
        </Modal>
      </div>


    
      <div className="table-div">
        <table cellSpacing={20}>
          <tr>
            <th>No</th>
            <th>Sports</th>
            <th>Sports Image</th>
            <th>Positions</th>
            <th>Additional Details</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td className="actions-icon">
              <span>
                <AiFillEdit className="edit" />
              </span>
              <span>
                <AiFillDelete className="delete" />
              </span>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td className="actions-icon">
              <span>
                <AiFillEdit className="edit" />
              </span>
              <span>
                <AiFillDelete className="delete" />
              </span>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td className="actions-icon">
              <span>
                <AiFillEdit className="edit" />
              </span>
              <span>
                <AiFillDelete className="delete" />
              </span>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td className="actions-icon">
              <span>
                <AiFillEdit className="edit" />
              </span>
              <span>
                <AiFillDelete className="delete" />
              </span>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td className="actions-icon">
              <span>
                <AiFillEdit className="edit" />
              </span>
              <span>
                <AiFillDelete className="delete" />
              </span>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Admin;
