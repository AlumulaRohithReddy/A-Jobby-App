import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Profile from '../Profile'
import Nav from '../Nav'
import Filters from '../Filters'
import JobItem from '../JobItem'

import './index.css'

const cases = {
  initail: 'init',
  inProgress: 'inprogress',
  success: 'success',
  failure: 'fail',
}

class Jobs extends Component {
  state = {
    jobslist: [],
    loader: cases.initail,
    searchinput: '',
    type: [],
    salary: '',
  }

  componentDidMount() {
    this.jobs()
  }

  jobs = async () => {
    const {type, salary, searchinput} = this.state
    this.setState({loader: cases.inProgress})
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${type.join()}&minimum_package=${salary}&search=${searchinput}`
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
      const pro = data.jobs
      const s = pro.map(x => ({
        companyLogoUrl: x.company_logo_url,
        employmentType: x.employment_type,
        id: x.id,
        jobDescription: x.job_description,
        location: x.location,
        packagePerAnnum: x.package_per_annum,
        rating: x.rating,
        title: x.title,
      }))
      this.setState({jobslist: s, loader: cases.success})
    } else {
      this.setState({
        loader: cases.failure,
      })
    }
  }

  retry = () => {
    this.setState({loader: cases.initail}, this.jobs)
  }

  progressview = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failureview = () => (
    <div className="view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="im"
      />
      <h1 className="h">Oops! Something Went Wrong</h1>
      <p className="p">We cannot seem to find the page you are looking for</p>
      <button className="btn" type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  successview = () => {
    const {jobslist} = this.state
    const count = jobslist.length
    return count !== 0 ? (
      <ul className="jobs-container">
        {jobslist.map(x => (
          <JobItem key={x.id} info={x} />
        ))}
      </ul>
    ) : (
      <div className="view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="im"
        />
        <h1 className="h">No Jobs Found</h1>
        <p className="p">We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  onchangeinput = event => {
    this.setState({searchinput: event.target.value})
  }

  se = () => {
    const {searchinput} = this.state
    this.setState({searchinput}, this.jobs)
  }

  outlet = () => {
    const {loader} = this.state
    switch (loader) {
      case cases.success:
        return <div className="jobs-container">{this.successview()}</div>
      case cases.failure:
        return this.failureview()
      case cases.inProgress:
        return this.progressview()
      default:
        return null
    }
  }

  onchangetype = id => {
    const {type} = this.state
    if (type.includes(id)) {
      const u = type.filter(x => x !== id)
      console.log(u)
      this.setState(
        {
          type: u,
        },
        this.jobs,
      )
    } else {
      this.setState(
        prevState => ({
          type: [...prevState.type, id],
        }),
        this.jobs,
      )
    }
  }

  onchangesalary = id => {
    this.setState({salary: id}, this.jobs)
  }

  render() {
    const {searchinput, loader} = this.state
    return (
      <>
        <Nav />
        <div className="container">
          <div className="con">
            <div className="mobilein">
              <input
                type="search"
                value={searchinput}
                className="inp"
                placeholder="Search"
                onChange={this.onchangeinput}
              />
              <button
                className="btn"
                type="button"
                data-testid="searchButton"
                onClick={this.se}
              >
                <BsSearch className="icon" />
              </button>
            </div>
            <Profile f={loader} />
            <Filters
              onchangetype={this.onchangetype}
              onchangesalary={this.onchangesalary}
            />
          </div>
          <div className="sub">
            <div className="in">
              <input
                type="search"
                value={searchinput}
                className="inp"
                placeholder="Search"
                onChange={this.onchangeinput}
              />
              <button
                className="btn"
                type="button"
                data-testid="searchButton"
                onClick={this.se}
              >
                <BsSearch className="icon" />
              </button>
            </div>
            {this.outlet()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
