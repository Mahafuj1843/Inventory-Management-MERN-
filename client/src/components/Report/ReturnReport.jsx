import React, { Fragment, useRef } from 'react'
import { ErrorToast, IsEmpty } from '../../helper/formHelper'
import { useSelector } from 'react-redux'
import CurrencyFormat from 'react-currency-format'
import moment from 'moment/moment'
import exportFromJSON from "export-from-json";
import { returnReportRequest } from '../../apiRequest/reportApiRequest'

const ReturnReport = () => {
    let fromDateRef, toDateRef = useRef()

    let data = useSelector((state)=>state.report.ReturnByDateRange)

    const onCreateReport = async () =>{
        if(IsEmpty(fromDateRef.value)){
            ErrorToast("From date required.")
        }else if(IsEmpty(toDateRef.value)){
            ErrorToast("To date required.")
        }else{
            await returnReportRequest(fromDateRef.value, toDateRef.value)
        }
    }

    const onExport = (exportType,data) => {
        if(data.length>0){
            let ReportData=[]
            data.map((item,i)=>{
                let listItem={
                    "#No" : i+1,
                    "Product":item['products']['title'],
                    "Details":item['products']['desc'],
                    "Brand":item['Brand'][0]['title'],
                    "Category":item['Categorie'][0]['title'],
                    "Unit":item['products']['unit'],
                    "UnitCost":item['price'],
                    "Quantity":item['qty'],
                    "Total":item['total'],
                    "Date":moment(item['createAt']).format('MMMM Do YYYY')
                }
                ReportData.push(listItem)
            })
            exportFromJSON({data: ReportData, fileName: 'ReturnReport from '+fromDateRef.value+' to '+toDateRef.value, exportType: exportType })
        }
    }
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">

                    <div className="col-12 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <h5 >Return Report by Date</h5>
                                    <hr className="bg-light" />

                                    <div className="col-4 p-2">
                                        <label className="form-label">Date Form:</label>
                                        <input ref={(input) => fromDateRef = input} className="form-control form-control-sm" type="date" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Date To:</label>
                                        <input ref={(input) => toDateRef = input} className="form-control form-control-sm" type="date" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={onCreateReport} className="btn btn-sm my-3 btn-success">Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        data.length > 0 ? (
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">

                                                <h6>Total: {data[0]['Total'].length > 0 ? <CurrencyFormat value={data[0]['Total'][0]['TotalAmount']} displayType={'text'} thousandSeparator={true} prefix={'$ '} /> : 0} </h6>
                                                <button onClick={onExport.bind(this, 'csv', data[0]['Rows'])} className="btn btn-sm my-2 btn-success">Download CSV</button>
                                                <button onClick={onExport.bind(this, 'xls', data[0]['Rows'])} className="btn btn-sm my-2 ms-2 btn-success">Download XLS</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
                </div>
            </div>
        </Fragment>
  )
}

export default ReturnReport