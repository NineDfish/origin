import React, { Component } from 'react'
import { Query } from 'react-apollo'
import QRCode from 'qrcode.react'
import Modal from 'components/Modal'
import WalletLinkerQuery from 'queries/WalletLinker'

// Shows a QR code for linking the user's browser with a mobile wallet. It
// automatically shows itself when there's a linker code available, which is
// triggered by the wallet linker client.
export default class MobileLinkerQRCode extends Component {
  state = {
    shouldClose: false
  }

  render() {
    const walletLandingUrl = 'https://www.originprotocol.com/mobile'
    const { role } = this.props

    return (
      <Query query={WalletLinkerQuery} pollInterval={1000}>
        {({ data, error, loading }) => {
          if (loading) return null
          if (error) {
            console.error(error)
            return null
          }

          const linkCode = data.walletLinker.linkCode
          if (!linkCode) return null

          return (
            <Modal
              shouldClose={this.state.shouldClose}
              onClose={() => this.setState({ shouldClose: false })}
            >
              <div style={{ marginBottom: '20px' }}>
                To complete this transaction, link your Origin Wallet by
                scanning the QR code with your phone&apos;s camera:
                <br />
              </div>
              <div style={{ backgroundColor: 'white', padding: '50px' }}>
                <QRCode
                  value={`${walletLandingUrl}/${linkCode}${
                    role ? `?role=${role}` : ''
                  }`}
                />
                <pre className="mb-0 mt-3">{linkCode}</pre>
              </div>
              <div className="actions">
                <button
                  className="btn btn-outline-light"
                  onClick={() => this.setState({ shouldClose: true })}
                  children="Cancel"
                />
              </div>
            </Modal>
          )
        }}
      </Query>
    )
  }
}
