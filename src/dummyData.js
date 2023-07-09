import { nanoid } from 'nanoid'

const dummyQuestions = [
    {
        id: 1,
        title: "It's nothing",
        answers: [
            {id:"ghjw", text: "nothing", backgroundClass: "", isChecked: false}, 
            {id:nanoid(), text: "everything", backgroundClass: "", isChecked: false}, 
            {id:nanoid(), text: "money", backgroundClass: "", isChecked: false}, 
            {id:nanoid(), text: "all", backgroundClass: "", isChecked: false}],
        correctAnswer: {id:"ghjw", text: "nothing", backgroundClass: "", isChecked: false},
        markedAnswer: {},
    }, 
    {
        id: 2,
        title: "it's money",
        answers: [
            {id:nanoid(), text: "nothing", backgroundClass: "", isChecked: false}, 
            {id:nanoid(), text: "everything", backgroundClass: "", isChecked: false}, 
            {id:"iuweyr", text: "money", backgroundClass: "", isChecked: false}, 
            {id:nanoid(), text: "all", backgroundClass: "", isChecked: false}],
        correctAnswer: {id:"iuweyr", text: "money", backgroundClass: "", isChecked: false},
        markedAnswer: {},
    },
    {
        id: 3,
        title: "it's everything",
        answers: [
            {id:nanoid(), text: "nothing", backgroundClass: "", isChecked: false}, 
            {id:"iuweyr7", text: "everything", backgroundClass: "", isChecked: false}, 
            {id:nanoid(), text: "money", backgroundClass: "", isChecked: false}, 
            {id:nanoid(), text: "all", backgroundClass: "", isChecked: false}],
        correctAnswer: {id:"iuweyr7", text: "everything", backgroundClass: "", isChecked: false},
        markedAnswer: {},
    },
    {
        id: 4,
        title: "it's all",
        answers: [
            {id:nanoid(), text: "nothing", backgroundClass: "", isChecked: false}, 
            {id:nanoid(), text: "everything", backgroundClass: "", isChecked: false}, 
            {id:nanoid(), text: "money", backgroundClass: "", isChecked: false}, 
            {id:"8329fjc", text: "all", backgroundClass: "", isChecked: false}],
        correctAnswer: {id:"8329fjc", text: "all", backgroundClass: "", isChecked: false},
        markedAnswer: {},
    },
    {
        id: 5,
        title: "it's booga",
        answers: [
            {id:"kdsljf8", text: "booga", backgroundClass: "", isChecked: false}, 
            {id:nanoid(), text: "everything", backgroundClass: "", isChecked: false}, 
            {id:nanoid(), text: "money", backgroundClass: "", isChecked: false}, 
            {id:nanoid(), text: "all", backgroundClass: "", isChecked: false}],
        correctAnswer: {id:"kdsljf8", text: "booga", backgroundClass: "", isChecked: false},
        markedAnswer: {},
    }
]

export {dummyQuestions}