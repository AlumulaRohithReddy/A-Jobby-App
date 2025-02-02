import './index.css'

const Skills = props => {
  const {skill} = props
  const {imageUrl, name} = skill

  return (
    <li className="tail">
      <img src={imageUrl} alt={name} className="image" />
      <h1 className="h">{name}</h1>
    </li>
  )
}

export default Skills
