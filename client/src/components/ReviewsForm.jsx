import { useState } from "react";
import { useReviewsContext } from "../hooks/useReviewsContext";
import {generateReviewIdInt, generateReviewIdStr}  from "../IdGeneration/reviews";

function ReviewForm() {
    const { dispatch } = useReviewsContext();

    const [review_id_int, setReviewidInt] = useState("");
    const [review_id_str, setReviewidStr] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [technician, setTechnician] = useState("");
    const [date_of_service, setDate] = useState("");
    const [service_type, setService] = useState("");
    const [rating, setRating] = useState(0);
    const [review_body, setReview] = useState("");
    const [technician_reply, setTechnicianReply] = useState("Not Replied");

    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        let id_integer = await generateReviewIdInt();
        setReviewidInt(10);

        let id_string = await generateReviewIdStr();
        setReviewidStr("REV0010");

        const review = {
            review_id_int,
            review_id_str, 
            name, 
            email, 
            technician, 
            date_of_service, 
            service_type, 
            rating, 
            review_body, 
            technician_reply    
        };

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
            setReviewidInt("");
            setReviewidStr("");
            setTechnicianReply("");

            setError(null);

            dispatch({ type : 'CREATE_REVIEW', payload : json});

            alert("New Review Added");
        }
    } 
    
    return (
        <>
        <div className="flex justify-center items-center margin ml-28 mt-5 rounded-xl mb-5 width w-4/5 bg-color1">
        <div className="flex mt-5 rounded-xl mb-5">
            <div>
            <p className=" text-white text-lg mt-2">Help Us Improve, Share your Experience.</p>
            </div>
        </div>
        <div className="flex justify-center items-center mt-10 ml-28 rounded-xl mb-5">
        <div className="w-full max-w-xl">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4 mt-">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input 
                        className ="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="name" 
                        type="text" 
                        placeholder="Name"
                        required 
                        value={name}
                        onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input 
                        className ="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" 
                        type="email" 
                        placeholder="Email"
                        required 
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Technician</label>
                    <input  
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="technician" 
                        type="text" 
                        placeholder="Technician"
                        required 
                        value={technician} 
                        onChange={(event) => setTechnician(event.target.value)} />
                </div>
                <div className="flex mb-4">
                    <div className="w-1/3 mr-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Date Of Service</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="date_of_service" 
                            type="date" 
                            required 
                            value={date_of_service} 
                            onChange={(event) => setDate(event.target.value)} />
                    </div>
                    <div className="w-1/3 mx-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="rating" 
                            type="number" 
                            min={0}
                            max={10} 
                            required 
                            value={rating} 
                            onChange={(event) => setRating(event.target.value)} />
                    </div>
                    <div className="w-1/3 ml-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Service</label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="service_type"
                            required
                            value={service_type}
                            onChange={(event) => setService(event.target.value)}>
                            <option value="Repair">Repair</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Consultation">Consultation</option>
                        </select>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Review</label>
                    <textarea 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="review_body" 
                        rows={5} 
                        placeholder="Your review"
                        value={review_body} 
                        onChange={(event) => setReview(event.target.value)}></textarea>
                </div>
                <div className="flex items-center justify-between">
                    <button className ="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Submit
                    </button>
                </div>
                </form>
            </div>
        </div>
        </div>
        </>
    );
}

export default ReviewForm;