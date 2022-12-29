import React, { useState, useEffect } from 'react'
import '../css/admin.css'
import { AiOutlineArrowLeft, AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { Link, Navigate } from 'react-router-dom'
import { Modal } from 'antd'
import axios from 'axios'
import swal from 'sweetalert'
import userContext from '../context'
const Admin = () => {
  const [modal1Open, setModal1Open] = useState(false)
  const [modal2Open, setModal2Open] = useState(false)
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [price, setPrice] = useState()
  const [quantity, setQuantity] = useState()
  const [image, setImage] = useState([])
  const [id, setId] = useState()
  const [data, setData] = useState([])
  const [changeOccured, setChangeOccured] = useState(false)
  
  const [namevalue, setNamevalue] = useState()
  const [pricevalue, setPricevalue] = useState()
  const [quantityvalue, setQuantityvalue] = useState()
  const [descriptionvalue, setDescriptionvalue] = useState()
  const [imagevalue, setImagevalue] = useState()
  const [idValue, setIdvalue] = useState()

  const url = 'http://192.168.50.245:3001/api/product'
  const deleteurl = `http://192.168.50.245:3001/api/product/`
  const editurl = `http://192.168.50.245:3001/api/product/`
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
    for (let i = 0; i < image.length; i++) {
      formData.append('images', image[i])
      console.log(image[i])
  }
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
      console.log(del)
    } catch (e) {
      console.log(e)
    }
  }


  const updateData = (name, description, price, quantity, images, id) => {
    setModal1Open(true)
    setNamevalue(name)
    setPricevalue(price)
    setDescriptionvalue(description)
    setQuantityvalue(quantity)
    setImagevalue(images)
    setIdvalue(id)
  }
  const editData = async () => {
    console.log(idValue)
    const editForm = new FormData()
    editForm.append('name', namevalue)
    editForm.append('description', descriptionvalue)
    editForm.append('price', pricevalue)
    editForm.append('quantity', quantityvalue)
    editForm.append('images', imagevalue)
    try {
      const res = await axios.patch(editurl + idValue, editForm, {
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


  
  useEffect(() => {
    getData()
  }, [changeOccured])


  const [loggedout, setLoggedout] = useState(false);

  const localRemove = () => {
    console.log("saad")
    localStorage.removeItem("email")
    localStorage.removeItem("id")
    setLoggedout(!loggedout)
  }

  return (
    <>
      <div className="back">
        <Link to={'/'}>
          <AiOutlineArrowLeft className="back-icon" />
        </Link>
      </div>
      <div className="Add">
      <button onClick={localRemove}>Log Out</button>
      {loggedout && (<Navigate to="/"/>)}
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
            <div className="modal-data">
              <label htmlFor="">Images</label>
              <input
                type="file" multiple
                onChange={(e) => {
                  // imageHandle(e)
                  console.log(e.target.files, '<==== files')
                  console.log(e.target.files[0], '<==== file 1')
                  setImage(e.target.files)

                  console.log(image, '<=== state img')
                }}
              />
            </div>
            {/* <div className="modal-data last">
              <label htmlFor="">Images</label>
              <input
                type="file"
                onChange={(e) => {
                  console.log(e.target.files, '<==== files')
                  console.log(e.target.files[0], '<==== file 1')
                  setImage(image.push(e.target.files[0]))
                  console.log(image)
                  console.log(image, '<=== state img')
                }}
              />
            </div> */}
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
            editData()
            setModal1Open(false)
          }}
          onCancel={() => setModal1Open(false)}
        >
          <form>
            <div className="modal-data">
              <label htmlFor="">Name</label>
              <input
                type="text"
                value={namevalue}
                onChange={(e) => setNamevalue(e.target.value)}
              />
            </div>
            <div className="modal-data">
              <label htmlFor="">Description</label>
              <input
                type="text"
                value={descriptionvalue}
                onChange={(e) => setDescriptionvalue(e.target.value)}
              />
            </div>
            <div className="modal-data">
              <label htmlFor="">Price</label>
              <input
                type="number"
                value={pricevalue}
                onChange={(e) => setPricevalue(e.target.value)}
              />
            </div>
            <div className="modal-data">
              <label htmlFor="">Quantity</label>
              <input
                type="number"
                value={quantityvalue}
                onChange={(e) => setQuantityvalue(e.target.value)}
              />
            </div>
            <div className="modal-data last">
              <label htmlFor="">Images</label>
              <input
                type="file"
                onChange={(e) => setImagevalue(e.target.files[0])}
              />
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
                    {
                      value.images.map((v,i) => {
                        return (
                          <img key={i} src={asseturl + v} alt="" />
                        )
                      })
                    }
                  </th>
                  <td>{value.price}</td>
                  <td>{value.quantity}</td>
                  <td className="actions-icon">
                    <span>
                      <AiFillEdit
                        className="edit"
                        onClick={() => {
                          updateData(
                            value.name,
                            value.description,
                            value.price,
                            value.quantity,
                            asseturl + value.images[0],
                            value.id,
                          )
                          console.log(asseturl + value.images[0])
                        }}
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
                              'Once deleted, you will not be able to recover this data!',
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
