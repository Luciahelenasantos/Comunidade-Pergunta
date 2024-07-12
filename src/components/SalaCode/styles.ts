import styled from 'styled-components'

export const RoomCodeContainer = styled.div`
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  background: ${(props) => props.theme['white']};
  border: 1px solid ${(props) => props.theme['green-500']};
  cursor: pointer;
  display: flex;

  div {
    background: ${(props) => props.theme['green-500']};
    padding: 0 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    display: block;
    align-self: center;
    flex: 1;
    padding: 0 16px 0 12px;
    width: 230px;
    font-size: 14px;
    font-weight: 500;
  }
`
