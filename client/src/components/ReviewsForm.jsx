import { useState } from "react";
import { useReviewsContext } from "../hooks/useReviewsContext";

function ReviewForm() {
    const { dispatch } = useReviewsContext();

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

            dispatch({ type : 'CREATE_REVIEW', payload : json});
        }
    } 
    
    return (
        <>
        <div className="flex ">
            <form onSubmit={handleSubmit}>
                <label>Name</label><br />
                <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(event) => setName(event.target.value)} /><br/>
            
                <label>Email</label><br />
                <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(event) => setEmail(event.target.value)} /><br/>
            
                <label>Technician</label><br />
                <input  
                    type="text" 
                    required 
                    value={technician} 
                    onChange={(event) => setTechnician(event.target.value)} /><br/>
            
                <label>Date Of Service</label><br />
                <input 
                    type="date" 
                    required 
                    value={date_of_service} 
                    onChange={(event) => setDate(event.target.value)} /><br/>
            
                <label>Service</label><br />
                <input 
                    type="text" 
                    required 
                    value={service_type} 
                    onChange={(event) => setService(event.target.value)} /><br/>
            
                <label>Rating</label><br />
                <input 
                    type="number" 
                    min={0}
                    max={10} 
                    required 
                    value={rating} 
                    onChange={(event) => setRating(event.target.value)} /><br/>
            
                <label>Review</label><br />
                <textarea 
                    value={review_body} 
                    cols={50} 
                    rows={5} 
                    onChange={(event) => setReview(event.target.value)} /><br/>        
            
                <button
                    type="submit">
                    Submit</button>
            </form>
        </div>
        </>
    );
}

export default ReviewForm;