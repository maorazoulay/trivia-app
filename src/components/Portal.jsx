import React from 'react';

export default function Portal(props){
    return (
        <main>
            <div className='portal'>
                <h1>Quizzical</h1>
                <h3>Test yourself with Trivia questions</h3>
                <button onClick={props.start} className='btn'>Start quiz</button>
            </div>
        </main>
    )
}