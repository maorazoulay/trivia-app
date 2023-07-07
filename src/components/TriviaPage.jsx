import React from 'react';
import Question from './Question'


export default function TriviaPage(){

    function handleChange(event){
        console.log(event.target.checked)
    }

    function handleSubmit(event){
        console.log(event.target)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Question handleChange={handleChange} />
        </form>
    )
}