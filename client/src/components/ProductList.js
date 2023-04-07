// import React, { Fragment, useEffect, useState } from 'react'
// import ReactPaginate from 'react-paginate'
// import { ProductListRequest } from '../apiRequest/authRequest'

// const ProductList = ({ product, total }) => {
//     let [searchKey, setSearchKey] = useState("0");
//     let [perPageKey, setPerPageKey] = useState(10);

//     useEffect(() => {
//         ProductListRequest(1, perPageKey, searchKey);
//     }, [])

//     const PageKeyOnChange = (e) => {
//         setPerPageKey(parseInt(e.target.value))
//         ProductListRequest(1, e.target.value, searchKey)
//     }

//     const handlePageClick = (event) => {
//         ProductListRequest(event.selected + 1, perPageKey, searchKey)
//     };

//     const searchOnChange = (e) => {
//         setSearchKey(e.target.value)
//         if ((e.target.value).length === 0) {
//             setSearchKey("0")
//             ProductListRequest(1, perPageKey, "0")
//         }
//     }

//     const searchData = () => {
//         ProductListRequest(1, perPageKey, searchKey)
//     }

//     return (
//         <Fragment>
//             <div className="container content-body">
//                 <div className="row">
//                     <div className="col-12">
//                         <div className="card">
//                             <div className="card-body">
//                                 <div className="container">
//                                     <div className="row">
//                                         <div className="col-6">
//                                             <h5>My Product List</h5>
//                                         </div>
//                                         <div className="col-2">
//                                             <select onChange={PageKeyOnChange} className="form-control mx-2 form-select-sm form-select form-control-sm" >
//                                                 <option value="10">10 Per Page</option>
//                                                 <option value="15">15 Per Page</option>
//                                                 <option value="20">20 Per Page</option>
//                                             </select>
//                                         </div>
//                                         <div className="col-4">
//                                             <div className="input-group mb-3">
//                                                 <input onChange={searchOnChange} type="text" className="form-control form-control-sm" placeholder="Search.." aria-label="Recipient's username" aria-describedby="button-addon2" />
//                                                 <button onClick={searchData} className="btn  btn-primary btn-sm mb-0" type="button">Search</button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-12">
//                                             <div className="table-responsive data-table">
//                                                 <table className="table ">
//                                                     <thead className="sticky-top bg-white">
//                                                         <tr>
//                                                             <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</th>
//                                                             <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Title</th>
//                                                             <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Description</th>
//                                                             <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Stock</th>
//                                                             <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Ratting</th>
//                                                         </tr>
//                                                     </thead>
//                                                     <tbody>
//                                                         {
//                                                             product.map((item, i) =>
//                                                                 <tr key={i}>
//                                                                     <td className='text-center'>
//                                                                         <h6 className="text">{item.id}</h6>
//                                                                     </td>
//                                                                     <td>
//                                                                         <div className="d-flex py-1">
//                                                                             {/* <div>
//                                                                           <img src={item.images[0]} className="avatar me-3"/>
//                                                                       </div> */}
//                                                                             <div className="d-flex flex-column justify-content-center">
//                                                                                 <h6 className="mb-0  text-xs">{item.title}</h6>
//                                                                                 <p className="text-xs  text-secondary mb-0">{item.category}</p>
//                                                                             </div>
//                                                                         </div>
//                                                                     </td>
//                                                                     <td>
//                                                                         <p className="text-xs font-weight-bold mb-0">{item.brand}</p>
//                                                                     </td >
//                                                                     <td className='text-center'>
//                                                                         <p className="text-xs font-weight-bold mb-0">{item.price}</p>
//                                                                     </td>
//                                                                     <td className='text-center'>
//                                                                         <span className="text-secondary text-xs font-weight-bold">{item.rating}</span>
//                                                                     </td>
//                                                                 </tr>
//                                                             )
//                                                         }
//                                                     </tbody>
//                                                 </table>
//                                             </div>
//                                         </div>
//                                         <div className="col-12 mt-5">
//                                             <nav aria-label="Page navigation example">
//                                                 <ReactPaginate
//                                                     previousLabel="<"
//                                                     nextLabel=">"
//                                                     pageClassName="page-item"
//                                                     pageLinkClassName="page-link"
//                                                     previousClassName="page-item"
//                                                     previousLinkClassName="page-link"
//                                                     nextClassName="page-item"
//                                                     nextLinkClassName="page-link"
//                                                     breakLabel="..."
//                                                     breakClassName="page-item"
//                                                     breakLinkClassName="page-link"
//                                                     pageCount={total / perPageKey}
//                                                     marginPagesDisplayed={2}
//                                                     pageRangeDisplayed={5}
//                                                     onPageChange={handlePageClick}
//                                                     containerClassName="pagination"
//                                                     activeClassName="active"
//                                                 />
//                                             </nav>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </Fragment>
//     )
// }

// export default ProductList