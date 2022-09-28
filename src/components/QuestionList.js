import React from "react";
import react,{useEffect,useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const[questions,setQuestions] =useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((resp)=>resp.json())
  //   .then((questions)=>setQuestions(questions));
  // },[])
  .then (questions => {
    setQuestions(questions) })},[])

    const items =questions.map((ques)=>(
      <QuestionItem
       key={ques.id}
       question={ques}
       />

    ))

    function handleDelete(id){
      fetch(`http://localhost:4000/questions/${id}`,{
        method: "DELETE",
      })
      .then((resp)=>resp.json())
      .then(()=>{
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);

      });
    }
    function handleAnswerChange(id, correctIndex) {
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex }),
      })
        .then((r) => r.json())
        .then((updatedQuestion) => {
          const updatedQuestions = questions.map((q) => {
            if (q.id === updatedQuestion.id) return updatedQuestion;
            return q;
          });
          setQuestions(updatedQuestions);
        });
    }
    const QuestionItems =questions.map((que)=>(
      <QuestionItem
      key={que.id}
      question={que}
      onDeleteClick={handleDelete}
      onAnswerChange={handleAnswerChange}
      />
    ));


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{QuestionItems}</ul>
    </section>
  );
}

export default QuestionList;
