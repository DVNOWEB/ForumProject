import React from "react";

const ThreadOverview = ({ thread }: ThreadOverviewProps) => {
  return (
    <div>
      {thread && (
        <div className="threadContainer">
          <div>
            <h2>{thread.title}</h2>
            <p>Creator: {thread.creator.name}</p>
            <p>Description: {thread.description}</p>
            {thread.category === "QNA" &&
              "isAnswered" in thread &&
              thread.isAnswered === true && (
                <div>
                  <h3>Answered!</h3>
                  {/* <p>Answer: {threadData.answer?.content}</p>
                    <p>By: {threadData.answer?.creator.userName}</p> */}
                </div>
              )}
          </div>

        </div>
      )}
    </div>
  );
};

export default ThreadOverview;
