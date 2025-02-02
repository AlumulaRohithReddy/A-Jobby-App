import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const cases = {
  initail: 'init',
  inProgress: 'inprogress',
  success: 'success',
  failure: 'fail',
}

class Profile extends Component {
  state = {
    detail: {},
    loader: cases.initail,
  }

  componentDidMount() {
    this.display()
  }

  display = async () => {
    this.setState({loader: cases.inProgress})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response.status)
    if (response.ok === true) {
      const data = await response.json()
      const pro = data.profile_details
      const s = {
        name: pro.name,
        profileImageUrl: pro.profile_image_url,
        shortBio: pro.short_bio,
      }
      this.setState({detail: s, loader: cases.success})
    } else {
      this.setState({
        loader: cases.failure,
      })
    }
  }

  progressview = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  succview = () => {
    const {detail} = this.state
    const {name, profileImageUrl, shortBio} = detail
    return (
      <div className="profile">
        <img src={profileImageUrl} alt="profile" className="img" />
        <h1 className="heading">{name}</h1>
        <p className="para">{shortBio}</p>
      </div>
    )
  }

  retry = () => {
    this.setState({loader: cases.initail}, this.display)
  }

  failview = () => (
    <button className="now-button" type="button" onClick={this.retry}>
      Retry
    </button>
  )

  render() {
    const {loader} = this.state
    switch (loader) {
      case cases.success:
        return this.succview()
      case cases.failure:
        return this.failview()
      case cases.inProgress:
        return this.progressview()
      default:
        return null
    }
  }
}

export default Profile
