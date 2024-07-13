import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import favelaImg from '../assets/images/favela.svg'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

import { database, ref, push } from '../services/firebase'

import { PageAuthContainer, MainContent } from './Home/styles'

export function CriarSala() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [newRoom, setNewRoom] = useState('')

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    if (newRoom.trim() === '') {
      return
    }

    const roomRef = ref(database, 'salas')

    const firebaseRoom = await push(roomRef, {
      title: newRoom,
      authorId: user?.id,
    })

    navigate(`/sala/${firebaseRoom.key}`)
  }

  return (
    <PageAuthContainer>
      <aside>
        <img
          src={favelaImg}
          alt="Foto Favela"
        />
        <strong>Salas Virtuais de dúvidas da sua Comunidade</strong>
        <p>Fale com a sua Associação de Moradores</p>
      </aside>
      <main>
        <MainContent>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </MainContent>
      </main>
    </PageAuthContainer>
  )
}
