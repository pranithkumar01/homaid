
import "./InvoicePage.css";
import { IoMdGlobe } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import React, { useState } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const InvoicePage = () => {




  const [loader, setLoader] = useState(false);

  const downloadPDF = () =>{
    const capture = document.querySelector('.total-download');
    setLoader(true);
    html2canvas(capture).then((canvas)=>{
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save('Homaid-invoice.pdf');
    })
  }


  // Initial state setup for services
  const [services, setServices] = useState([
    {
      name: "Regular Cleaning",
      recurrence: "Daily",
      price: 200,
      total: 6000,
    },
    {
      name: "Washroom Cleaning",
      recurrence: "Weekly",
      price: 800,
      total: 3200,
    },
    {
      name: "Dish-washing",
      recurrence: "Daily",
      price: 200,
      total: 6000,
    },
  ]);
  const [serviceDetails, setServiceDetails] = useState([
    {
      name: "Floor Cleaning",
      recurrence: "Daily",
      price: 116,
      total: 3480,
    },
    {
      name: "Cooking(1 time)",
      recurrence: "Daily",
      price: 334,
      total: 9999,
    },
    {
      name: "Dish-washing",
      recurrence: "Daily",
      price: 50,
      total: 1499,
    },
  ]);

  // Calculate the grand total dynamically
  const grandTotal = services.reduce((acc, service) => acc + service.total, 0);

  const grandTotalOfserviceDetails = serviceDetails.reduce((acc, serviceDetails) => acc + serviceDetails.total, 0);

  // Handle changes in recurrence and price
  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    if (field === "recurrence") {
      updatedServices[index].recurrence = value;
    } else if (field === "price") {
      updatedServices[index].price = value;
    }
    // Recalculate total based on recurrence and price
    updatedServices[index].total =
      value * (updatedServices[index].recurrence === "Daily" ? 30 : 4);
    setServices(updatedServices);
  };
  return (
    <div className="total-download">
    <div className="container">
      <div className="content">
        <div className="header">
          <div className="avatar-container">
            <img
              src="/src/assets/logo.webp"
              width={230}
              alt="Avatar"
              className="avatar"
            />
          </div>
          <div className="info">
            <h2 className="title">
              HOMAID <br /> QUOTATION
            </h2>
            <p className="date">Date: 27/08/2024</p>
          </div>
        </div>

        <div className="top-details">
        


        <div className="section">
          <h3 className="section-title">PAYABLE TO</h3>
          <p>HOMAID SERVICES</p>
          <p>Daryna Partners Private Limited</p>
          <p>Miyapur, Hyderabad</p>
        </div>

        <div className ="payee-details"  >
          <h3 className="section-payee"> Payee Details:</h3>
          <div className="details">
            <p>Comapany: Homaid<br></br></p>
            <p>Acc Name: Daryna partners pvt ltd.<br></br></p>
            <p>Account no: 10165860872<br></br></p>
            <p>IFSC code:IDFB0080201<br></br></p>
            <p>Hyderabad.</p>
            </div>

          </div>

        <div className="section details">
          <h3 className="section-title">Customer Details</h3>
          <div className="detail">
            <div className="detail-section">
              <p>Name: Mounika</p>
              <p>Aneesh apartment</p>
              <p>3BHK</p>
              <p>Contact: 9701046133</p>
              <p>No of people:4 adults and 1 baby</p>
            </div>
            </div>
            {/* <div className="detail-section">
              <p>: 10:00AM - 11:00AM</p>
              <p>: 200/Day</p>
              <p>: 400/Each/week</p>
              <p>: 200/Day</p>
            </div> */}
          </div>
        </div>

        <div className="bg-image">
          {/* <img src="/src/assets/background-bg.jpeg" alt="" /> */}
          <div className="service-details">
            <div className="service-header">
              <p>SERVICE DETAILS</p>
              <p>RECURRING</p>
              <p>PRICE</p>
              <p>TOTAL</p>
            </div>
          </div>

     
          <div className="homaid-bg" >
            
          <div className="list-items">
            {serviceDetails.map((serviceDetails, index) => (
              <React.Fragment key={index}>
                <div className="pricing">
                  <div className="price-value">
                    <div className="pricing-item">
                      <p>{serviceDetails.name}</p>
                    </div>
                    <div className="pricing-item">
                      <p>{serviceDetails.recurrence}</p>

                      {/* <select
                        value={service.recurrence}
                        onChange={(e) =>
                          handleServiceChange(
                            index,
                            "recurrence",
                            e.target.value
                          )
                        }
                      >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                      </select> */}

                    </div>
                    <div className="pricing-item">
                      {/* <input
                        type="number"
                        value={serviceDetails.price}
                        onChange={(e) =>
                          handleServiceChange(
                            index,
                            "price",
                            parseInt(e.target.value, 10)
                          )
                        }

                      /> */}
                      <p>{serviceDetails.price}</p>
                    </div>
                    <div className="pricing-item">
                      <p>{serviceDetails.total}/-</p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

            
          {/* Grand Total Section */}
          <div className="grand-total">
            <h3 className="grand-total-title">GRAND TOTAL</h3>
            <div className="grand-total-amount">
              <p>{grandTotalOfserviceDetails}/-</p>
              <p>Per Month</p>
            </div>
          </div>
          
          <div className="notes">
            <h3 className="notes-title">NOTES:</h3>
            <ul>
              <li><p>4 day weekoff per month as per maid convenience</p></li>
              <li><p>At Homaid,customer satisfation is our priority.Our team gaurantees your home is impeccably clean,comfortable, and precisely suited to your needs. </p></li>
              <li><p>3 months subscripton offer <b>5% off,</b>6 months subscription offer <b>7% off</b></p></li>
            </ul>
          </div>
        
        

        <div className="footer">
          <div className="contact">
            <a href="https://homaid.in/" className="contact-link">
              
                {/* <IoMdGlobe /> */}🌍
              
              https://homaid.in/
            </a>
            <a href="tel:+918125522213" className="contact-link">
              
                {/* <FaPhoneAlt /> */}📞
             
              +91 9010114722
            </a>
            <a
              href="mailto:thehomaidservices@gmail.com"
              className="contact-link"
            >
              
                {/* <MdEmail /> */}✉️
              
                contact@homaid.in
            </a>
          </div>
          </div>
          <div className="receipt-actions-div">
            <div className="actions-right">
              <button
                className="receipt-modal-download-button"
                onClick={downloadPDF}
                disabled={!(loader===false)}
              >
                {loader?(
                  <span>Downloading</span>
                ):(
                  <span>Download</span>
                )}

              </button> 
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default InvoicePage;
