import React, {useState, useEffect} from 'react';
import Answer from './Answer'

export default function Question(props){
    const { question, handleChange } = props

    const answerElements = question.answers.map(answer =>{
        return <Answer 
                key={answer.id}
                answerData={answer}
                handleChange={handleChange}
                questionId={question.id}
            />
    })

    return (
        <div className='question-ctn'>
            <h1 className='q-text'>{question.title}</h1>
            <div className='answers-ctn'>
               {answerElements}
            </div>
            <br className='border'/>
        </div>
    )
}