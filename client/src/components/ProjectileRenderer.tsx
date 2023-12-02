import { useContext } from 'react'
import { Projectile } from './Tank/Projectile'
import { TankContext } from './Tank/TankContext'

export const ProjectileRenderer = () => {
  const tankContext = useContext(TankContext);

  return (
    <>
      {tankContext.projectiles.map((p) => (
        <div
          key={p.id}
          style={{
            top: `${p.yPosition}px`,
            left: `${p.xPosition}px`,
            rotate: `${p.rotation}deg`,
            position: "absolute",
          }}
        >
          <Projectile />
        </div>
      ))}
    </>
  )
}
