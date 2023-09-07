import React, { useEffect, useState } from "react";



const ThreadOverview = ({ thread, comments }: ThreadOverviewProps) => {
  if('isAnswered' in thread){

  }
  
  const [answer, setAnswer] = useState<_Comment>()
  /* const [answerContent, setAnswerContent] = useState<string>('')
  const [answerCreator, setAnswerCreator] = useState<string>('') */

  useEffect(() => {

    if(thread && 'isAnswered' in thread) {
      if(thread.commentAnswerId){
        const _answer = comments.find((comment) => (
          comment.id === thread.commentAnswerId)
        )
        setAnswer(_answer)
        /* if(answer){
          setAnswerContent(answer.content)
          setAnswerCreator(answer.creator.name)
        } */
        
      }
    }
  }, [thread, comments])




  return (
    <div>
      {thread && (
        <div >
          <div>
            <h2>Title: {thread.title}</h2>
            <p>Creator: {thread.creator.name}</p>
            <p>Description: {thread.description}</p>
            <h4>Type: {thread.category}</h4>
            <p>Date: {thread.creationDate}</p>
            {thread.category === "QNA" &&
              "isAnswered" in thread &&
              thread.isAnswered === true && (
                <div>
                  <h3>Answered!</h3>
                  <p>Answer: {answer?.content}</p>
                  <p>By: {answer?.creator.name}</p>
                </div>
              )}
              {thread.category === "QNA" &&
              "isAnswered" in thread &&
              thread.isAnswered === false && (
                <div>
                  <h3>Not Answered</h3>
                </div>
              )}
          </div>

        </div>
      )}
    </div>
  );
};

export default ThreadOverview;
