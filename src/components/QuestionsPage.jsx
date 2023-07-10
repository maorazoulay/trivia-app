import React from 'react'

export default function QuestionsPage({data}) {
    return (
        <div className='trivia-content'>
            <form onSubmit={data.handleSubmit}>
                {data.questionElements}
                <div className='center'>
                    {!data.showResults && <button 
                    className={`btn bigger-font ${!data.isEnableSubmit ? 'opaque' : ''}`} 
                        disabled={!data.isEnableSubmit} 
                        type='submit'
                        >Check Answers</button>}
                    {data.showResults && <button className='btn bigger-font' 
                        type='button' onClick={data.restartTrivia}>Play Again</button>}
                    {data.showResults && <h3 className='score'>
                        You scored {data.correctAnswerCount} of {data.questionCount}</h3>}
                </div>
            </form>
        </div>
    )
}