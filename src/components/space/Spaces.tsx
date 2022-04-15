import { Component } from 'react'
import { SpaceModel } from 'models/SpaceModel'
import { DataService } from 'services/DataService'
import { Space } from './Space'
import { ConfirmModal } from './ConfirmModal'

interface SpacesProps {
  dataService: DataService
}

interface SpacesState {
  spaces: SpaceModel[]
  showModal: boolean
  modalContent: string
}

export class Spaces extends Component<SpacesProps, SpacesState> {
  constructor(props: SpacesProps) {
    super(props)
    this.state = {
      spaces: [],
      showModal: false,
      modalContent: ''
    }
    this.reserveSpace = this.reserveSpace.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  async componentDidMount() {
    const spaces = await this.props.dataService.getSpaces()
    this.setState({
      spaces: spaces
    })
  }

  private async reserveSpace(spaceId: string) {
    const reservationResault = await this.props.dataService.reserveSpace(
      spaceId
    )

    if (reservationResault) {
      this.setState({
        showModal: true,
        modalContent: `You reserved the space with id ${spaceId} and got reservation number ${reservationResault} `
      })
    } else {
      this.setState({
        showModal: true,
        modalContent: `You can't reserve the space with id ${spaceId} `
      })
    }
  }

  private renderSpace() {
    const rows = []
    for (const space of this.state.spaces) {
      rows.push(
        <Space
          key={space.spaceId}
          spaceId={space.spaceId}
          name={space.name}
          location={space.location}
          reserveSpace={this.reserveSpace}
        />
      )
    }

    return rows
  }

  private closeModal() {
    this.setState({
      showModal: false,
      modalContent: ''
    })
  }

  render() {
    return (
      <div>
        <>
          <h2>Welcome to the Spaces page</h2>
          {this.renderSpace()}
          <ConfirmModal
            show={this.state.showModal}
            content={this.state.modalContent}
            close={this.closeModal}
          />
        </>
      </div>
    )
  }
}
