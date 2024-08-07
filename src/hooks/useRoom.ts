import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'

import { database } from '../services/firebase'
import { useAuth } from './useAuth'

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string
      avatar: string
    }
    content: string
    isAnswered: boolean
    isHighlighted: boolean
    likes: Record<
      string,
      {
        authorId: string
      }
    >
  }
>

type QuestionType = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likeCount: number
  likeId: string | undefined
}

export function useRoom(salaId: string) {
  const { user } = useAuth()
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    const roomRef = ref(database, `salas/${salaId}`)

    const unsubscribe = onValue(roomRef, (room) => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.perguntas ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id,
            )?.[0],
          }
        },
      )

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })

    return () => {
      unsubscribe()
    }
  }, [salaId, user?.id])

  return { questions, title }
}
