import { useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import { database, ref, get, child } from '../../services/firebase'

import illustrationImg from '../../assets/images/illustration.svg'
import googleIconImg from '../../assets/images/google-icon.svg'

import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'

import {
  PageAuthContainer,
  MainContent,
  CreateRoomButton,
  Separator,
} from './styles'

export function Home() {
  const navigate = useNavigate()
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState<string>('')

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }
    navigate('/sala/nova')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') {
      return
    }

    const roomRef = ref(database)
    const roomSnapshot = await get(child(roomRef, `salas/${roomCode}`))

    if (!roomSnapshot.exists()) {
      alert('Sala não existente')
      return
    }

    if (roomSnapshot.val().endedAt) {
      alert('Sala já foi encerrada.')
      return
    }

    navigate(`/sala/${roomCode}`)
  }

  return (
    <PageAuthContainer>
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <MainContent>
          <CreateRoomButton onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </CreateRoomButton>
          <Separator>ou entre em uma sala</Separator>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </MainContent>
      </main>
    </PageAuthContainer>
  )
}
