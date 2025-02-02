import {Component} from 'react'
import Cookies from 'js-cookie'
import {FcRating} from 'react-icons/fc'
import {TiLocation} from 'react-icons/ti'
import {FaEnvelope, FaExternalLinkAlt} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Similar from '../Similar'
import Skills from '../Skills'
import Nav from '../Nav'
import './index.css'

const cases = {
  initail: 'init',
  inProgress: 'inprogress',
  success: 'success',
  failure: 'fail',
}

class JobItemDetails extends Component {
  state = {
    details: {},
    skills: [],
    life: {},
    similarJobs: [],
    load: cases.initail,
  }

  componentDidMount() {
    this.detail()
  }

  detail = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({load: cases.inProgress})
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const pro = data.job_details
      const sk = pro.skills.map(z => ({
        imageUrl: z.image_url,
        name: z.name,
      }))
      const lac = pro.life_at_company
      const mainlife = {
        description: lac.description,
        aboutImageUrl: lac.image_url,
      }
      const sim = data.similar_jobs.map(y => ({
        companyLogoUrl: y.company_logo_url,
        employmentType: y.employment_type,
        id: y.id,
        jobDescription: y.job_description,
        location: y.location,
        packagePerAnnum: y.package_per_annum,
        rating: y.rating,
        title: y.title,
      }))
      const s = {
        companyLogoUrl: pro.company_logo_url,
        companyWebsiteUrl: pro.company_website_url,
        employmentType: pro.employment_type,
        id: pro.id,
        jobDescription: pro.job_description,
        location: pro.location,
        packagePerAnnum: pro.package_per_annum,
        rating: pro.rating,
        title: pro.title,
      }

      this.setState({
        details: s,
        skills: sk,
        life: mainlife,
        similarJobs: sim,
        load: cases.success,
      })
    } else {
      this.setState({
        load: cases.failure,
      })
    }
  }

  successview = () => {
    const {details, similarJobs, skills, life} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = details

    return (
      <>
        <Nav />
        <div className="job-container">
          <li className="item-1">
            <div className="company">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="image"
              />
              <div className="rate">
                <h1 className="h">{title}</h1>
                <p className="p">
                  <FcRating /> {rating}
                </p>
              </div>
            </div>
            <div className="detail">
              <div className="loc">
                <p className="p">
                  <TiLocation /> {location}
                </p>
                <p className="p">
                  <FaEnvelope /> {employmentType}
                </p>
              </div>
              <p className="p">{packagePerAnnum}</p>
            </div>
            <hr className="li" />
            <div className="v">
              <h1 className="h">Description</h1>
              <a className="pa" href={companyWebsiteUrl}>
                Visit <FaExternalLinkAlt />
              </a>
            </div>
            <p className="p">{jobDescription}</p>
            <h1 className="h">Skills</h1>
            <div className="sim">
              <ul className="skil">
                {skills.map(each => (
                  <Skills key={each.name} skill={each} />
                ))}
              </ul>
            </div>
            <h1 className="h">Life at Company</h1>
            <div className="si">
              <div className="description">
                <p className="p">{life.description}</p>
              </div>
              <img
                src={life.aboutImageUrl}
                alt="life at company"
                className="i"
              />
            </div>
          </li>
          <div className="sim">
            <h1 className="h">Similar Jobs</h1>
            <ul className="vie">
              {similarJobs.map(x => (
                <Similar key={x.id} info={x} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  retry = () => {
    this.setState({load: cases.initail}, this.detail)
  }

  progressview = () => (
    <>
      <Nav />
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  failureview = () => (
    <>
      <Nav />
      <div className="job-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="im"
        />
        <h1 className="h">Oops! Something Went Wrong</h1>
        <p className="p">We cannot seem to find the page you are looking for</p>
        <button className="now-button" type="button" onClick={this.retry}>
          Retry
        </button>
      </div>
    </>
  )

  render() {
    const {load} = this.state
    switch (load) {
      case cases.success:
        return this.successview()
      case cases.failure:
        return this.failureview()
      case cases.inProgress:
        return this.progressview()
      default:
        return null
    }
  }
}

export default JobItemDetails
