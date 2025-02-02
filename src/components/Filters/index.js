import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Filters = props => (
  <>
    <hr className="line" />
    <div className="filter">
      <ul className="type">
        <h1 className="h">Type of Employment</h1>
        {employmentTypesList.map(x => {
          const {onchangetype} = props
          const onSelectEmployeeType = event => {
            onchangetype(event.target.id)
          }

          return (
            <li className="input" key={x.employmentTypeId}>
              <input
                type="checkbox"
                id={x.employmentTypeId}
                onChange={onSelectEmployeeType}
              />
              <label htmlFor={x.employmentTypeId} className="p">
                {x.label}
              </label>
            </li>
          )
        })}
      </ul>
      <hr className="line" />
      <ul className="sal">
        <h1 className="h">Salary Range</h1>
        {salaryRangesList.map(y => {
          const {onchangesalary} = props
          const rate = () => {
            onchangesalary(y.salaryRangeId)
          }
          return (
            <li className="input" key={y.salaryRangeId} onChange={rate}>
              <input type="radio" id={y.salaryRangeId} name="salary" />
              <label htmlFor={y.salaryRangeId} className="p">
                {y.label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  </>
)

export default Filters
