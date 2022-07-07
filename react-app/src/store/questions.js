const GET_QUESTIONS = '/questions/get'
const ADD_QUESTION = '/questions/add'
const DELETE_QUESTION = '/questions/delete'

const actionAddQuestion = question => {
    return {
        type: ADD_QUESTION,
        question
    }
}

const actionAllQuestions = questions => {
    return {
        type: GET_QUESTIONS,
        questions
    }
}

const actionDeleteQuestion = questionId => {
    return {
        type: DELETE_QUESTION,
        questionId
    }
}

export const deleteQuestionThunk = questionId => async dispatch => {
    const response = await fetch(`/api/questions/${questionId}`,
        {
            method: "DELETE",
        }
    )
    if (response.ok) {
        dispatch(actionDeleteQuestion(questionId))
    }
}

export const editQuestionThunk = question => async dispatch => {

    const {
        title,
        content,
        user_id,
        questionId
    } = question

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('user_id', user_id)
    formData.append('questionId', questionId)

    const response = await fetch('/api/questions',
        {
            method: "PUT",
            body: formData
        }
    )
    const data = await response.json()
    if (response.ok) {
        dispatch(actionAddQuestion(data))
        return null
    } else if (response.status < 500) {
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const getQuestionsThunk = () => async dispatch => {
    const response = await fetch('/api/questions')
    const data = await response.json()
    if (response.ok) {
        dispatch(actionAllQuestions(data))
    }
}

export const addQuestionThunk = newQuestion => async dispatch => {
    const {
        title,
        content,
        user_id,
    } = newQuestion

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('user_id', user_id)


    const response = await fetch('/api/questions', {
        method: "POST",
        body: formData
    }
    )

    const data = await response.json()
    if (response.ok) {
        dispatch(actionAddQuestion(data))
        return null
    } else if (response.status < 500) {
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

const questionReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_QUESTION:
            let newAddState = {}
            newAddState = { ...state, [action.question.id]: action.question }
            return newAddState
        case GET_QUESTIONS:
            let newState = { ...state };
            action.questions.questions.forEach((question) => {
                newState[question.id] = question;
            });
            return newState;
        case DELETE_QUESTION:
            let newDeleteState = { ...state };
            delete newDeleteState[action.questionId]
            return newDeleteState
        default:
            return state
    }
}

export default questionReducer