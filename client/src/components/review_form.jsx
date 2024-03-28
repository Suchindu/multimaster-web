import { useState } from "react";

function review_form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [technician, setTechnician] = useState("");
    const [date, setDate] = useState("");
    const [service, setService] = useState("");
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
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
                value={date} 
                onChange={(event) => setDate(event.target.value)} /><br/>
            
            <label>Service : </label>
            <input 
                type="text" 
                value={service}    
                onChange={(event) => setService(event.target.value)} /><br/>
            
            <label>Rating : </label>
            <input 
                type="number" min={0} max={10}
                value={rating} 
                onChange={(event) => setRating(event.target.value)} /><br/>
            
            <label>Review : </label>
            <textarea 
                value={review} cols={50} rows={5}
                onChange={(event) => setReview(event.target.value)} /><br/>
            
            <button type="submit">Submit</button>
        </form>
    );
}

export default review_form;