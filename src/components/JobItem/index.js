import {Link} from 'react-router-dom'
import {FcRating} from 'react-icons/fc'
import {TiLocation} from 'react-icons/ti'
import {FaEnvelope} from 'react-icons/fa'
import './index.css'

const JobItem = props => {
  const {info} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = info

  return (
    <li className="item">
      <Link to={`/jobs/${id}`} className="link">
        <div className="company">
          <img src={companyLogoUrl} alt="company logo" className="image" />
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
        <hr className="line" />
        <h1 className="des">Description</h1>
        <p className="p">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItem
