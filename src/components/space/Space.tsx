import { Component } from 'react'
// import genericImage from '../../assets/redux-toolkit-1.png'
import genericImage from '../../assets/redux-toolkit-1.png'
import './Space.css'

interface SpaceProps {
  spaceId: string
  name: string
  location: string
  photoUrl?: string
  reserveSpace: (spaceId: string) => void
}

export class Space extends Component<SpaceProps> {
  private renderImage() {
    if (this.props.photoUrl) {
      return <img src={this.props.photoUrl} alt='' />
    } else {
      return <img src={genericImage} alt='' />
    }
  }

  render() {
    return (
      <div className='space'>
        {this.renderImage()}
        <label className='name'>{this.props.name}</label>
        <br />
        <label className='spaceId'>{this.props.spaceId}</label>
        <br />
        <label className='location'>{this.props.location}</label>
        <br />
        <button onClick={() => this.props.reserveSpace(this.props.spaceId)}>
          Reserve
        </button>
      </div>
    )
  }
}
