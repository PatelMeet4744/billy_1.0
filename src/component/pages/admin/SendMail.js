import React from 'react';

const SendMail = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Mail is sending")
        
        window.Email.send({
            Host : "smtp.elasticemail.com",
            Username : "abhishekmeet032015@gmail.com",
            Password : "nabtjkffcdpqweuj",
            To : '19bmiit0015@gmail.com',
            From : "you@isp.com",
            Subject : "This is the subject",
            Body : "This is an Testing Mail"
        }).then(
          message => alert(message)
        );
    }
    return (
        <div class="row">
            <h4 class="grid_title ml10 ml15">Manage Delivery Boy</h4>
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <form className="pt-3" onSubmit={handleSubmit}>                          
                            <div className="mt-3">
                            <button type="submit" style={{height:'40px'}} class="btn btn-primary mr-2" name="submit">Submit</button>
                                {/* <a type="submit" style={{color:'white'}} class="btn btn-primary mr-2" name="submit">Submit</a> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendMail;