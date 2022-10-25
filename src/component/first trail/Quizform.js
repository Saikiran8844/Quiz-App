import React from 'react';
import { useGlobalContext } from './context';
const QuizForm=() =>{
    const {quiz,handleChange,handleSubmit,error}=useGlobalContext();
    return(
        <section className="quiz quiz-small">
            <h2 style={{marginBottom:"2rem"}}>Let's Start Quiz</h2>
            <div className="mb-3">
                <label for="noOfQuestions">Number of Questions</label>
                <input type ="number" name="amount"
                className='form-control' value={quiz.amount} 
                onChange={handleChange} min={1}
                max={50}
                style={{width:"400px"}}
                />
            </div>
            <div className="mb-3">
                <label for="category">category</label>
                <select className='form-select' name="">
                
                </select>
            </div>
            <div className="mb-3">
                <label for="noOfQuestions">Number of Questions</label>
                <input type ="number" name="amount"
                className='form-control' value={quiz.amount} 
                onChange={handleChange} min={1}
                max={50}
                style={{width:"400px"}}
                />
            </div>
        </section>
    )
}