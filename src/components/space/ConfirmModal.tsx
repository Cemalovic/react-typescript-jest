import { Component } from 'react'
import './ConfirmModal.css'

interface ConfirmModalProps {
  show: boolean
  content: string
  close: () => void
}

export class ConfirmModal extends Component<ConfirmModalProps> {
  render() {
    if (!this.props.show) {
      return null
    } else {
      return (
        <div className='modal'>
          <div className='modal-content'>
            <h2>You tried to reserve and ...</h2>
            <h3 className='modalText'>{this.props.content}</h3>
            <button onClick={() => this.props.close()}>Ok, close</button>
          </div>
        </div>
      )
    }
  }
}
