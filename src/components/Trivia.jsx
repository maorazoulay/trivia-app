import React, {useState, useEffect} from 'react';
import Question from './Question'
import Portal from './Portal'
import LoadingPage from './LoadingPage'
import QuestionsPage from './QuestionsPage'

import { nanoid } from 'nanoid'
import {decode} from 'html-entities';
import { getNewAnswers, getBackgroundClass, getFormattedAnswers} from '../utils'

const questionCount = 5
const apiUrl = `https://opentdb.com/api.php?amount=${questionCount}`

export default function Trivia(){
    const [started, setStarted] = useState(false)
    const [showLoading, setShowLoadingPage] = useState(false)
    const [questions, setQuestions] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [correctAnswerCount, setCorrectAnswerCount] = useState(0)
    const [isEnableSubmit, setIsEnableSubmit] = useState(false)

    useEffect(() => {
        if(showLoading){
            fetchNewQuestions()
            toggleLoadingPage(false)
        }
    })

    useEffect(() => {
        const allQuestionsAnswered = 
            questions.every(question => Object.keys(question.markedAnswer).length > 0)
        setIsEnableSubmit(allQuestionsAnswered)
    }, [questions])

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
        let tempAnswerCount = 0
        for(let question of questions){
            if(question.markedAnswer.id == question.correctAnswer.id){
                tempAnswerCount++
            }
        }
        setCorrectAnswerCount(tempAnswerCount)
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

    function start() {
        setStarted(true)
        toggleLoadingPage(true)
    }
    
    function toggleLoadingPage(shouldLoad){
        setShowLoadingPage(shouldLoad)
    }
    
    function restartTrivia(){
        setCorrectAnswerCount(0)
        setShowResults(false)
        toggleLoadingPage(true)
    }

    const questionElements = questions.map(data => {
        return <Question 
            key={data.id} 
            question={data} 
            handleChange={handleChange}/>
    })

    const questionProps = {
        handleSubmit,
        questionElements,
        showResults,
        isEnableSubmit,
        restartTrivia,
        questionCount,
        correctAnswerCount
    }

    return (
        <>
            {!started && <Portal start={start}/>}
            {started && showLoading && <LoadingPage />}
            {started && !showLoading && <QuestionsPage data={questionProps}/>}
        </>
    )
}