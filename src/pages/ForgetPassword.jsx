import Button from '../component/Button';
import { cardsData } from '../constant/index';

const ForgotPassword = () => {
  return (
    <div className="bg-image d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="row w-100 d-flex justify-content-center">
       
        <div className="col-md-6 d-none d-md-block">
          <div className="row">
            {cardsData.map((card, index) => (
              <div key={index} className={`col-12 col-md-${card.className}`}>
                <div className={`card ${card.bgColor} ${card.textColor}`}>
                  <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text">{card.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="col-12 col-md-4 d-flex justify-content-center align-items-center h-100">
          <div className="card col-10 col-md-8 h-auto h-md-75 w-75 h-100 rounded-0">
            <div className="card-body justify-content-center">
             <h4 className="fw-bold">Forgot Password</h4>
            <h5>Enter the Email</h5>
            <input type="email" className="form-control mb-3" />
            <Button type="submit" className="btn btn-primary" value="Continue" />
            </div>
          </div>
  </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
