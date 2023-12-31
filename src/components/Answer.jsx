import React from 'react'

export default function Answer(props){
    const answer = props.answerData

    return (
        <label className={`radio unselectable ${answer.backgroundClass}`}>
            <input 
                type='radio'
                id={answer.id}
                name='answer'
                value={answer.text}
                onChange={(event) => props.handleChange(event, answer, props.questionId)}
                checked={answer.isChecked}
                disabled={answer.disabled}
            />
            {answer.text} 
        </label>
    )
}