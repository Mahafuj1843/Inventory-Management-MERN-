import React, { Fragment, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ResetPasswordRequest } from '../apiRequest/authRequest'
import { ErrorToast, IsPassword } from '../helper/formHelper'
import logo from '../Assets/images/data-warehouse.png'


const ResetPassword = () => {
  let passwordRef = useRef()
  let navigate = useNavigate()
  let params = useParams()

  const resetPassword = () =>{
    let password = passwordRef.value;

    if(IsPassword(password)){
        ErrorToast("Password must be six characters, at least one letter and one number !")
    }
    else{
      ResetPasswordRequest(password, params.token).then((result)=>{
        if(result) navigate('/Login')
      })
    }
  }

  return (
    <Fragment>
      <div className="container vh-100">
				<div className="row justify-content-center h-100">
					<div className="col-md-7 col-lg-6 center-screen">
						<div className="row justify-content-center">
            <div className="text-center d-flex align-items-center gap-2 mb-3">
								<img src={logo} width={32} height={32} alt='logo'/>
								<h2 className="heading-section m-0">InventoCare</h2>
							</div>
						</div>
						<div className="shadow-sm animated fadeIn w-100 p-3">
							<div className="d-flex flex-column align-items-center gap-3 px-2">
								<span className='text-start col-md-12'>
									<h4 className='m-0 fw-bold'>Reset Password</h4>
								</span>
								<div className="col-md-12 text-start gap-1">
									<lable className='fw-normal'>New Password</lable>
									<input ref={(input)=>passwordRef=input} placeholder="New password" className="form-control animated fadeInUp mt-1 fw-light" type="email" />
								</div>
								<div className="col-md-12 text-start gap-1">
								    <lable className='fw-normal'>Confirm Password</lable>
									<input  placeholder="Confirm password" className="form-control animated fadeInUp mt-1 fw-light" type="password" />
								</div>
									<div className="col-md-12">
										<button onClick={resetPassword} className="btn w-100 float-end btn-success animated fadeInUp">Sign In</button>
									</div>
								<div className="col-md-12 d-flex justify-content-start">
									<span>Already have account?</span>
									<Link to="/Login">Sign Up</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
      {/* <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card shadow animated fadeIn w-100 p-3">
              <div className="card-body">
                <h4>Reset Password</h4>
                <br />
                <div className="col-md-12">
                  <input ref={(input)=>passwordRef=input} placeholder="Password" className="form-control animated fadeInUp" type="password" />
                </div>
                <div lassName="row mt-2 p-0">
                  <div className="col-md-12">
                    <button onClick={resetPassword} className="btn mt-3 w-100 float-end btn-success animated fadeInUp">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </Fragment>
  )
}

export default ResetPassword