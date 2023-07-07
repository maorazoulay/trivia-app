import React from 'react';

export default function Question(props){
    return (
        <>
            <h1 className='q-text'>Question #</h1>
            <div className='question'>
                <label className='radio'>
                    <input 
                    type='radio'
                    id='answer1'
                    name='answer'
                    value='answer1'
                    onChange={props.handleChange}/>
                    answer1 
                </label>
                <label className='radio'>
                    <input 
                    type='radio'
                    id='answer2'
                    name='answer'
                    value='answer2'
                    onChange={props.handleChange}/>
                    answer2
                </label>
                <label className='radio'>
                    <input 
                    type='radio'
                    id='answer3'
                    name='answer'
                    value='answer3'
                    onChange={props.handleChange}/>
                    answer3
                </label>
                <label className='radio'>
                    <input 
                    type='radio'
                    id='answer4'
                    name='answer'
                    value='answer4'
                    onChange={props.handleChange}/>
                    answer4
                </label>
            </div>
            <br/>
        </>
    )
}