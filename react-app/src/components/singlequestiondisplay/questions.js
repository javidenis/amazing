import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';

function SingleQuestion() {
  const questionId = useParams()?.id
  const thisQuestion = useSelector(state => state?.questions)[questionId]
  console.log(thisQuestion,'sssssssssssssssssssssssssssssssssssssssssss')
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory()
  const answers = Object.values(useSelector(state => state.answers))
  const thisAnswers = answers.filter(answer => Number(answer.question_id) === Number(questionId))
  return (
    <div>questions</div>
  )
}

export default SingleQuestion