import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { BiShow } from 'react-icons/bi'
import ReactPaginate from "react-paginate";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import { deleteSalesRequest, salesListRequest, salesProductsRequest } from '../../apiRequest/salesApiRequest';
import { DeleteAlert } from '../../helper/alert';
// import { DeleteAlert } from "../../helper/DeleteAlert";


const SalesList = () => {
    let [searchKeyword, setSearchKeyword] = useState("0");
    let [perPage, setPerPage] = useState(5);
    let [pageNo, setPageNO] = useState(0);

    useEffect(() => {
        (async () => {
            await salesListRequest(1, perPage, searchKeyword);
        })();
    }, [])

    let Sales = useSelector((state) => (state.sales.Sales));
    let Total = useSelector((state) => (state.sales.Total))
    let SalesItems = useSelector((state) => (state.sales.salesItem))

    const onChangePerPage = async (e) => {
        setPerPage(parseInt(e.target.value))
        await salesListRequest(1, e.target.value, searchKeyword)
    }

    const handlePageClick = async (event) => {
        setPageNO(event.selected)
        await salesListRequest(event.selected + 1, perPage, searchKeyword)
    };

    const onSearch = async () => {
        await salesListRequest(1, perPage, searchKeyword)
    }

    const onChangeSearchKeyword = async (e) => {
        setSearchKeyword(e.target.value)
        if ((e.target.value).length === 0) {
            setSearchKeyword("0")
            await salesListRequest(1, perPage, "0")
        }
    }

    const TextSearch = (e) => {
        const rows = document.querySelectorAll('tbody tr')
        rows.forEach(row => {
            row.style.display = (row.innerText.includes(e.target.value)) ? '' : 'none'
        })
    }

    const onShow = async (id) => {
        await salesProductsRequest(id)
    }

    const onDelete = async (id) => {
        let Result = await DeleteAlert();
        if (Result.isConfirmed) {
            let DeleteResult = await deleteSalesRequest(id)
            if (DeleteResult) {
                await salesListRequest(1, perPage, searchKeyword);
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
                                            <h5>Sales List</h5>
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
                                                <table className="table ">
                                                    <thead className="sticky-top bg-white">
                                                        <tr>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">#No</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Customer</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Total</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Discount</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Vat/Tax</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Other Cost</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Shipping Cost</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Grand Total</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date</td>
                                                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            Sales.map((item, i) =>
                                                                <tr key={i}>
                                                                    <td><p className="text-xs text-start">{i + 1 + (pageNo * perPage)}</p></td>
                                                                    <td><p className="text-xs text-start">{item.Customer[0].name}</p></td>
                                                                    <td><p className="text-xs text-start">
                                                                        <CurrencyFormat value={item.total} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                    </p></td>
                                                                    <td><p className="text-xs text-start">
                                                                        <CurrencyFormat value={item.discount ? item.discount : 0} displayType={'text'} thousandSeparator={true} suffix={'%'} />
                                                                    </p></td>
                                                                    <td><p className="text-xs text-start">
                                                                        <CurrencyFormat value={item.vatTax ? item.vatTax : 0} displayType={'text'} thousandSeparator={true} suffix={'%'} />
                                                                    </p></td>
                                                                    <td><p className="text-xs text-start">
                                                                        <CurrencyFormat value={item.otherCost ? item.otherCost : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                    </p></td>
                                                                    <td><p className="text-xs text-start">
                                                                        <CurrencyFormat value={item.shippingCost} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                    </p></td>
                                                                    <td><p className="text-xs text-start">
                                                                        <CurrencyFormat value={item.grantTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                    </p></td>
                                                                    <td><p className="text-xs text-start">{moment(item.createdAt).format('MMMM Do YYYY')}</p></td>
                                                                    <td>
                                                                        <button onClick={onShow.bind(this, item._id)} type="button" className="btn text-info btn-outline-light p-2 mb-0 btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                                            <BiShow size={18} />
                                                                        </button>
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
                                            <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'center' }}>
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

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Product List</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive table-section">
                                        <table className="table-sm text-center table">
                                            <thead className="sticky-top bg-white">
                                                <tr>
                                                    <th>#No</th>
                                                    <th>Name</th>
                                                    <th>Qty</th>
                                                    <th>Unit Price</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    SalesItems.map((item, i) => {
                                                        return (

                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{item.Product ? item.Product[0].title : ''}</td>
                                                                <td>{item.qty}</td>
                                                                <td>
                                                                    <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                </td>
                                                                <td>
                                                                    <CurrencyFormat value={item.total} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
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

export default SalesList;