import React, { useState, useEffect } from 'react'
import '../css/admin.css'
import { AiOutlineArrowLeft, AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Modal } from 'antd'
import axios from 'axios'
import swal from 'sweetalert'
const Admin = () => {
  const [modal1Open, setModal1Open] = useState(false)
  const [modal2Open, setModal2Open] = useState(false)
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [price, setPrice] = useState()
  const [quantity, setQuantity] = useState()
  const [image, setImage] = useState()
  const [id, setId] = useState()
  const [data, setData] = useState([])
  const [changeOccured, setChangeOccured] = useState(false)
  const url = 'http://192.168.50.245:3001/api/product'
  const deleteurl = `http://192.168.50.245:3001/api/product/`
  const asseturl = 'http://192.168.50.245:3001/assets/'

  const getData = async () => {
    try {
      const res = await axios.get(url, { params: { limit: 20 } })
      console.log(res)
      console.log(res.data)
      console.log(res.data.results, '<==== RES DATA RESULT')
      setData(res.data.results)
    } catch (e) {
      console.log(e, '<====== eror')
    }
  }

  let count = 0

  const postData = async () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('quantity', quantity)
    formData.append('images', image)
    console.log(name)
    console.log(image)
    console.log(formData)
    try {
      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(res)
      setChangeOccured(!changeOccured)
    } catch (e) {
      console.log(e, '<===error')
    }
  }

  const deleteData = async (id) => {
    try {
      const del = await axios.delete(deleteurl + id)
      setChangeOccured(!changeOccured)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getData()
  }, [changeOccured])


  return (
    <>
      <div className="back">
        <Link to={'/'}>
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
            postData()
            setModal2Open(false)
          }}
          onCancel={() => setModal2Open(false)}
        >
          <form>
            <div className="modal-data">
              <label htmlFor="">Name</label>
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </div>
            <div className="modal-data">
              <label htmlFor="">Description</label>
              <input
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
            </div>
            <div className="modal-data">
              <label htmlFor="">Price</label>
              <input
                type="number"
                onChange={(e) => {
                  setPrice(e.target.value)
                }}
              />
            </div>
            <div className="modal-data">
              <label htmlFor="">Quantity</label>
              <input
                type="number"
                onChange={(e) => {
                  setQuantity(e.target.value)
                }}
              />
            </div>
            <div className="modal-data last">
              <label htmlFor="">Images</label>
              <input
                type="file"
                onChange={(e) => {
                  console.log(e.target.files, '<==== files')
                  console.log(e.target.files[0], '<==== file 1')
                  setImage(e.target.files[0])

                  console.log(image, '<=== state img')
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
            setModal1Open(false)
          }}
          onCancel={() => setModal1Open(false)}
        >
          <form>
            <div className="modal-data">
              <label htmlFor="">Name</label>
              <input type="text" />
            </div>
            <div className="modal-data">
              <label htmlFor="">Description</label>
              <input type="text" />
            </div>
            <div className="modal-data">
              <label htmlFor="">Price</label>
              <input type="number" />
            </div>
            <div className="modal-data">
              <label htmlFor="">Quantity</label>
              <input type="number" />
            </div>
            <div className="modal-data last">
              <label htmlFor="">Images</label>
              <input type="file" />
            </div>
          </form>
        </Modal>
      </div>

      <div className="table-div">
        <table cellSpacing={20}>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          {data.map((value, index) => {
            count = count + 1
            return (
              <tbody key={index}>
                <tr>
                  <td>{count}</td>
                  <td>{value.name}</td>
                  <td>{value.description}</td>
                  <th className="images">
                    <img src={asseturl + value.images[0]} alt="" />
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
                      <AiFillDelete
                        className="delete"
                        onClick={() => {
                          setId(value.id)
                          console.log(id)
                          swal({
                            title: 'Are you sure?',
                            text:
                              'Once deleted, you will not be able to recover this imaginary file!',
                            icon: 'warning',
                            buttons: true,
                            dangerMode: true,
                          }).then((willDelete) => {
                            if (willDelete) {
                              deleteData(value.id)
                            }
                          })
                        }}
                      />
                    </span>
                  </td>
                </tr>
              </tbody>
            )
          })}
        </table>
      </div>
    </>
  )
}

export default Admin
