import {decode} from 'html-entities'
import { nanoid } from 'nanoid'

function getNewAnswers(oldAnswers, answerData){
    return oldAnswers.map(answer => {
        return {
            ...answer,
            backgroundClass: answerData.id === answer.id ?
            "blue" : ""
        } 
    })
}

function getBackgroundClass(correctAnswerId, markedAnswerId, prevAnswer) {
    if(prevAnswer.id === correctAnswerId){
        return "green"
    } else if (prevAnswer.id === markedAnswerId && prevAnswer.id !== correctAnswerId){
        return "red opaque"
    } else{
        return "opaque"
    }
}

function getFormattedAnswers(rawAnswers, rawCorrectAnswer){
    let answers = rawAnswers.map(rawAnswer => {
        return convertToAnswerObject(rawAnswer) 
    })
    const correctAnswer = convertToAnswerObject(rawCorrectAnswer)
    pushToRandomIndex(answers, correctAnswer)
    return {answers, correctAnswer}
}

function convertToAnswerObject(rawAnswer) {
    const foramttedText = decode(rawAnswer)
    return {
        id: nanoid(), text: foramttedText, backgroundClass: "", isChecked: false
    }

}

function pushToRandomIndex(array, item){
    array.splice((array.length+1) * Math.random() | 0, 0, item)
}

export { getNewAnswers, getBackgroundClass, getFormattedAnswers,
     convertToAnswerObject, pushToRandomIndex }