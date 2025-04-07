import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

function CustomerForm() {

  const apiUrl = "https://ticket-hub-api-gggydshpe9cpedcb.canadacentral-01.azurewebsites.net/api/tickethub";
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function submitForm(data) {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Customer record submitted successfully!");
    } else {
      alert("Failed to submit the record.");
    }
  }

  return (
    <>
      <div className="container mt-5 bg-dark p-5 rounded-5">
        <div className="row">
          {/* Title */}
          <div className="col-12 text-center">
            <h1 className="mb-4">Candlelight: The Best of Hans Zimmer</h1>
          </div>

          {/* Left Column - Concert Info */}
          <div className="col-md-6 d-flex flex-column align-items-center justify-content-center text-center">
            <img src="symph.png" alt="Concert Image" className="img-fluid rounded shadow mb-4" />
            <img src="second.jpg" alt="Concert Image" className="img-fluid rounded shadow mt-4" />
          </div>

          {/* Right Column - Form */}
          <div className="col-md-6">
            <div className="p-4 bg-dark text-light rounded-4 shadow mt-4">
              <h2 className="text-center mb-4">Purchase Tickets</h2>
              <form onSubmit={handleSubmit(submitForm)}>
                {/* Hardcoded Concert ID */}
                <input type="hidden" value="6" {...register("ConcertID")} />

                <div className="row">
                  {/* Name & Quantity */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input {...register("Name", { required: true })} type="text" className="form-control" />
                    {errors.Name && <div className="text-danger">Name is required</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Quantity</label>
                    <input {...register("Quantity", { required: true, min: 1 })} type="number" className="form-control" />
                    {errors.Quantity && <div className="text-danger">Must be at least 1 ticket</div>}
                  </div>

                  {/* Email & Phone */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input {...register("Email", { required: true })} type="email" className="form-control" />
                    {errors.Email && <div className="text-danger">Valid email is required</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone</label>
                    <input {...register("Phone", { required: true })} type="tel" className="form-control" />
                    {errors.Phone && <div className="text-danger">Phone is required</div>}
                  </div>
                </div>

                {/* Payment Section */}
                <h4 className="text-center mt-3 mb-3">Payment Info</h4>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Credit Card</label>
                    <input {...register("CreditCard", { required: true })} type="text" className="form-control" />
                    {errors.CreditCard && <div className="text-danger">Credit card number is required</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Expiration</label>
                    <input {...register("Expiration", { required: true })} type="text" className="form-control" />
                    {errors.Expiration && <div className="text-danger">Expiration date is required</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Security Code</label>
                    <input {...register("SecurityCode", { required: true })} type="text" className="form-control" />
                    {errors.SecurityCode && <div className="text-danger">Security code is required</div>}
                  </div>
                </div>

                {/* Address Section */}
                <h4 className="text-center mt-3">Billing Address</h4>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Address</label>
                    <input {...register("Address", { required: true })} type="text" className="form-control" />
                    {errors.Address && <div className="text-danger">Address is required</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input {...register("City", { required: true })} type="text" className="form-control" />
                    {errors.City && <div className="text-danger">City is required</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Province</label>
                    <input {...register("Province", { required: true })} type="text" className="form-control" />
                    {errors.Province && <div className="text-danger">Province is required</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Postal Code</label>
                    <input {...register("PostalCode", { required: true })} type="text" className="form-control" />
                    {errors.PostalCode && <div className="text-danger">Postal code is required</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Country</label>
                    <input {...register("Country", { required: true })} type="text" className="form-control" />
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
