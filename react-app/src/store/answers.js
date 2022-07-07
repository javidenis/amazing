const GET_ANSWERS = '/answers/get'
const ADD_ANSWERS = '/answers/add'
const DELETE_ANSWERS = '/answers/delete'

const actionAddAnswer = answer => {
    return {
        type: ADD_ANSWERS,
        answer
    }
}

const actionAllAnswers = answers => {
    return {
        type: GET_ANSWERS,
        answers
    }
}

const actionDeleteAnswer = answerId => {
    return {
        type: DELETE_ANSWERS,
        answerId
    }
}

export const deleteAnswerThunk = answerId => async dispatch => {
    const response = await fetch(`/api/answer/${answerId}`,
        {
            method: "DELETE",
        }
    )
    if (response.ok) {
        dispatch(actionDeleteQuestion(answerId))
    }
}

export const editAnswerThunk = answer => async dispatch => {

    const {
        content,
        user_id,
        question_id,
        answerId
    } = answer

    const formData = new FormData()
    formData.append('content', content)
    formData.append('user_id', user_id)
    formData.append('question_id', question_id)
    formData.append('answerId', answerId)

    const response = await fetch('/api/answers',
        {
            method: "PUT",
            body: formData
        }
    )
    const data = await response.json()
    if (response.ok) {
        dispatch(actionAddAnswer(data))
        return null
    } else if (response.status < 500) {
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const getAnswersThunk = () => async dispatch => {
    const response = await fetch('/api/answers')
    const data = await response.json()
    if (response.ok) {
        dispatch(actionAllAnswers(data))
    }
}

export const addAnswerThunk = newAnswer => async dispatch => {
    const {
        content,
        user_id,
        question_id
    } = newAnswer

    const formData = new FormData()
    formData.append('content', content)
    formData.append('user_id', user_id)
    formData.append('question_id', question_id)


    const response = await fetch('/api/answers', {
        method: "POST",
        body: formData
    }
    )

    const data = await response.json()
    if (response.ok) {
        dispatch(actionAddAnswer(data))
        return null
    } else if (response.status < 500) {
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

const answerReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_ANSWERS:
            let newAddState = {}
            newAddState = { ...state, [action.answer.id]: action.answer }
            return newAddState
        case GET_ANSWERS:
            let newState = { ...state };
            action.answers.answers.forEach((answer) => {
                newState[answer.id] = answer;
            });
            return newState;
        case DELETE_ANSWERS:
            let newDeleteState = { ...state };
            delete newDeleteState[action.answerId]
            return newDeleteState
        default:
            return state
    }
}

export default answerReducer