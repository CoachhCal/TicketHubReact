import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

function CustomerForm() {

  const apiUrl = "https://ticket-hub-api-gggydshpe9cpedcb.canadacentral-01.azurewebsites.net/api/tickethub";

  const { register, handleSubmit, formState: { errors } } = useForm();

  async function submitForm(data) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      mode: "cors", // Ensures CORS handling
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    alert("Purchase Completed, Thank you!");
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Failed to complete purchase.");
  }
}

  return (
    <>
      <div className="container mt-5 bg-dark p-5 rounded-5">
        <div className="row">
          {/* Title */}
          <div className="col-12 text-left">
            <h1 className="mb-4">Candlelight: The Best of Hans Zimmer</h1>
            <h5 className="mb-4">April 26, 2025 at 8:30pm   |   Joseph Strug Concert Hall, Halifax NS</h5>
          </div>

          {/* Left Column - Concert Info */}
          <div className="col-md-6 d-flex flex-column align-items-center justify-content-center text-center">
            <img src="symph.png" alt="Concert Image" className="img-fluid rounded shadow mb-4" />
            <img src="second.jpg" alt="Concert Image" className="img-fluid rounded shadow mt-4" />
          </div>

          {/* Right Column - Form */}
          <div className="col-md-6 mt-4">
            <div className="p-2 bg-dark text-light">
              <h2 className="text-center mb-4">Purchase Tickets</h2>
              <form onSubmit={handleSubmit(submitForm)}>
                {/* Hardcoded Concert ID */}
                <input type="hidden" value="6" {...register("ConcertID")} />

                <div className="row">
                  {/* Name & Quantity */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input {...register("Name", { required: true })} type="text" className="form-control" placeholder="Hans Zimmer"/>
                    {errors.Name && <div className="text-danger">Name is required</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Quantity</label>
                    <input {...register("Quantity", { required: true, min: 1 })} type="number" className="form-control"/>
                    {errors.Quantity && <div className="text-danger">Must be at least 1 ticket</div>}
                  </div>

                  {/* Email & Phone */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      {...register("Email", {
                        required: true,
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email format"
                        }
                        })} type="email" className="form-control" placeholder="Hans@email.com"/>
                    {errors.Email && <div className="text-danger">Valid email is required</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone</label>
                    <input {...register("Phone", { 
                      required: "Phone number is required", 
                      pattern: {
                        value: /^\d{3}-\d{3}-\d{4}$/,
                        message: "Phone number must be in the format XXX-XXX-XXXX"
                      } 
                    })} type="tel" className="form-control" placeholder="902-321-3425"/>
                    {errors.Phone && <div className="text-danger">Phone number must be in the format XXX-XXX-XXXX</div>}
                  </div>
                </div>

                {/* Payment Section */}
                <h4 className="text-center mt-3 mb-3">Payment Info</h4>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Credit Card</label>
                    <input {...register("CreditCard", { 
                      required: "Credit Card is required", 
                      pattern: {
                        value: /^\d{16}$/,
                        message: "Credit Card must be exactly 16 digits"
                      } 
                    })} type="text" className="form-control" placeholder="1234123412341234"/>
                    {errors.CreditCard && <div className="text-danger">Credit Card must be exactly 16 digits</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Expiration</label>
                    <input {...register("Expiration", { 
                      required: "Expiration date is required", 
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                        message: "Expiration date must be in mm/yy format"
                      } 
                    })} type="text" className="form-control" placeholder="04/29"/>
                    {errors.Expiration && <div className="text-danger">Expiration date must be in mm/yy format</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Security Code</label>
                    <input {...register("SecurityCode", { 
                      required: "Security code is required", 
                      pattern: {
                        value: /^\d{3}$/,
                        message: "Security code must be exactly 3 digits"
                      } 
                    })} type="text" className="form-control" placeholder="123"/>
                    {errors.SecurityCode && <div className="text-danger">Security code must be exactly 3 digits</div>}
                  </div>
                </div>

                {/* Address Section */}
                <h4 className="text-center mt-3">Billing Address</h4>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Address</label>
                    <input {...register("Address", { required: true })} type="text" className="form-control" placeholder="7 crawler lane"/>
                    {errors.Address && <div className="text-danger">Address is required</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input {...register("City", { 
                      required: "City is required", 
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "City can only contain letters and spaces"
                      } 
                    })} type="text" className="form-control" placeholder="Halifax"/>
                    {errors.City && <div className="text-danger">City is required</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Province</label>
                    <input {...register("Province", { 
                      required: "Province is required", 
                      pattern: {
                        value: /^(Ontario|Quebec|Nova Scotia|New Brunswick|Manitoba|British Columbia|Prince Edward Island|Saskatchewan|Alberta|Newfoundland and Labrador|Northwest Territories|Yukon|Nunavut)$/,
                        message: "Invalid province name"
                      } 
                    })} type="text" className="form-control" placeholder="Nova Scotia"/>
                    {errors.Province && <div className="text-danger">Province is required</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Postal Code</label>
                    <input {...register("PostalCode", { 
                      required: "Postal code is required", 
                      pattern: {
                        value: /^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/,
                        message: "Invalid postal code format (e.g., A1B 2C3)"
                      } 
                    })} type="text" className="form-control" placeholder="b1r2t5"/>
                    {errors.PostalCode && <div className="text-danger">Invalid postal code format (e.g., A1B 2C3)</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Country</label>
                    <input {...register("Country", { 
                      required: "Country is required", 
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Country can only contain letters and spaces"
                      } 
                    })} type="text" className="form-control" placeholder="Canada"/>
                    {errors.Country && <div className="text-danger">Country is required</div>}
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100 mt-3">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="text-center text-light mt-5">
        <br/>
        <br/>
        <hr className="mx-5" />
        <div className="d-flex justify-content-center gap-5">
          <span>Special Topics</span>
          <span>Calvin Murray</span>
          <span>{new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
        </div>
      </footer>
    </>
  );
}

export default CustomerForm;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomerForm />
  </StrictMode>
);
