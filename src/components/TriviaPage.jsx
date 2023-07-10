import React, {useState, useEffect} from 'react';
import Question from './Question'
import { nanoid } from 'nanoid'
import {decode} from 'html-entities';
import { getNewAnswers, getBackgroundClass, getFormattedAnswers} from '../utils'

const questionCount = 5
const apiUrl = `https://opentdb.com/api.php?amount=${questionCount}`
let correctAnswerCount = 0

export default function TriviaPage(){
    const [triviaFinished, setTriviaFinished] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [questions, setQuestions] = useState([])
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false)

    // Fetch new questions from API when user answers all questions
    useEffect(() => {
        fetchNewQuestions()
        return () => {
            setTriviaFinished(false)
        }
    }, [triviaFinished])

    // This hook will help disable/enable the submit button
    useEffect(() => {
        const allQuestionsAnswered = 
            questions.every(question => Object.keys(question.markedAnswer).length > 0)
        setAllQuestionsAnswered(allQuestionsAnswered)
    }, [questions])

    // This hook will disable the radio buttons after submission
    useEffect(() =>{
        if (showResults) {
            setQuestions(prevQuestions =>{
                return prevQuestions.map(question => {
                    const newAnswers = 
                        question.answers.map(answer => {
                            return {
                                ...answer,
                                disabled: true
                            }
                        })
                    return {
                        ...question,
                        answers: newAnswers
                    }
                })
            })
        }
    }, [showResults])

    function handleChange(event, answerData, questionId){
        event.preventDefault()
        setQuestions(prevQuestions => {
            return prevQuestions.map(prevQuestion => {
                let newAnswers = [] 
                let newMarkedAnswer
                if (prevQuestion.id === questionId){
                    newAnswers = getNewAnswers(prevQuestion.answers, answerData)
                    newMarkedAnswer = answerData
                } else{
                    newAnswers = [...prevQuestion.answers]
                    newMarkedAnswer = prevQuestion.markedAnswer
                } 

                return {
                    ...prevQuestion,
                    answers: newAnswers,
                    markedAnswer: newMarkedAnswer
                }
            })
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        setQuestions(prevQuestions =>{
            return prevQuestions.map(prevQuestion => {
                const correctAnswerId = prevQuestion.correctAnswer.id
                const markedAnswerId = prevQuestion.markedAnswer.id
                const newAnswers = prevQuestion.answers.map(prevAnswer =>{
                    const backgroundClass = getBackgroundClass(
                        correctAnswerId, markedAnswerId, prevAnswer)
                    return {
                        ...prevAnswer,
                        backgroundClass: backgroundClass 
                    }
                })
                return {
                    ...prevQuestion,
                    answers: newAnswers
                }
            })
        })
        updateCorrectAnswerCount()
        setShowResults(true)
    }

    function updateCorrectAnswerCount(){
        for(let question of questions){
            if(question.markedAnswer.id == question.correctAnswer.id){
                correctAnswerCount++
            }
        }
    }

    function restartTrivia(){
        correctAnswerCount = 0
        setShowResults(false)
        setTriviaFinished(true)
    }

    function fetchNewQuestions(){
        fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            let newQuestions = []
            for(let result of data.results){
                const { answers, correctAnswer } = 
                    getFormattedAnswers(result.incorrect_answers, result.correct_answer)
                newQuestions.push({
                    id: nanoid(),
                    title: decode(result.question),
                    answers: answers,
                    correctAnswer: correctAnswer,
                    markedAnswer: {},
                    isChecked: false,
                    disabled: false
                })
            }
            setQuestions(newQuestions)
        })
    }

    const questionElements = questions.map(data => {
        return <Question 
            key={data.id} 
            question={data} 
            handleChange={handleChange}/>
    })

    return (
        <div className='trivia-content'>
            <form onSubmit={handleSubmit}>
                {questionElements}
                <div className='center'>
                    {!showResults && <button 
                    className={`btn bigger-font ${!allQuestionsAnswered ? 'opaque' : ''}`} 
                        disabled={!allQuestionsAnswered} 
                        // onClick={handleSubmit}
                        type='submit'
                        >Check Answers</button>}
                    {showResults && <button className='btn bigger-font' 
                        type='button' onClick={restartTrivia}>Play Again</button>}
                    {showResults && <h3 className='score'>
                        You scored {correctAnswerCount} of {questionCount}</h3>}
                </div>
            </form>
        </div>
    )
}