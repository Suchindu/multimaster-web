import { useState } from "react";

function review_form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [technician, setTechnician] = useState("");
    const [date_of_service, setDate] = useState("");
    const [service_type, setService] = useState("");
    const [rating, setRating] = useState(0);
    const [review_body, setReview] = useState("");

    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const review = {name, email, technician, date_of_service, service_type, rating, review_body};

        const response = await fetch('http://localhost:4000/api/reviews/', {
            method : "POST",
            body : JSON.stringify(review),
            headers : {
                'Content-Type' : 'application/json'
            }
        });

        const json = await response.json();

        if(!response.ok){
            setError(json.error);
        }

        if(response.ok){
            setName("");
            setEmail("");
            setTechnician("");
            setDate("");
            setService("");
            setRating(0);
            setReview("");
            
            setError(null);
            alert("New Review Added");
        }
    } 
    
    return (
        <form onSubmit={handleSubmit}>
            <label>Name : </label>
            <input 
                type="text" 
                value={name} 
                onChange={(event) => setName(event.target.value)} /><br/>
            
            <label>Email : </label>
            <input 
                type="email" 
                value={email} 
                onChange={(event) => setEmail(event.target.value)} /><br/>
            
            <label>Technician : </label>
            <input 
                type="text" 
                value={technician} 
                onChange={(event) => setTechnician(event.target.value)} /><br/>
            
            <label>Date Of Service : </label>
            <input 
                type="text" 
                value={date_of_service} 
                onChange={(event) => setDate(event.target.value)} /><br/>
            
            <label>Service : </label>
            <input 
                type="text" 
                value={service_type}    
                onChange={(event) => setService(event.target.value)} /><br/>
            
            <label>Rating : </label>
            <input 
                type="number" min={0} max={10}
                value={rating} 
                onChange={(event) => setRating(event.target.value)} /><br/>
            
            <label>Review : </label>
            <textarea 
                value={review_body} cols={50} rows={5}
                onChange={(event) => setReview(event.target.value)} /><br/>
            
            <button>Submit</button>
        </form>
    );
}

export default review_form;