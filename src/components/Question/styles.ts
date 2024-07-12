import styled from 'styled-components'

export const QuestionContainer = styled.div`
  background: ${(props) => props.theme['gray-100']};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;
  margin-top: 8px;

  & + & {
    margin-top: 8px;
  }

  &.highlighted {
    background: ${(props) => props.theme['gray-100']};
    border: 1px solid ${(props) => props.theme['green-500']};

    footer .user-info span {
      color: ${(props) => props.theme['gray-700']};
    }
  }

  &.answered {
    background: ${(props) => props.theme['gray-300']};
  }

  p {
    color: ${(props) => props.theme['gray-700']};
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    .user-info {
      display: flex;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }

      span {
        margin-left: 8px;
        color: ${(props) => props.theme['gray-400']};
        font-size: 14px;
      }
    }

    > div {
      display: flex;
      gap: 16px;
    }

    button {
      border: 0;
      background: transparent;
      cursor: pointer;
      transition: filter 0.2s;

      &.like-button {
        display: flex;
        align-items: flex-end;
        color: ${(props) => props.theme['gray-400']};
        gap: 8px;

        &.liked {
          color: ${(props) => props.theme['green-500']};

          svg path {
            stroke: ${(props) => props.theme['green-500']};
          }
        }
      }

      &:hover {
        filter: brightness(0.7);
      }
    }
  }
`
