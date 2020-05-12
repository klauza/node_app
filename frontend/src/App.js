import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });

  console.log(process.env.REACT_APP_NOT_SECRET_CODE);

  const handleInputChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {

    console.log(form);

    axios
    .post('http://localhost:3000/send', form)
    .then(() => console.log('request sent!'))
    .catch(err => {
      console.error(err);
    });
  }

  return (
    <div className="App">
        <div className="container">
          
          <h1 className="brand"><span>Acme</span> Web Design</h1>

            <div className="company-info">
              <h3>Acme Web Design</h3>
              <ul>
                <li><i className="fa fa-road"></i> 44 Something st</li>
                <li><i className="fa fa-phone"></i> (555) 555-5555</li>
                <li><i className="fa fa-envelope"></i> test@acme.test</li>
              </ul>
            </div>
            
            <div className="contact">
              <h3>Email Us</h3>
              <form onSubmit={handleSubmit}>
                <p>
                  <label>Name</label>
                  <input type="text" name="name" placeholder="place name here" onChange={handleInputChange} />
                </p>
                <p>
                  <label>Company</label>
                  <input type="text" name="company" onChange={handleInputChange} />
                </p>
                <p>
                  <label>Email Address</label>
                  <input type="email" name="email" onChange={handleInputChange} />
                </p>
                <p>
                  <label>Phone Number</label>
                  <input type="text" name="phone" onChange={handleInputChange} />
                </p>
                <p className="full">
                  <label>Message</label>
                  <textarea name="message" onChange={handleInputChange} rows="5"></textarea>
                </p>
                <p className="full">
                  <button type="submit">Submit</button>
                </p>
              </form>
              
            </div>

        </div>
    </div>
  );
}

export default App;
