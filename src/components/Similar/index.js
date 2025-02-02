import {FcRating} from 'react-icons/fc'
import {TiLocation} from 'react-icons/ti'
import {FaEnvelope} from 'react-icons/fa'
import './index.css'

const Similar = props => {
  const {info} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = info

  return (
    <li className="ite">
      <div className="company">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="image"
        />
        <div className="rate">
          <h1 className="h">{title}</h1>
          <p className="p">
            <FcRating /> {rating}
          </p>
        </div>
      </div>
      <h1 className="des">Description</h1>
      <p className="p">{jobDescription}</p>
      <div className="detail">
        <div className="loc">
          <p className="p">
            <TiLocation /> {location}
          </p>
          <p className="p">
            <FaEnvelope /> {employmentType}
          </p>
        </div>
      </div>
    </li>
  )
}

export default Similar
