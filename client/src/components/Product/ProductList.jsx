import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { deleteProductRequest, productListRequest } from '../../apiRequest/productApiRequest';
import { DeleteAlert } from '../../helper/alert';
// import { DeleteAlert } from "../../helper/DeleteAlert";


const ProductList = () => {
    let [searchKeyword, setSearchKeyword] = useState("0");
    let [perPage, setPerPage] = useState(5);
    let [pageNo, setPageNo] = useState(0)

    useEffect(() => {
        (async () => {
            await productListRequest(1, perPage, searchKeyword);
        })();
    }, [])

    let Products = useSelector((state) => (state.product.Product));
    let Total = useSelector((state) => (state.product.Total))

    const onChangePerPage = async (e) => {
        setPerPage(parseInt(e.target.value))
        await productListRequest(1, e.target.value, searchKeyword)
    }

    const handlePageClick = async (event) => {
        await productListRequest(event.selected + 1, perPage, searchKeyword)
    };

    const onSearch = async () => {
        await productListRequest(1, perPage, searchKeyword)
    }

    const onChangeSearchKeyword = async (e) => {
        setSearchKeyword(e.target.value)
        if ((e.target.value).length === 0) {
            setSearchKeyword("0")
            await productListRequest(1, perPage, "0")
        }
    }

    const TextSearch = (e) => {
        const rows = document.querySelectorAll('tbody tr')
        rows.forEach(row => {
            row.style.display = (row.innerText.includes(e.target.value)) ? '' : 'none'
        })
    }

    const onDelete = async (id) => {
        let Result = await DeleteAlert();
        if (Result.isConfirmed) {
            let DeleteResult = await deleteProductRequest(id)
            if (DeleteResult) {
                await productListRequest(1, perPage, searchKeyword);
            }
        }
    }

    return (
        <Fragment>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-4">
                                            <h5>Customer List</h5>
                                        </div>

                                        <div className="col-2">
                                            <input onKeyUp={TextSearch} placeholder="Text Filter" className="form-control form-control-sm" />
                                        </div>

                                        <div className="col-2">
                                            <select onChange={onChangePerPage} className="form-control mx-2 form-select-sm form-select form-control-sm" >
                                                <option value="5">5 Per Page</option>
                                                <option value="10">10 Per Page</option>
                                                <option value="20">20 Per Page</option>
                                                <option value="30">30 Per Page</option>
                                                <option value="40">40 Per Page</option>
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <input onChange={onChangeSearchKeyword} type="text" className="form-control form-control-sm" placeholder="Search.." aria-label="Recipient's username" aria-describedby="button-addon2" />
                                                <button onClick={onSearch} className="btn  btn-success btn-sm mb-0" type="button">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive table-section">
                                                <table className="table table-hover table-fixed" style={{width: '100%'}}>
                                                    <thead className="sticky-top bg-white">
                                                        <tr>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">#No</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Category</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Brand</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 col-3">Details</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            Products.map((item, i) =>
                                                                <tr>
                                                                    <td scope='col' className='col-1'><p className="text-xs text-start">{i + 1 + (pageNo * perPage)}</p></td>
                                                                    <td scope='col' className='col-2'><p className="text-xs text-start">{item.title}</p></td>
                                                                    <td scope='col' className='col-2'><p className="text-xs text-start">{item.Category[0].title}</p></td>
                                                                    <td scope='col' className='col-2'><p className="text-xs text-start">{item.Brand[0].title}</p></td>
                                                                    <td scope='col' className='col-3'><p className="text-xs text-start">{item.desc}</p></td>
                                                                    <td scope='col' className='col-2'>
                                                                        <Link to={`/ProductUpdatePage/${item._id}`} className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                                                            <AiOutlineEdit size={15} />
                                                                        </Link>
                                                                        <button onClick={onDelete.bind(this, item._id)} className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                                                                            <AiOutlineDelete size={15} />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-5">
                                            <nav aria-label="Page navigation example" style={{display: 'flex', justifyContent: 'center'}}>
                                                <ReactPaginate
                                                    previousLabel="<"
                                                    nextLabel=">"
                                                    pageClassName="page-item"
                                                    pageLinkClassName="page-link"
                                                    previousClassName="page-item"
                                                    previousLinkClassName="page-link"
                                                    nextClassName="page-item"
                                                    nextLinkClassName="page-link"
                                                    breakLabel="..."
                                                    breakClassName="page-item"
                                                    breakLinkClassName="page-link"
                                                    pageCount={Math.ceil(Total / perPage)}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={handlePageClick}
                                                    containerClassName="pagination"
                                                    activeClassName="active"
                                                />
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductList;