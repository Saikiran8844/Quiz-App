import React, {useState,useContext} from 'react';
import axios from 'axios';

const table={
    sports:21,
    history:23,
    politics:24
}
const API_ENDPOINT = "http://opentb.com/api/.php?";
const Appcontext=React.createContext();
const AppProvider=({children})=>{
    const[waiting,setWaiting]=useState(true);
    const[loading,setLoading]=useState(false);
    const[questions, setQuestions]=useState([]);
    const[index,setIndex]=useState(0);
    const[correct,setCorrect]=useState(0);
    const[error,setError]=useState(false);
    const[quiz,setQuiz]=useState(
        {
            amount:10,
            category:"General Knowledge",
            difficulty:"easy",
        }
    );
    const[isModelOpen,setISModelOpen]=useState(false);

    const fetchQuestions=async(url)=>{
        setLoading(true);
        setWaiting(false);
        const response= await axios(url).catch((err)=>console.log(err));
        if(response){
            const data=response.data.results;
            if(data.length>0){
                setQuestions(data);
                setLoading(false);
                setWaiting(false);
                setError(false);
            }
            else{
                setWaiting(true);
                setError(true);
                
            }
        }
        else{
            setWaiting(true);
        }
    };
    const nextQuestion=() => {
        setIndex((oldIndex) =>{
            const index=oldIndex+1;
            if(index>questions.length-1){
                openModal();
                return 0;
            }
            else{
                return index;
            }
        });
    };
    const openModal=()=>{
        setISModelOpen(true);
    }
    const checkAnswer=()=>{
        if(value){
            setCorrect((oldState)=>oldState+1)
        }
        nextQuestion();
    };
    const closeModal=()=>{
        setWaiting(true);
        setCorrect(0);
        setISModelOpen(false);
    };
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setQuiz({...quiz,[name]:value});
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        const {amount, category, difficulty}=quiz;
        const url='${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple';
        fetchQuestions(url);
    }
    return (
        <Appcontext.Provider value={{
            waiting,
            loading,    
            questions,
            index,
            correct,
            error,
            isModelOpen,
            nextQuestion,
            checkAnswer,
            closeModal,
            quiz,
            handleChange,
            handleSubmit,

        }}>
            {children}
        </Appcontext.Provider>
    )
};
export const useGlobalContext=() => {
    return useContext(Appcontext);
}
export {Appcontext,AppProvider};
