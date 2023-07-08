import React from 'react'

export default function Answer(props){
    const answer = props.answerData

    return (
        <label className={`radio ${answer.backgroundClass}`}>
            <input 
                type='radio'
                id={answer.id}
                name='answer'
                value={answer.text}
                onChange={(event) => props.handleChange(event, answer, props.questionId)}
                checked={answer.isChecked}
            />
                {answer.text} 
        </label>
    )
}