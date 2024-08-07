import { useNavigate, useParams } from 'react-router-dom'
import { ref, update, remove } from 'firebase/database'

import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { SalaCode } from '../components/SalaCode'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'

import {
  PageRoomContainer,
  Header,
  Content,
  Main,
  RoomTitle,
  QuestionList,
} from '../pages/Sala/styles'

type RoomParams = {
  id: string
}

export function AdminSala() {
  const navigate = useNavigate()
  const params = useParams<RoomParams>()
  const salaId = params.id

  const { title, questions } = useRoom(salaId!)

  async function handleEndRoom() {
    const roomRef = ref(database, `salas/${salaId}`)
    await update(roomRef, {
      endedAt: new Date(),
    })

    navigate('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      const questionRef = ref(
        database,
        `salas/${salaId}/perguntas/${questionId}`,
      )
      await remove(questionRef)
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    const questionRef = ref(database, `salas/${salaId}/perguntas/${questionId}`)
    await update(questionRef, {
      isAnswered: true,
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    const questionRef = ref(database, `salas/${salaId}/perguntas/${questionId}`)
    await update(questionRef, {
      isHighlighted: true,
    })
  }

  return (
    <PageRoomContainer>
      <Header>
        <Content>
          <div>
            <SalaCode code={salaId!} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </Content>
      </Header>

      <Main>
        <RoomTitle>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </RoomTitle>

        <QuestionList>
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img
                        src={checkImg}
                        alt="Marcar pergunta como respondida"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            )
          })}
        </QuestionList>
      </Main>
    </PageRoomContainer>
  )
}
